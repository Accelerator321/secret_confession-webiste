const secret = require('../model/secretModel');
const user= require("../model/userModel");

exports.addSecret = async (req,res)=>{
    try{
        let email = req.body.email;
        let obj = {
            message:req.body.message
        }
        // console.log(obj,email);
        let userData = await user.findOne({email:req.body.email});
       
        if(userData.count>0) return res.status(400).json({err:{msg:"already posted a sceret"}});  
        await secret.create(obj);
       
        
        
        res.status(200).send("created");
        await user.updateOne({email}, {count:1});
    }
    catch(err){
        // console.log(err);
        res.status(500).json({err:{msg:"server error"}})
    }
}

exports.getSecrets = async(req,res)=>{
    try{
    let results = await secret.find().sort({ _id: -1 }).exec();

    res.status(200).json(results);
    }
    catch(err){
        // console.log(err);
        res.status(500).json({err:{msg:"server error"}})
    }
}
exports.getSecretByid = async(req,res)=>{
    try{
    let results = await secret.findOne({_id:req.body.id});

    res.status(200).json(results);
    }
    catch(err){
        // console.log(err);
        res.status(500).json({err:{msg:"server error"}})
    }
}

