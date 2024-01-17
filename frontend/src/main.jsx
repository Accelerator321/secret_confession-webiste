import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter as Router} from "react-router-dom";
import AuthProvider from './contexts/AuthProvider.jsx';
import AlertProvider from './contexts/AlertPprovider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <Router>
        <AlertProvider>
      <AuthProvider>
    <App />
    </AuthProvider>
    </AlertProvider>
    </Router>
  </React.StrictMode>,
)
