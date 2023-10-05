const warden = require('../models/Warden')
const jwt = require('jsonwebtoken');
require("dotenv").config('.env');
const bcrypt = require('bcrypt')
const signup=async(req,res)=>{
    try {
        const {name,uniID,password}=req.body;
        const wardn = await warden.findOne({uniID:uniID}); 
        if(!wardn){
            const salt =await bcrypt.genSalt(12);
            const newpass =await bcrypt.hash(password,salt);
            const newwarden = await warden.create({
                name : name ,  uniID : uniID , password : newpass
            })
            return res.status(201).json(newwarden);
        }
        return res.status(401).json({'error':"The warden already exists"});
    } catch (error) {
        return res.status(501).json({"error":"error"});
    }
    //console.log(signup);
}
const login=async(req,res)=>{

    try {
        const {uniID,password}=req.body;
        const wrdn = await warden.findOne({uniID:uniID});
        //console.log(wrdn)
        if(wrdn){
        const pass = wrdn.password;
        const result = await bcrypt.compare(password,pass);
        if(result){
        const token = jwt.sign({ Id:wrdn._id},process.env.SECRET_KEY);
            return res.status(201).json(token);
        }
        return res.status(403).json({"error":"Unauthorized"});
        }
    
    } catch (error) {
        return res.status(501).json({"message":"Please try again after sometime"});
    }  
}
module.exports = ({signup,login})