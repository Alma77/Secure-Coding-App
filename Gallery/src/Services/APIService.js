import axios from "axios";

const header = {
    headers : {
        "Access-Control-Allow-Origin": "*"
    }
}

export const Login = async (user) => {
    const response = await axios.post('www.tannersgallery.duckdns.org/api/Users/login', {...user}, header);
    console.log(response);
    return response.data;
}

export const PostUser = async (newUser) => {
    const response = await axios.post('admin.tannersgallery.duckdns.org/api/Users', {...newUser}, header);
    console.log(response);
    return response.data;
}

export const Logout = async () => {
    const response = await axios.post('www.tannersgallery.duckdns.org/api/Users/logout', header);
    console.log(response);
}

export const GetSession = async () => {
    const response = await axios.get('www.tannersgallery.duckdns.org/api/Users/secure', header);
    return response.data;
}