import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String , required:true, unique:true},
    password:{type:String , required: true},
    isVerfied:{type:Boolean, default: false},
    isLoggedin:{type:Boolean, default:false},
    token:{type:String,default: null},
    otp:{type:String, default:null},
    otp_expiry:{type:Date, default:null}

})

export const User = mongoose.model('user', userSchema);
