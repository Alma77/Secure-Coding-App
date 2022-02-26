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
                await GetSession()
                .then(res => {
                    console.log(res)
                    if(res.status === 200)
                    {
                        setIsValid(true);
                        setSession(res.data);
                    }
                    else
                    {
                        navigate("/login");
                    }
                })
        }
        fetchData();
    },[navigate])

    return(
        <div className="App App-header">
            {isValid === true ? <h1>Welcome {session.user.name}</h1> : <></>}
        </div>
    )
}

export default Secure;
