import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PostProfileImage } from '../Services/APIService'
import "../App.css"

const Secure = () => {

    const token = JSON.parse(window.localStorage.getItem('token'));
    const navigate = useNavigate();

    const formData = new FormData();
    const [file, setFile] = useState();
    const [profileImage, setProfileImage] = useState();

    const uploadImageHandler = async (e) => {
        e.preventDefault();

        formData.append("profileImage", profileImage);
        formData.append("username", token.idTokenClaims.name)

        const file = await PostProfileImage({formData: formData, token: token.idToken});

        setFile(file);
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
            <div className="my-3">
                {file !== undefined ? (<img width="250" height="250" className='img-fluid' alt="profile" src={`https://www.tannersgallery.duckdns.org/Images/ProfilePictures/${file.name}_ProfileImage.${file.extension}`} />) : <></>}
            </div>
            <h1 className="my-3">Welcome {token.idTokenClaims.name} </h1>
            <form onSubmit={uploadImageHandler}>
                <label className="form-label">Input Profile Image:</label>
                <input type="file" className='form-control' onChange={(e) => setProfileImage(e.target.files[0])} />
                <button type="submit" className='btn btn-primary' >Upload Image</button>
            </form>

            <button className="btn btn-primary my-3" onClick={() => navigate("/logout")}>Logout</button>
        </div>
        )
        : <></>            
    )

    return(
        <div>
            <div className="App App-header">
                {content}

                <div className="py-5">
                    <button style={{color: 'white'}} className="btn btn-link btn-lg" onClick={() => navigate("/")} >Back to Home</button>
                </div>
            </div>
        </div>
        
    )
}

export default Secure;
