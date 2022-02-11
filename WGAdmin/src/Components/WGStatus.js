import { useEffect, useState } from "react";
import { GetWireGuardStatus, ResetWireGuard } from "../Services/APIService";

const WGStatus = () => {

    const [wgStatus, setWGStatus] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            const response = await GetWireGuardStatus();
            setWGStatus(response)
        }

        fetchData();
    },[])

    const WGResetHandler = () => {
        console.log("WGResetHandler Hit")
        const fetchData = async () => {
            const response = await ResetWireGuard()
            setWGStatus(response)
        }

        fetchData();
    }

    return(
        <>
            <div className="py-5">
                <p className="container">{wgStatus}</p>
            </div>
            <button onClick={() => WGResetHandler()} className="btn btn-secondary">Reset Wireguard</button>
        </>
    )
}

export default WGStatus;
