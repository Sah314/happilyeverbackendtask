const warden = require('../models/Warden');
const dayToNum = require('../utils/daytonum');
require("dotenv").config('.env');

const getSessions=async(req,res)=>{
    try {
        const sess = await warden.find({},"name sessions");
        const sessions =[];
        sess.forEach((ele)=>{if(ele.sessions.length!==0) sessions.push(ele)})
        console.log(sessions);
        res.json(sessions);
    } catch (error) {
        res.status(501);
    }
}

const getMySessions = async(req,res)=>{
try {
    const uniID = req.user.userId;
    const mysess = await warden.find({uniID:uniID},"sessions");
    const session=[]
    //const timenow = Date.now();
   // console.log()
    mysess[0].sessions.forEach((ele)=>{
    var day =ele.day;
    var endTime = ele.endtime;
    var time;
    //console.log(endTime);
    const t1 = endTime.split(" ")[0];
    const t2 = endTime.split(" ")[1];
    const hr = t1.split(":")[0];
    const min = t1.split(":")[1];
    
    if(t2==="AM"){
            time = parseInt(hr)*60+parseInt(min);
    }
    else{
            time =  time = (parseInt(hr)+12)*60+parseInt(min);
    }
     //console.log(dayToNum(day))
     //console.log(sessdate.getMinutes());
     console.log(time);
    // Parse the datetime string into a JavaScript Date object
    const sessdate = new Date();
//console.log(sessdate.getHours());
    if(sessdate.getDay()<dayToNum(day)){
        session.push(ele);
    }
    else if(sessdate.getDay()==dayToNum(day)){
        const sesstime = (sessdate.getHours())*60 +sessdate.getMinutes();
        console.log(sesstime);
        if(time>sesstime){
            session.push(ele);
        }
    }  
  })
    res.json(session);

} catch (error) {
    res.status(501).json({"message":"error"})
}
}
const bookSession=async(req,res)=>{
    const uniID = req.user.userId;
    const {id,dayid} = req.params;
    const updatedData = await warden.updateOne(
        { uniID: id, "sessions._id": dayid }, 
        {
          $set: {
            "sessions.$.bookedby": uniID, 
            "sessions.$.status": "Booked",   
          },
        }
      );
    res.json(updatedData);  
    }

module.exports = ({getSessions,getMySessions,bookSession});