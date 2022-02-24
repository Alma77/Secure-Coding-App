import axios from "axios";

const header = {
    headers : {
        "Access-Control-Allow-Origin": "*"
    }
}

export const Login = async (user) => {
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
    console.log(response.data);
    return response.data;
}
