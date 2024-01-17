
import React from 'react'

import SignUp from './routes/SignUp'
import { Route, Routes } from 'react-router-dom'
import OtpPage from './routes/OtpPage'
import SignIn from './routes/SignIn'
import PostSecret from './routes/PostSecret'
import ForgotPass from './components/Password_Changing/ForgotPass'
import Home from './routes/Home'
import "./App.css"
import Navbar from './components/Navbar'
import SecretPage from './routes/SecretPage'
import MyAlert from './components/MyAlert'

// import SecretsCard from './components/SecretsCard'

const App = () => {
  return (
    <>
    <MyAlert/>
    <Navbar/>
    
      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/otp' element={<OtpPage/>}/>
        <Route path="/signin" element ={<SignIn/>} />
        <Route path="/forgotpass" element ={<ForgotPass/>} />
        
        <Route path='/postsecret' element={<PostSecret/>} />
        <Route path='/secrets/:id' element={<SecretPage/>} />

     
     </Routes>
     
    </>
  )
}

export default App