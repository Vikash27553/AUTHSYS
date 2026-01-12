// import yup from 'yup'
// export const userSchema  =yup.object({
//     name: yup.string().required("Name is required"),
//     email: yup.string().email("Invalid email format").required("Email is required"),
//     password: yup.string().min(6,"Password must be at least 6 characters").required("Password is required")
// });

// export const loginSchema  =yup.object({
//     email: yup.string().email("Invalid email format").required("Email is required"),
//     password: yup.string().min(6,"Password must be at least 6 characters").required("Password is required")
// });
// export const forgotPasswordSchema  =yup.object({
//     email: yup.string().email("Invalid email format").required("Email is required"),
// });
// export const resetPasswordSchema  =yup.object({
//     newPassword: yup.string().min(6,"Password must be at least 6 characters").required("New Password is required"),
//     confirmPassword: yup.string()
//     .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
//     .required('Confirm Password is required'),
// });
// export const otpSchema  =yup.object({
//     otp: yup.string().length(6,"OTP must be 6 characters").required("OTP is required"),
// });

