const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'Needed']
    },
    email:{
        type:String,
        required:[true,'Needed']
    },
    password:{
        type:String,
        required:[true,'Needed']
    }
});
module.exports=mongoose.model('uDB',userSchema);