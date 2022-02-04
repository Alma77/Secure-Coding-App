import ClientForm from './Components/ClientForm';
import './App.css';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='py-5'>WireGuard Admin</h1>
        <ClientForm />
      </header>
    </div>
  );
}

export default App;
