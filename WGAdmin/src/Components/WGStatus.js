import { useEffect, useState } from "react";
import { GetWireGuardStatus, ResetWireGuard } from "../Services/APIService";

const WGStatus = () => {

    const [wgStatus, setWGStatus] = useState("")

    useEffect(() => {
        const response = GetWireGuardStatus();

        setWGStatus(response.data)
    },[])

    const WGResetHandler = () => {
        const response = ResetWireGuard()

        setWGStatus(response.data)
    }

    return(
        <>
            <div className="py-5">
                {wgStatus}
            </div>
            <button onClick={() => WGResetHandler()} className="btn btn-secondary">Reset Wireguard</button>
        </>
    )
}

export default WGStatus;