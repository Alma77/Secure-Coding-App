import axios from "axios";

const baseURL = "api/Clients";
const header = {
    headers : {
        "Access-Control-Allow-Origin": "*"
    }
}

export const GetClients = async () => {
    const response = await axios.get(baseURL, header);
    return response.data;
}

export const CreateClient = async (client) => {
    const response = await axios.post(baseURL, {...client}, header)
    return response.data;
}