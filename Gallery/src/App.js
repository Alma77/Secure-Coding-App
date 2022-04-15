import logo from './logo.svg';
import { useNavigate } from 'react-router-dom';

import './App.css';

function App() {

  const token = window.localStorage.getItem("token");
  const navigate = useNavigate();
  const loginlogout = ( token === null
    ? <button className="btn btn-primary" onClick={() => navigate("/login")}>Login</button>
    : (
    <>
      <div>
        <button className="btn btn-link" onClick={() => navigate("/secure")} >Main Content</button>
      </div>
      <button className="btn btn-primary" onClick={() => navigate("/logout")}>Logout</button>
    </>)
  )

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        {loginlogout}
      </header>
    </div>
  );
}

export default App;
