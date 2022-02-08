import { useEffect, useState } from "react";
import { GetWireGuardStatus } from "../Services/APIService";

const WGStatus = () => {

    const [wgStatus, setWGStatus] = useState("")

    useEffect(() => {
        const response = GetWireGuardStatus();

        setWGStatus(response)
    },[])

    return(
        <div className="py-5">
            {wgStatus}
        </div>
    )
}

export default WGStatus;