import React from "react";
import {Route} from "react-router-dom";
import {Box} from "@mui/material";

function PaddingBox({children}: {children: React.ReactNode}) {
    return (
        <Box
            display="grid"
            gridTemplateColumns="1fr"
            sx={{
                padding: { xs: '20px', sm: '50px' }, // Add padding based on screen size
                "& > div": { gridColumn: "span 4" },
            }}
        >
            {children}
        </Box>
    )
}


export default function PageItem(
    children: React.ReactNode,
    path : string) {
    return (
        <Route
            path={path}
    element={
        
            <PaddingBox>{children}</PaddingBox>
    }
    />
);
}