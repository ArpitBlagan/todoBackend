const tDB=require('../schema/task');
const asyncHandler=require('express-async-handler');
exports.list=asyncHandler(async(req,res)=>{
    const id=req.user.id;
    const data=await tDB.find({user_id:id});
    res.status(200).json({data});
});
exports.upd=asyncHandler(async(req,res)=>{
    const {title,description,priority,id}=req.body;
    console.log(id);
    const val=await tDB.findByIdAndUpdate(id,{title,description,priority},{new:true});
    if(val){
        return res.status(202).json({msg:"done"});
    }
    res.status(404);throw new Error("Not found...");
});
exports.del=asyncHandler(async(req,res)=>{
    const {id}=req.body;console.log(id);
    const val=await tDB.findByIdAndDelete(id);
    if(val){
        return res.status(202).json({msg:"done"});
    }
    res.status(400);throw new Error("Something went wrong");
})
exports.add=asyncHandler(async(req,res)=>{
    const {title,description,priority}=req.body;
    const id=req.user.id;
    const val=await tDB.create({title,description,priority,user_id:id});
    if(val){
        return res.status(202).json({msg:"done"});
    }
    res.status(400);throw new Error("Something went wrong");
})