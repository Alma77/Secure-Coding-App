import { useEffect, useState } from 'react'
import { GetSession } from '../Services/APIService'
import { useNavigate } from 'react-router-dom'
import "../App.css"

const Secure = () => {

    const [session, setSession] = useState({});
    const [isValid, setIsValid] = useState(false)
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            const session = await GetSession()
            .then(() => setIsValid(true))
            .catch((ex) => {
                console.log(ex)
                navigate('/login')
            })
            setSession(session);
        }
        fetchData();
    },[navigate])

    return(
        <div className="App App-header">
            {isValid === true ? <h1>Welcome {session.User.Name}</h1>: <h1></h1>}
        </div>
    )
}

export default Secure;