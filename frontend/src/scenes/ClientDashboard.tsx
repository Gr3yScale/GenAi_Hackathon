import { useTheme } from "@mui/material";
import { tokens } from "../theme.ts";
import Speedometer from "../components/Speedometer.tsx";
import { useEffect, useState } from "react";
import { ClientData, CSIDrequest, ClientDataResponce } from "../types/clientScoring.ts";
import { useParams } from 'react-router-dom';
import Api from "../Framework/api/api.ts";
import "../components/spinner.css"


function DashBoard() {
    const { csid } = useParams();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [clientData, setClientData] = useState<ClientData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);  // To handle loading state

    useEffect(() => {
        async function fetchData() {
            try {
                if (csid == undefined) {
                    console.log("URL ERROR");
                    return;
                }
                const data = await getClientData(csid);;  // Fetch data asynchronously
                console.log(data)
                setClientData(data);  // Update state with the fetched data
            } catch (error) {
                console.error('Error fetching client data:', error);
                setClientData(null);  // Handle error and reset data if needed
            } finally {
                setLoading(false);  // Mark loading as complete
            }
        }

        fetchData(); // Call the async function when the component mounts or CSID changes
    }, [csid]);  // Dependency array ensures this effect runs when CSID changes

    async function getClientData(CSID: string): Promise<ClientData> {
        const ApiUrl = import.meta.env.Vite_ApiUrl || "http://192.168.1.132:3000";
        const req: CSIDrequest = { CSID }
        const response = await Api<ClientDataResponce, CSIDrequest>(
            "GET",
            ApiUrl + "/dummy",
            req
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
                    <div style={{ border: '1px solid #ccc', padding: '20px', maxWidth: '800px', fontFamily: 'Arial, sans-serif' }}>
                        {/* First Row with Vertical Divider */}
                        <div style={{ display: 'flex', borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '10px' }}>
                            {/* Left Column */}
                            <div style={{ flex: 1, paddingRight: '10px' }}>
                                <p><strong>CSID</strong>: {clientData.CSID}</p>
                                <p><strong>Customer Name</strong>: {clientData.customerName}</p>
                                <p><strong>Relationship Manager</strong>: {clientData.relationshipManager}</p>
                            </div>

                            <div style={{ width: '1px', backgroundColor: '#ddd', margin: '0 10px' }} />

                            {/* Right Column */}
                            <div style={{ flex: 1 }}>
                                <p><strong>Payments</strong>: {clientData.payments}</p>
                                <p><strong>Value</strong>: {clientData.value}</p>
                                <p><strong>STP Rate</strong>: {clientData.stpRate}</p>
                                <p><strong>Client Rating</strong>: {clientData.clientRating}</p>
                            </div>
                        </div>

                        {/* Second Row with Comments and Improvements */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                            <div style={{ flex: 1, paddingRight: '10px' }}>
                                <p><strong>Comments</strong></p>
                                <p>{clientData.improvements}</p>
                            </div>

                            <div style={{ width: '1px', backgroundColor: '#ddd', margin: '0 10px' }} />

                            <div style={{ flex: 1 }}>
                                <p><strong>Improvements</strong></p>
                                <ul>
                                    {clientData.comments ?
                                        clientData.comments.map((comments, index) => (
                                            <li key={index} style={{ color: comments.positive ? 'green' : 'red' }}>
                                                {comments.positive ? '✓' : '✗'} {comments.text}
                                            </li>
                                        )) : (<></>)
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>


                    {/*<Speedometer value={clientData.clientRating / 100} colors={{ needle: colors.grey[500] }} />*/}
                </div>
            ) : (
                <div>No data available</div>
            )}

        </>

    )
}

export default DashBoard;
