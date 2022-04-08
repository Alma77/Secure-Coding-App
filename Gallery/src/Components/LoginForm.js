import {useEffect} from 'react'
import { Login} from '../Services/APIService';
import { useMsal } from '@azure/msal-react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const LoginForm = () => {

    //const [userName, setUserName] = useState("");
    //const [password, setPassword] = useState("");
    const { instance } = useMsal();
    const token = JSON.parse(window.localStorage.getItem('token'))
    const navigate = useNavigate();
    // const onSubmitHandler = async (e) => {
    //     e.preventDefault();
    // }
    
    useEffect(() => {
        const StartSession = async (token) => {
            await Login(token)

            navigate("/secure")
        }
        const fetchData = async () => {
            if(token !== null)
            {
                if(token.idTokenClaims.exp < new Date()/1000)
                {
                    const loginRequest = {
                        scopes: ["User.Read"]
                    };
            
                    instance.loginPopup(loginRequest)
                        .then(res => {
                            console.log(res)
                            window.localStorage.setItem('token', JSON.stringify(res))
                            StartSession(res)
                        })
                        .catch(e => {
                            console.error(e);
                        });
                }

                navigate("/secure")
            }
            else
            {
                const loginRequest = {
                    scopes: ["User.Read"]
                };
        
                instance.loginPopup(loginRequest)
                    .then(res => {
                        console.log(res)
                        window.localStorage.setItem('token', JSON.stringify(res))
                        StartSession(res)
                    })
                    .catch(e => {
                        console.error(e);
                    });
            }            
        }

        fetchData();
    },[instance, token, navigate])

    return(
        // <div className='App App-header'>
        //     <h1>Login Form</h1>
        //     <form onSubmit={onSubmitHandler}>
        //         <div className="input-group p-2">
        //             <label className="form-label px-2">User Name:</label>
        //             <input className="form-control" type="text" onChange={(e) => setUserName(e.target.value)} />
        //         </div>
        //         <div className="input-group p-2">
        //             <label className="form-label px-2">Password:</label>
        //             <input className="form-control" type="password" onChange={(e) => setPassword(e.target.value)} />
        //         </div>
        //         <button type="submit" className='btn btn-primary'>Submit</button>
        //     </form>
        // </div>
        <></>
    )
}

export default LoginForm;
