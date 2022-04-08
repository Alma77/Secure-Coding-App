import axios from "axios";

const header = {
    headers : {
        "Access-Control-Allow-Origin": "*"
    }
}

export const Login = async (token) => {
    const header = {
        headers : {
            "Authorization" : "Bearer " + token.idToken,
            "Access-Control-Allow-Origin": "*",
        }
    }

    const user = {
        Name: token.idTokenClaims.name,
        Password: "",
        Salt: "",
    }
    const response = await axios.post('https://www.tannersgallery.duckdns.org/api/Users/login', {...user}, header);
    console.log(response.data);
    return response.data;
}

export const PostUser = async (newUser) => {
    const response = await axios.post('https://admin.tannersgallery.duckdns.org/api/Users', {...newUser}, header);
    console.log(response.data);
    return response.data;
}

export const Logout = async () => {
    const response = await axios.post('https://www.tannersgallery.duckdns.org/api/Users/logout', header);
    console.log(response.data);
}

export const GetSession = async () => {
    const response = await axios.get('https://www.tannersgallery.duckdns.org/api/Users/secure', header);
    console.log(response);
    return response;
}

export const PostProfileImage = async ({formData, token}) => {

    const header = {
        headers : {
            "Authorization" : "Bearer " + token.idToken,
            "Access-Control-Allow-Origin": "*",
        }
    }

    const response = await axios.post('https://www.tannersgallery.duckdns.org/api/Users/image', formData , header)
    console.log(response);
    return response.data;
}
