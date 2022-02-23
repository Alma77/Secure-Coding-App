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
import Logout from './Components/Logout';

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/secure" element={<Secure />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
