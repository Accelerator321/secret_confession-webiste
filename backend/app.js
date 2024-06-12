const express = require('express');
const app =express() ;
require('./db/conn');
require("dotenv").config();
const userController = require("./controllers/userController");
const secretController = require("./controllers/secretController");
const port = process.env.PORT;
const {authUser} = require("./functions/auth");
const sessions = require("express-session");
var MongoDBStore = require('connect-mongodb-session')(sessions);
var cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require("path");


app.use(cors({
  // origin:["https://accelerator321.github.io","https://Accelerator321.github.io"], 
  credentials: true,
}));

app.use(express.static(path.join(__dirname, '/dist')));
app.use(cookieParser());


console.log(process.env.ORIGIN)




var store = new MongoDBStore({
  uri: process.env.Connection_string,
  collection: 'sessions',
  expires: 1000 * 60 * 5    // 5 minutes
});


app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.listen(port, ()=>{
    console.log(`we are connected at port ${port}`);
})




app.set('trust proxy', 1);

app.use(sessions({
    secret: process.env.Session_secret,
    resave: false,
    saveUninitialized: false,
    store: store,
    proxy:true,
    name: 'MyCoolWebAppCookieName', // This needs to be unique per-host.
    cookie: {
      secure: true, 
    
      httpOnly: false,
      sameSite: 'none'
    }
}));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.post('/signup', userController.addUser);
app.post('/signin',userController.signIn);
app.get("/getuser", authUser,userController.getUser);

app.post('/secrets', authUser, secretController.addSecret);
app.get('/secrets', secretController.getSecrets);
app.post("/secretsbyid",secretController.getSecretByid );

app.post('/otp', userController.getOtp);
// app.post('/otp', userController.varifyOtp);
app.post("/changepassword", userController.changePassword);

