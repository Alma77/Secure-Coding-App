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

        profileImage.type

        formData.append("profileImage", profileImage);
        formData.append("username", token.idTokenClaims.name)

        const extension = await PostProfileImage({formData: formData, token: token.idToken});

        setExtension(extension);
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
                <img width="250" height="250" className='img-fluid' alt="profile" src={`https://wwww.tannersgallery.duckdns.org/api/Images/ProfilePictures/${token.idTokenClaims.name}_ProfileImage.${extension}`} />
            </div>
            <h1>Welcome {token.idTokenClaims.name} </h1>
            <form onSubmit={uploadImageHandler}>
                <label className="form-label">Input Profile Image:</label>
                <input type="file" className='form-control' onChange={(e) => setProfileImage(e.target.files[0])} />
                <button type="submit" className='btn btn-primary' >Upload Image</button>
            </form>

            <button className="btn btn-primary" onClick={() => navigate("/logout")}>Logout</button>
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
