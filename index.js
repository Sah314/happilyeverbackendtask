const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config('.env');

//const routes=require("./routes");

const routes = require('./routes')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/',routes);


const connecttoDB = async()=>{
  try {
    await mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true,
      useUnifiedTopology: true})
      console.log("Connected successfully");
  } catch (error) {
    console.error(error);
  }
}
connecttoDB();

app.listen(5000, (err) => {
    if (err) {
      console.log('Error in server', err);
    } else {
      console.log(`Server is running on port 5000`);
    }
  });