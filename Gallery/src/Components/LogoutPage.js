import { useEffect, useState } from 'react';
import { Logout } from '../Services/APIService';
import "../App.css";

const LogoutPage = () => {

    const [loggedOut, setLoggedOut] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            await Logout()
            .then(() => {
                console.log("Successfully Logged Out")
                setLoggedOut(true);
            })
            .catch((ex) => {
                console.log(ex)
            })
        }

        fetch();
    })

    return (
        <div className='App App-header'>
            {loggedOut === true ? <h1>Successfully Logged Out</h1> : <h1>Log Out was unsuccessful</h1>}
        </div>
    )
}

export default LogoutPage;