const mongoose = require('mongoose');

const sessions = new mongoose.Schema({
    day:{
        type:String,
        required:true
    },
    starttime:{
        type:String,
        required:true
    },
    endtime:{
        type : String,
        required:true
    },
    status:{
        type:String,
        enum:['Pending','Booked','Completed','Unattended'],
        default:'Pending'
    }
})


const WardenSchema = new mongoose.Schema({
name:{
type:String,
unique:true
},
    uniID:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type : String ,
        required : true
    },
    sessions:[sessions]
})

const Warden = mongoose.model('Warden',WardenSchema);
module.exports = Warden;