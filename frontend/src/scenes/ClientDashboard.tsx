import { Box, Slider, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme.ts";
import Speedometer from "../components/Speedometer.tsx";
import { useState } from "react";


function Home() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [value, setValue] = useState(0);
    return (
        <>
            <Speedometer value={value} colors={{ needle: colors.grey[500] }} />

            <Slider max={1} min={0} step={0.001} defaultValue={0} aria-label="Volume" value={value} onChange={(e, n) => { setValue(Math.max(0, Math.min(1, n as number))) }} />
        </>

    )
}

export default Home;
