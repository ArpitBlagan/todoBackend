const express=require('express');
const cors=require('cors');
const cookieParser=require('cookie-parser');
require('dotenv').config();
const mongoose=require('mongoose');
const Router =require('./Route')
mongoose.connect(process.env.URL,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(con=>{console.log("connnected")});
const app=express();
const {Error}=require('./middelware/Error');
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true
}));
app.use(Router);
app.use(Error);
app.listen(process.env.PORT,()=>{
    console.log(`Listening on Port ${process.env.PORT}`);
})
