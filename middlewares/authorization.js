const jwt = require('jsonwebtoken');
require("dotenv").config('.env');


const authorization = async(req,res,next)=>{

    const str = req.headers['authorization'];
    const recvtoken = str.split(" ")[1];
  
    if(recvtoken==null){
        return res.status(404).json({"message":"Token not found"})
    }

    jwt.verify(recvtoken,process.env.SECRET_KEY,(err,Id)=>{
        if(err){
            console.log(err)
            return res.status(403).json({"message":"Token not valid"});
        }
        req.user = Id;  
        next();
    })
}
module.exports=authorization

