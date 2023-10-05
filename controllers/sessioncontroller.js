const warden = require('../models/Warden');
const session = require('../models/Sessions');
const dayToNum = require('../utils/daytonum');
require("dotenv").config('.env');

const addSession = async(req,res)=>{
    try {
        const {wardenID,sessionday,starttime,endtime} = req.body;

        const newsession = await session.create({
            wardenID:wardenID,sessionday:sessionday,
            starttime:starttime,
            endtime:endtime
        });
        await newsession.populate("wardenID");
        if(!newsession){
console.log("sess")
        }
        res.json(newsession)
    } catch (err) {
        res.status(501).json("error");
    }
}



const getSessions = async (req, res) => {
    try {
      
      const sessions = await session.find({isBooked:false});
      if(!sessions){
        return res.status(404).json({"error":"no free sessions available. Please check after sometime"});
      }
      await session.populate(sessions, [
        { path: 'wardenID', select: 'name' },
        { path: 'bookedByID', select: 'name' },
      ]);
  
      res.json({"available sessions":sessions});
    } catch (error) {
      res.status(501).json({ error: 'Server error' });
    }
  };
  

const getMySessions = async(req,res)=>{
try {
    const myID = req.user.Id;
    //console.log(myID);
    const mysess = await session.find({wardenID:myID});
   if(!mysess){
    return res.status(404).json({"error":"No session available for this user"})
   }
    //conole.log(sessions);

    const sess=[]
    //const timenow = Date.now();
   // console.log()
    mysess.forEach((ele)=>{
    var day =ele.sessionday;
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
     console.log(time);

    const sessdate = new Date();
//console.log(sessdate.getHours());
    if(sessdate.getDay()<dayToNum(day)){
        sess.push(ele);
    }
    else if(sessdate.getDay()==dayToNum(day)){
        const sesstime = (sessdate.getHours())*60 +sessdate.getMinutes();
        console.log(sesstime);
        if(time>sesstime){
            sess.push(ele);
        }
    }  
  })
    res.json(sess);

} catch (error) {
    res.status(501).json({"message":"error"})
}
}

const bookSession=async(req,res)=>{
    const bookedByID = req.user.Id;
    console.log(bookedByID);
    const {sessionId} = req.params;
    const updatedData = await session.findById(sessionId);
    if(!updatedData){
      return res.status(404).json({"message":"This session does not exist"});
    }
    updatedData.bookedByID=bookedByID;
    updatedData.isBooked=true;
      await updatedData.populate(["bookedByID","wardenID"]);
      await updatedData.save();
    res.json(updatedData);  
    }

module.exports = ({getSessions,getMySessions,bookSession,addSession});