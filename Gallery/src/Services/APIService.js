import axios from "axios";

const header = {
    headers : {
        "Access-Control-Allow-Origin": "*"
    }
}

export const Login = async (token) => {
    const loginHeader = {
        headers : {
            "Access-Control-Allow-Origin": "*",
            "Authorization": "Bearer " + token.idToken,
        }
    }

    const user = {
        userName: token.UserName,
        Password: "",
        Salt: "",
    }
    const response = await axios.post('https://www.tannersgallery.duckdns.org/api/Users/login', {...user}, loginHeader);
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
