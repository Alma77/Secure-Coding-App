import { useEffect, useState } from 'react';
import { Logout } from '../Services/APIService';
import { useMsal } from '@azure/msal-react';
import "../App.css";

const LogoutPage = () => {

    const [loggedOut, setLoggedOut] = useState(false);
    const { instance } = useMsal();

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
            {loggedOut === true ? <h1>Successfully Logged Out</h1> : <h1>Log Out was unsuccessful</h1>}
        </div>
    )
}

export default LogoutPage;