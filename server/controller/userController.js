import { User } from "../model/Usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verifyEmail } from "../nodemail/verifyEmail.js";
import Session from "../model/SessionModel.js";
import { sendotpmail } from "../nodemail/SendotpMail.js";






export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    
   await verifyEmail(token, email);
    newUser.token = token;
    await newUser.save();

    res.status(201).json({ message: "User registered successfully", newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verification = async (req, res) => {
  try {
    // 1. Check BOTH locations for the token
    // req.query.token catches the email link (?token=...)
    // authHeader catches standard API calls from a frontend
    const authHeader = req.headers.authorization;
    let token = req.query.token; 

    if (authHeader) {
      token = authHeader.split(" ")[1];
    }

    // If neither has a token, then we error out
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    // 2. Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Database operations
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerfied) {
      return res.status(400).json({ message: "User already verified" });
    }

    // 4. Update and Save
    user.isVerfied = true;
    await user.save();

    // Respond with 'user' (the data), not 'User' (the Model)
    // Correct way for cross-origin (Backend -> Frontend) 
      //  res.redirect(`${process.env.LOCAL_FRONTEND_URL}/login?isVerfied=true`);
      res.status(200).json({ message: "Email verified successfully", user });
      res.redirect(`${process.env.LOCAL_FRONTEND_URL}/login?isVerfied=true`); // Redirect to frontend with query param for toast trigger

    // ;

  } catch (error) {
    console.error("Verification Error:", error.message);
    
    // Specifically catch JWT expiration or tampering
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials Or Incorrect Password" });
    }
    if (!user.isVerfied) {
      return res.status(400).json({ message: "Please verify your email" });
    }

    const existingSession = await User.findOne({ userid: user._id });
    if (existingSession) {
      await Session.deleteOne({ userid: user._id });
    }

    await Session.create({ userid: user._id });
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.isLoggedin = true;
    await user.save();
    return res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const userId = req.user._id;
    await Session.deleteMany({ userid: userId });
    await User.findByIdAndUpdate(userId, { isLoggedin: false });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const forgotpassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otp_expiry = new Date(Date.now() + 10 * 60 * 1000);
    user.otp = otp;
    user.otp_expiry = otp_expiry;
    await user.save();
    await sendotpmail(email, otp);
    return res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyOtp = async (req, res) => {
  const { email,otp } = req.body;
  console.log("Email from params:", email);

  try {
    if (!otp) return res.status(400).json({ message: "OTP is required" });

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User is not found" });
    }

    if (!user.otp || !user.otp_expiry) {
      return res
        .status(404)
        .json({ message: "OTP not generated or already verified" });
    }

    if (user.otp_expiry < new Date()) {
      return res.status(404).json({ message: "OTP has expired, request new" });
    }

    if (otp != user.otp) {
      return res.status(404).json({ message: "OTP does not match" });
    }

    user.otp = null;
    user.otp_expiry = null;
    await user.save();

    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const changePassword = async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;

  if (!newPassword || !confirmPassword) {
    return res.status(400).json({
      sucess: false,
      message: "All field are required ",
    });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "password do not match",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not  found ",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    (user.password = hashedPassword), await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed sucessfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
