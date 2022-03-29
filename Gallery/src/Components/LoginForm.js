import {useState, useEffect} from 'react'
import { Login } from '../Services/APIService';
import { useMsal } from '@azure/msal-react';
import '../App.css';

const LoginForm = () => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const loginRequest = {
        scopes: ["User.Read"]
    };

    const { instance } = useMsal();

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        instance.loginPopup(loginRequest).catch(e => {
            console.error(e);
        });

        const user = {
            name: userName,
            password: password
        }

        // await Login(user)
        //     .catch((ex) => {
        //         console.log(ex);
        //     });
    }

    return(
        <div className='App App-header'>
            <h1>Login Form</h1>
            <form onSubmit={onSubmitHandler}>
                <div className="input-group p-2">
                    <label className="form-label px-2">User Name:</label>
                    <input className="form-control" type="text" onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div className="input-group p-2">
                    <label className="form-label px-2">Password:</label>
                    <input className="form-control" type="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className='btn btn-primary'>Submit</button>
            </form>
        </div>
    )
}

export default LoginForm;
