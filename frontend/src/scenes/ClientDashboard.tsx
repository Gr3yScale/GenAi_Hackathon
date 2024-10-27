import { Box, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Stack, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme.ts";
import Speedometer from "../components/Speedometer.tsx";
import { useEffect, useState } from "react";
import { ClientData, CSIDrequest, ClientDataResponce } from "../types/clientScoring.ts";
import { useParams } from 'react-router-dom';
import { fetchApi } from "../Framework/api/api.ts";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
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
        const response = await fetchApi<ClientDataResponce, CSIDrequest>(
            "GET",
            ApiUrl + "/dummy/csid/" + CSID,
            {}
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
    /*
        function Box1(data: ClientData) {
            return (
                <Box>
                    <Typography noWrap variant="subtitle1" gutterBottom><strong>CSID</strong>: {data.CSID}</Typography>
                    <Typography noWrap variant="subtitle1" gutterBottom><strong>Customer Name</strong>: {data.customerName}</Typography>
                    <Typography noWrap variant="subtitle1" gutterBottom><strong>Relationship Manager</strong>: {data.relationshipManager}</Typography>
                </Box>
            )
        }
        function Box2(data: ClientData) {
            return (
                <Box>
                    <Typography noWrap variant="subtitle1" gutterBottom><strong>Payments</strong>: {data.payments}</Typography>
                    <Typography noWrap variant="subtitle1" gutterBottom><strong>Value</strong>: {data.value}</Typography>
                    <Typography noWrap variant="subtitle1" gutterBottom><strong>STP Rate</strong>: {data.stpRate}</Typography>
                    <Typography noWrap variant="subtitle1" gutterBottom><strong>Client Rating</strong>: {data.clientRating}</Typography>
                </Box>
            )
        }
        function Box3(data: ClientData) {
            return (
                <Box>
                    <Typography variant="subtitle1" gutterBottom><strong>Comments</strong></Typography>
                    <List dense>
                        {
                            data.comments ?
                                data.comments.map((comment, index) => (
                                    <ListItem key={index}>
                                        <ListItemIcon>
                                            {comment.positive ? (
                                                <CheckCircleIcon color="success" />
                                            ) : (
                                                <CancelIcon color="error" />
                                            )}
                                        </ListItemIcon>
                                        <ListItemText primary={comment.text} />
                                    </ListItem>
                                )) : (<></>)}
                    </List>
                </Box>
            )
        }
        function Box4(data: ClientData) {
            return (
                <Box>
                    <Typography variant="subtitle1" gutterBottom><strong>Improvements</strong></Typography>
                    <Typography variant="body2" color="textSecondary">{data.improvements}</Typography>
                </Box>
            )
        }
        function Box5(data: ClientData) {
            return (
                <Speedometer value={data.clientRating / 100} colors={{ needle: colors.grey[500] }} />
            )
        }*/

    return (
        <>
            {
                clientData ? (
                    <Box
                        display="flex"
                        height="40vh"
                        sx={{
                            overflow: 'hidden'
                        }}
                    >
                        <Box
                            sx={{
                                flex: '2',
                                display: 'flex',
                                flexDirection: 'column', // Stack rows vertically
                                justifyContent: 'space-between',
                                padding: 2 // Add some padding
                            }}
                        >
                            {/* First Row */}
                            <Box display="flex" flexDirection="row" justifyContent="space-between" width="100%" flex="10">
                                <Box
                                    sx={{
                                        flex: '10',
                                        display: 'flex',
                                        alignItems: 'top',
                                        justifyContent: 'left',
                                        height: '100%' // Full height of the row
                                    }}
                                >
                                    <Box>
                                        <Typography noWrap variant="subtitle1" gutterBottom><strong>CSID</strong>: {clientData.CSID}</Typography>
                                        <Typography noWrap variant="subtitle1" gutterBottom><strong>Customer Name</strong>: {clientData.customerName}</Typography>
                                        <Typography noWrap variant="subtitle1" gutterBottom><strong>Relationship Manager</strong>: {clientData.relationshipManager}</Typography>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        flex: '1',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '100%' // Full height of the row
                                    }}
                                >
                                    <Divider orientation="vertical" flexItem />
                                </Box>
                                <Box
                                    sx={{
                                        flex: '10',
                                        display: 'flex',
                                        alignItems: 'top',
                                        justifyContent: 'left',
                                        height: '100%' // Full height of the row
                                    }}
                                >
                                    <Box>
                                        <Typography noWrap variant="subtitle1" gutterBottom><strong>Payments</strong>: {clientData.payments}</Typography>
                                        <Typography noWrap variant="subtitle1" gutterBottom><strong>Value</strong>: {clientData.value}</Typography>
                                        <Typography noWrap variant="subtitle1" gutterBottom><strong>STP Rate</strong>: {clientData.stpRate}</Typography>
                                        <Typography noWrap variant="subtitle1" gutterBottom><strong>Client Rating</strong>: {clientData.clientRating}</Typography>
                                    </Box>
                                </Box>
                            </Box>

                            {/* Middle Row */}
                            <Box
                                sx={{
                                    flex: '3', // Fill 1/7 of the space
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '100%' // Full height
                                }}
                            >
                                <Box display="flex">
                                    <Divider sx={{ width: 700 }} />
                                </Box>
                            </Box>

                            {/* Second Row */}
                            <Box display="flex" flexDirection="row" justifyContent="space-between" width="100%" flex="10">
                                <Box
                                    sx={{
                                        flex: '10',
                                        display: 'flex',
                                        alignItems: 'top',
                                        justifyContent: 'left',
                                        height: '100%' // Full height of the row
                                    }}
                                >
                                    <Box>
                                        <Typography variant="subtitle1" gutterBottom><strong>Comments</strong></Typography>
                                        <List dense>
                                            {
                                                clientData.comments ?
                                                    clientData.comments.map((comment, index) => (
                                                        <ListItem key={index}>
                                                            <ListItemIcon>
                                                                {comment.positive ? (
                                                                    <CheckCircleIcon color="success" />
                                                                ) : (
                                                                    <CancelIcon color="error" />
                                                                )}
                                                            </ListItemIcon>
                                                            <ListItemText primary={comment.text} />
                                                        </ListItem>
                                                    )) : (<></>)}
                                        </List>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        flex: '1',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '100%' // Full height of the row
                                    }}
                                >
                                    <Divider orientation="vertical" flexItem />
                                </Box>
                                <Box
                                    sx={{
                                        flex: '10',
                                        display: 'flex',
                                        alignItems: 'top',
                                        justifyContent: 'left',
                                        height: '100%' // Full height of the row
                                    }}
                                >
                                    <Box>
                                        <Typography variant="subtitle1" gutterBottom><strong>Improvements</strong></Typography>
                                        <Typography variant="body2" color="textSecondary">{clientData.improvements}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                        {/* Right Box */}
                        <Box
                            sx={{
                                flex: '1',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '24px'
                            }}
                        >

                            <Speedometer value={clientData.clientRating / 100} colors={{ needle: colors.grey[500] }} />
                        </Box>
                    </Box>

                ) : (
                    <div>No data available</div>
                )}

        </>

    )
}

export default DashBoard;
