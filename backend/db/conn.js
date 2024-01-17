const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.Connection_string)
.then(()=>console.log("connected to db"))
.catch(err=>console.log(err));