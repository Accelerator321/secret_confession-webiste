const nodemailer = require('nodemailer');
require('dotenv').config();
    
exports.sendMail=(receiver, msg)=>{

  try{
  
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
  user: 'shyamprime2610@gmail.com',
  pass: process.env.Google_pass
}
});

var mailOptions = {
  from: 'shyamprime2610@gmail.com',
  to: receiver,
   subject: 'Authentication',
    text: `Your OTP ${msg}`
};

transporter.sendMail(mailOptions); 
  }
  catch(err) {
    console.log(err);
  }
}