import { useEffect, useState } from 'react';
import { Logout } from '../Services/APIService';
import { useMsal } from '@azure/msal-react';
import { useNavigate } from 'react-router-dom';
import "../App.css";

const LogoutPage = () => {

    const [loggedOut, setLoggedOut] = useState(false);
    const { instance } = useMsal();
    const navigate = useNavigate();

    useEffect(() => {
        const StartLogout = async () => {
            window.localStorage.removeItem('token');
            await Logout()
            .then(() => {
                console.log("Successfully Logged Out")
                setLoggedOut(true);
            })
            .catch((ex) => {
                console.log(ex)
            })
        } 
        const fetch = async () => {

            instance.logoutPopup()
                .then(() => {
                    StartLogout()
                })
                .catch(e => {
                    console.error(e);
                })
        }

        fetch();
    },[instance])

    return (
        <div className='App App-header'>
            {loggedOut === true 
                ? (
                <div>
                    <h1>Successfully Logged Out</h1>
                </div>) 
                : (
                <div>
                    <h1>Log Out was unsuccessful</h1>
                </div>
                )}
            <button className="btn btn-primary" onClick={() => navigate("/")} />
        </div>
    )
}

export default LogoutPage;