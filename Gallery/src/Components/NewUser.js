import { useState } from "react";
import { PostUser } from "../Services/APIService";
import '../App.css';

const NewUser = () => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const newUser = {
            name: userName,
            password: password
        }

        const postedUser = await PostUser(newUser)
        console.log('Posted User: '+ postedUser)
    }

    return(
        <div className="App App-header">
            <form onSubmit={onSubmitHandler()}>
                <div className="input-group p-2">
                    <label className="form-label px-2">User Name:</label>
                    <input className="form-control" type="text" onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div className="input-group p-2">
                    <label className="form-label px-2">Password:</label>
                    <input className="form-control" type="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
            </form>
        </div>
    )
}

export default NewUser;