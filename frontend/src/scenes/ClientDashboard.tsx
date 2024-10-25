import { useTheme } from "@mui/material";
import { tokens } from "../theme.ts";
import Speedometer from "../components/Speedometer.tsx";
import { useEffect, useState } from "react";
import { ClientData, CSIDrequest, ClientDataResponce } from "../types/clientScoring.ts";
import Api from "../Framework/api/api.ts";
import "../components/spinner.css"

type props = {
    CSID: string;
}

function DashBoard({ CSID }: props) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [clientData, setClientData] = useState<ClientData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);  // To handle loading state

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getClientData(CSID);  // Fetch data asynchronously
                setClientData(data);  // Update state with the fetched data
            } catch (error) {
                console.error('Error fetching client data:', error);
                setClientData(null);  // Handle error and reset data if needed
            } finally {
                setLoading(false);  // Mark loading as complete
            }
        }

        fetchData(); // Call the async function when the component mounts or CSID changes
    }, [CSID]);  // Dependency array ensures this effect runs when CSID changes

    async function getClientData(CSID: string): Promise<ClientData> {
        const response = await Api<ClientDataResponce, CSIDrequest>(
            "GET",
            import.meta.env.ApiUrl,
            { CSID }
        );
        return response.data.client;
    }

    if (loading) {
        return (
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>
        );  // Show a big spinner when loading
    }

    return (
        <>
            {clientData ? (
                <div>
                    <Speedometer value={clientData.clientRating / 100} colors={{ needle: colors.grey[500] }} />
                </div>
            ) : (
                <div>No data available</div>
            )}

        </>

    )
}

export default DashBoard;
