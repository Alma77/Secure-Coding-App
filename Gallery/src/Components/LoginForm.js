import {useState} from 'react'
import { Login } from '../Services/APIService';
import '../App.css';

const LoginForm = () => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const user = {
            name: userName,
            password: password
        }

        const postedUser = await Login(user)
        console.log('Posted User: '+ user)
    }

    return(
        <div className='App App-header'>
            <h1>Login Form</h1>
            <form onSubmit={onSubmitHandler()}>
                <div className="input-group p-2">
                    <label className="form-label px-2">User Name:</label>
                    <input className="form-control" type="text" onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div className="input-group p-2">
                    <label className="form-label px-2">Password:</label>
                    <input className="form-control" type="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
            </form>
        </div>
    )
}

export default LoginForm;