import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PostProfileImage } from '../Services/APIService'
import "../App.css"

const Secure = () => {

    const token = JSON.parse(window.localStorage.getItem('token'));
    const navigate = useNavigate();

    const formData = new FormData();
    const [extension, setExtension] = useState();
    const [profileImage, setProfileImage] = useState();

    const uploadImageHandler = async (e) => {
        e.preventDefault();
        formData.append("profileImage", profileImage);
        formData.append("username", token.idTokenClaims.name)

        setExtension(await PostProfileImage(formData));
    };

    useEffect(() => {
        if(token === null || token.idTokenClaims.exp < new Date()/1000)
        {
            navigate("/login")
        }
    },[navigate, token])

    const content = (token !== null 
        ? (
        <div>
            <div>
                <img className='img-fluid' alt="profile" src={`/Images/ProfileImages/${token.idTokenClaims.name}_ProfileImage.${extension}`} />
            </div>
            <h1>Welcome {token.idTokenClaims.name} </h1>
            <form onSubmit={uploadImageHandler}>
                <label className="form-label">Input Profile Image:</label>
                <input type="file" className='form-control' onChange={(e) => setProfileImage(e.target.files[0])} />
                <button type="submit" className='btn btn-primary' >Upload Image</button>
            </form>
        </div>
        )
        : <></>            
    )

    return(
        <div className="App App-header">
            {content}
        </div>
    )
}

export default Secure;
