import { User } from "../model/Usermodel.js";
import jwt from "jsonwebtoken";


export const isAuthenticated = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
    if(!authHeader  || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({ message: 'Authorization header missing or malformed' });
    }

    const token = authHeader.split(' ')[1];
     jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        const  id = decoded.id;
       const user_id =   User.findById(id);
        if (!user_id) {
                return res.status(404).json({ message: 'User not found' });
            }
        req.user  = user_id;
        next();

     
        // return res.status(200).json({ message: 'User is authenticated', userId: decoded.id })
       

     }) 
       

    } catch (error) {
         return res.status(500).json({ message: 'Internal server error' });
    }
}