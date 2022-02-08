import ClientForm from './Components/ClientForm';
import WGStatus from './Components/WGStatus';
import './App.css';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='py-5'>WireGuard Admin</h1>
        <ClientForm />
        <WGStatus />
        <button onClick={() => WGResetHandler} className="btn btn-secondary">Reset Wireguard</button>
      </header>
    </div>
  );
}

export default App;
