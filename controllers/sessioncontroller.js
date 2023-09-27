const warden = require('../models/Warden')
require("dotenv").config('.env')

const getsessions=async(req,res)=>{
    try {
        const sess = await warden.find({},"name sessions");
        const sessions =[];
        sess.forEach((ele)=>{if(ele.sessions.length!==0) sessions.push(ele)})
        console.log(sessions);
        res.json(sessions);
    } catch (error) {
        res.status(501);
    }
//res.json("getsessions");
}

module.exports = getsessions;