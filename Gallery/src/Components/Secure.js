import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "../App.css"

const Secure = () => {

    const token = JSON.parse(window.localStorage.getItem('token'));
    const navigate = useNavigate();


    useEffect(() => {
        if(token === null || token.idTokenClaims.exp < new Date()/1000)
        {
            navigate("/login")
        }
    },[navigate, token])

    const content = (token !== null 
        ? <h1>Welcome {token.idTokenClaims.name} </h1>
        : <></>            
    )

    return(
        <div className="App App-header">
            {content}
        </div>
    )
}

export default Secure;
