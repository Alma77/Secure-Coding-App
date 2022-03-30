import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "../App.css"

const Secure = () => {

    const token = JSON.parse(window.localStorage.getItem('token'));
    const navigate = useNavigate();


    useEffect(() => {
        if(token === "" || new Date(token.expiresOn).getTime() <= new Date().getTime())
        {
            navigate("/login")
        }
    },[navigate, token])

    return(
        <div className="App App-header">
            <h1>Welcome {token.idTokenClaims.name}</h1>
        </div>
    )
}

export default Secure;
