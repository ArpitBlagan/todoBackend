const asyncHandler=require('express-async-handler');
const jwt=require('jsonwebtoken');
exports.Validate=asyncHandler(async(req,res,next)=>{
    //using the cookie that we send while user login in our app
    const token=req.cookies.jwt;console.log(token);
        jwt.verify(token,process.env.ACCESS_TOKEN,(err,decoded)=>{
            if(err){
                return res.status(200).json({
                    message:"TokenExpired"
                });
            }else{
            req.user=decoded.user;
            }next();});
});