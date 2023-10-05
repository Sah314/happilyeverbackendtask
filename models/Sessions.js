const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    wardenID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Warden',
        required: true
    },
    bookedByID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Warden', 
      },
      sessionday:{
        type:String,
        required: true
      },
    starttime: {
        type: String,
        required: true
    },
    endtime: { 
        type: String,
        required: true
    },
    isBooked: {
        type: Boolean,
        default: false
    }
});

const Sessions = mongoose.model('Sessions',sessionSchema);



module.exports = Sessions;