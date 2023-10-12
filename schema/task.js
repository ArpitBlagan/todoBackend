const mongoose=require('mongoose');
const taskSchema=mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'uDB'
    },
    title:{
        type:String,
        required:[true,'Needed']
    },
    description:{
        type:String,
        required:[true,'Needed'],
        maxLength:100
    },
    priority:{
        type:Number,
        required:[true,'Needed']
    }
});
module.exports=mongoose.model('tDB',taskSchema);