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
            try{
                const session = await GetSession()
                .catch(() => {
                    navigate('/login')
                })
                setSession(session);
            }
            catch(ex)
            {
                setIsValid(true)
                console.log(ex)
                navigate('/login')
            }
        }
        fetchData();
    },[navigate])

    return(
        <div className="App App-header">
            <h1>Welcome {isValid === true ? ` ${session.User.Name}` : ""}</h1>
        </div>
    )
}

export default Secure;