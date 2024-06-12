const user= require("../model/userModel");
const {hash} = require('../functions/hash');
const jwt = require("jsonwebtoken");
const { generateOTP } = require("../functions/genOtp");
const { sendMail } = require("../functions/mailer");
require("dotenv").config();



exports.addUser=async (req,res)=>{
    try{
        
        let otp = req.body.otp;
        // console.log(req.body, req.session.otp, req.session)
       
        if(otp !== req.session.otp) {
            res.status(400).json({err:{msg:"wrong otp"}});
            return;
        }

        let password = await hash(req.session.password);
        
        let obj = {
            name: req.session.name,
            email:req.session.email,
            password,
        }
        let token = jwt.sign({email:obj.email}, process.env.jwt_secret); 
        await user.create(obj);
        req.session.destroy();
        res.cookie('token', token, { maxAge: 1000*60*60*24*7, httpOnly: true,secure:true ,sameSite: 'none'});
        
        res.status(200).json({token});
    }
    catch(err){
        // console.log(err);
        res.status(500).json({err:{msg:"server error"}})
    }
}

exports.signIn=async (req,res)=>{
    try{
    let password = await hash(req.body.password);
    let result= await user.findOne({email:req.body.email, password});
    // console.log(result);
    if(!result) return res.status(400).json({err:{msg:"not found"}});
    
    let token = jwt.sign({email:req.body.email}, process.env.jwt_secret);
    res.cookie('token', token, { maxAge: 1000*60*60*24*7, httpOnly: true,secure:true,sameSite: 'none' });
    res.sendStatus(200);
    // res.status(200).json({token});
    }
    catch(err){
        // console.log(err);
       res.status(500).json({err:{msg:"server error"}})
    }
}

exports.getUser = async (req,res)=>{
    try{
        // console.log(req.body.email);
    let result  = await user.findOne({email:req.body.email});
    
    let token = req.cookies.token;
    res.cookie('token', token, { maxAge: 1000*60*60*24*7, httpOnly: true,secure:true,sameSite: 'none' });

    res.status(200).json({email:result.email,name:result.name});
    }
    catch(err){
        // console.log(err);
       res.status(500).json({err:{msg:"server error"}})
    }
}


exports.getOtp = async (req,res)=>{
    try{
        let otp = generateOTP();
        // console.log(otp)
        req.session.otp = otp;
        // console.log(req.body)
        req.session.email = req.body.email;
        // console.log(req.body,req.session)
        if(req.body.password)
            req.session.password= req.body.password;
        if(req.body.name)
            req.session.name= req.body.name;
        await sendMail(req.body.email, otp);
        res.status(200).json({msg:"otp sent"});
    }
    catch(err){
        // console.log(err);
       res.status(500).json({err:{msg:"server error"}})
    }
}





exports.changePassword =async(req,res)=>{
        try{
            let otp = req.body.otp;
            // console.log(req.body.otp, req.session.otp);
       
        if(otp !== req.session.otp) {
            return res.status(400).json({err:{msg:"wrong otp"}});
            
        }
            let password =await hash(req.session.password);
            await user.updateOne({email:req.session.email}, {
                password
            });
            // console.log("done", req.session.password,req.session.email);
            let token = jwt.sign({email:req.session.email}, process.env.jwt_secret);
            res.cookie('token', token, { maxAge: 1000*60*60*24*7, httpOnly: true,secure:true ,sameSite: 'none'});
            req.session.destroy();
            res.status(200).json({msg:"password changed"});
        }
        catch(err){
            // console.log(err);
           res.status(500).json({err:{msg:"server error"}})
        }
}