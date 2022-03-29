import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginForm from './Components/LoginForm';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/scss/bootstrap.scss'
import 'bootstrap/dist/js/bootstrap.js'
import Secure from './Components/Secure';
import LogoutPage from './Components/LogoutPage';
import { AuthProvider } from 'react-oidc-context';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from "@azure/msal-browser"

const msalConfig = {
  auth: {
    authority: "https://login.microsoftonline.com/490b8e69-a0b3-41a0-8d3d-b19da68256bb/oauth2/v2.0/authorize",
    client_id: "1ce419d8-9475-4d32-a8db-ad18b6338b4a",
    redirect_uri: "http://localhost:3000/secure",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  }
};

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.render(

  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <CookiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/secure" element={<Secure />} />
            <Route path="/logout" element={<LogoutPage />} />
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
    </MsalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
