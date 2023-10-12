const asyncHandler=require('express-async-handler');
const bcrypt=require('bcrypt');
const uDB =require('../schema/user');
const jwt=require('jsonwebtoken');
const otpDB =require('../schema/otp');
const nodemailer = require('nodemailer');

exports.register=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body;
    const val=await uDB.findOne({email});
    if(val){
        return res.status(409).json({msg:"email is already registered"});
    }
    const hash=await bcrypt.hash(password,10);
    const user=await uDB.create({
        name,email,password:hash
    });
    if(user){
        return res.status(200).json({msg:"created"});
    }
    res.status(400).json({msg:"something went wrong"});
});
exports.login=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    console.log(email,password);
    const user=await uDB.findOne({email});
    if(user&&(await bcrypt.compare(password,user.password))){
        const token= jwt.sign({
            user:{
                id:user._id,
                email:user.email,
                name:user.name
            }
        },process.env.ACCESS_TOKEN,{expiresIn:"30m"});
        res.cookie("jwt",token,{
            //30 days in milisecond
            expires:new  Date(Date.now()+(30*24*60*60*1000)),
            httpOnly:true
        });
        return res.status(200).json({msg:"logged In"});
    }
    res.status(404);
    throw new Error("Invalide email and password");
});
exports.forget=asyncHandler(async(req,res)=>{
    const {email}=req.body;
    const user=await uDB.findOne({email});
    if(user){
        let code=Math.floor((Math.random()*10000)+1);
        const otp=await otpDB.create({
            email:user.email,code,expireIn:new Date().getTime()+300*1000
        });
        return res.status(200).json({msg:"check you email for the code",code});
    }
    res.status(404);
    throw new Error("email that you entered is not registered in this app")
});
exports.updateInfo=asyncHandler(async(req,res)=>{
    const {email,password,code}=req.body;
    const ok=await otpDB.find({email,code});
    if(ok){
        let currentTime=new Date().getTime()
        let diff=ok.expireIn-currentTime;
        if(diff<0){
            return res.status(400).json({msg:"TokenExpired"});
        }
        const hash=await bcrypt.hash(password,10);
        const user=await uDB.findOneAndUpdate({email},{password:hash});
        console.log(user);
        if(user){
            return res.status(200).json({msg:"updated"});
        }}
    res.status(403);
    throw new Error("Somwthing went please check entered email id or try again later");
});
exports.logout=asyncHandler(async(req,res)=>{
    res.cookie("jwt","",{
        expires:new Date(0),
        httpOnly:true
    });
    res.status(200).json({msg:'done'});
})