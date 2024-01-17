const nodemailer = require('nodemailer');
require('dotenv').config();

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
  user: 'shyamprime2610@gmail.com',
  pass: process.env.Google_pass
}
});
    
exports.sendMail=async (receiver, msg)=>{

  try{
  


var mailOptions = {
  from: 'shyamprime2610@gmail.com',
  to: receiver,
   subject: 'Authentication',
    text: `Your OTP ${msg}`
};

await transporter.sendMail(mailOptions); 
  }
  catch(err) {
    console.log(err);
  }
}