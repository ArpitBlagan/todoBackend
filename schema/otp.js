const mongoose=require('mongoose');
const otpSchema=mongoose.Schema({
    email:String,
    code:String,
    expireIn:Number
});
module.exports=mongoose.model('otpDB',otpSchema);