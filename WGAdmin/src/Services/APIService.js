import axios from "axios";

const baseURL = "https://admin.tannersgallery.duckdns.org/api";
const header = {
    headers : {
        "Access-Control-Allow-Origin": "*"
    }
}

export const GetClients = async () => {
    const response = await axios.get(baseURL + "/Clients", header);
    return response.data;
}

export const CreateClient = async (client) => {
    const response = await axios.post(baseURL + "/Clients", {...client}, header);
    return response.data;
}

export const GetWireGuardStatus = async () => {
    const response = await axios.get(baseURL + "/Admin/status", header);
    return response.data;
}

export const ResetWireGuard = async () => {
    const response = await axios.get(baseURL + "/Admin/reset", header);
    return response.data;
}
