import { Routes } from "react-router-dom";

import Topbar from "./Framework/components/navigation/Topbar.tsx";
import DetailsForm from "./scenes/Form.tsx";
import PageItem from "./Framework/components/PageItem.tsx";
//import Home from "./scenes/Home.tsx";
import ClientDashboard from "./scenes/ClientDashboard.tsx";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import NotFound from "./Framework/pages/NotFound.tsx";



function App() {
    const [theme, colorMode] = useMode();

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    <main className="content">
                        <Topbar />
                        <Routes>
                            {/*Do your own*/}
                            {
                                PageItem((<ClientDashboard />), "/client/:csid")
                            }

                            {
                                PageItem((<DetailsForm />), "/")
                            }

                            {/*Required framework pages*/}
                            {
                                PageItem((<NotFound />), "*")
                            }
                        </Routes>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;