import { CreateClient } from "../Services/APIService"
import { useState } from "react"

const ClientForm = () => {

    const [name, SetName] = useState("");
    const [ipAddress, SetIpAddress] = useState("");
    const [dateAdded, SetDateAdded] = useState();
    const [ipRange, SetIpRange] = useState("");
    const [publicKey, SetPublicKey] = useState("");
    const [privateKey, SetPrivateKey] = useState("");

    const OnSubmitHandler = (e) =>{
        e.preventDefault()
        const client = {
            id : 0,
            name: name,
            ipAddress: ipAddress,
            dateAdded: new Date(dateAdded),
            ipRange: ipRange,
            publicKey: publicKey,
            privateKey: privateKey
        }

        const response = CreateClient(client)

        console.log(response);
    }

    return(
        <div>
            <form onSubmit={OnSubmitHandler}>
                <div className="input-group p-3">
                    <label className="form-label me-3">Client Name:</label>
                    <input type="text" className="form-control" onChange={(e) => SetName(e.target.value)} />
                </div>
                <div className="input-group p-3">
                    <label className="form-label me-3">Ip Address:</label>
                    <input type="text" className="form-control" onChange={(e) => SetIpAddress(e.target.value)} />
                </div>
                <div className="input-group p-3">
                    <label className="form-label me-3">Date Added:</label>
                    <input type="date" className="form-control" onChange={(e) => SetDateAdded(e.target.value)} />
                </div>
                <div className="input-group p-3">
                    <label className="form-label me-3">Allowed Ip Range:</label>
                    <input type="text" className="form-control" onChange={(e) => SetIpRange(e.target.value)} />
                </div>
                <div className="input-group p-3">
                    <label className="form-label me-3">Client Public Key:</label>
                    <input type="text" className="form-control" onChange={(e) => SetPublicKey(e.target.value)} />
                </div>
                <div className="input-group p-3">
                    <label className="form-label me-3">Client Private Key:</label>
                    <input type="text" className="form-control" onChange={(e) => SetPrivateKey(e.target.value)} />
                </div>
                <button type='submit' className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default ClientForm;