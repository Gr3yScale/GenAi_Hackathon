import { useTheme } from "@mui/material";
import { tokens } from "../theme.ts";
import Speedometer from "../components/Speedometer.tsx";
import { useState } from "react";
import { ClientData } from "../types/clientScoring.ts";
import Api from "../Framework/api/api.ts";

type props = {
    CSID: String;
}

function DashBoard({ CSID }: props) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [ClientData, setClientData] = useState(getClientData(CSID));

    function getClientData(CSID: String): ClientData {

        Api.call("GET")
    }

    return (
        <>
            <Speedometer value={ClientData.CSID / 100} colors={{ needle: colors.grey[500] }} />
        </>

    )
}

export default DashBoard;
