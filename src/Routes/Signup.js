const express=require("express");
const router=express.Router();
const user =require('../Models/User');
const bcrypt=require("bcrypt");
const resturant=require('../Models/Resturant');

router.post("/",async(req,res)=>{
    const {Resturantname, Email, Password}=req.body;
    try{
    const existinguser=  await user.findOne({Email:Email});
    if(existinguser)
    {
        return res.status(409).json({message:"user already exist"});
    }
    const userdata=new user();
    const hash= await bcrypt.hash(Password,10);
    userdata.Resturantid=Resturantname;
    userdata.Email=Email;
    userdata.Password=hash;
    const resturantdata=new resturant();
    resturantdata.Email=Email;
    resturantdata.resturntname=Resturantname;
    resturantdata.menulist=[];
    resturantdata.Comment=[];
    await resturantdata.save()
    await userdata.save();
    return res.status(200).json({message:"success"})
    }
    catch(e)
    {
        console.log("err",e);
       return res.status(500).json({message:"Internal server Error"});
    };
})


module.exports=router;
