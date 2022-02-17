import axios from "axios";

const header = {
    headers : {
        "Access-Control-Allow-Origin": "*"
    }
}

export const Login = async (user) => {
    const response = await axios.post('www.tannersgallery.duckdns.org/api/Users/Login', {...user}, header);
    return response.data;
}

export const PostUser = async (newUser) => {
    const response = await axios.post('admin.tannersgallery.duckdns.org/api/Users', {...newUser}, header);
    return response.data;
}