import { tokens } from "../../theme.ts";
import {Box, useTheme} from "@mui/material";

function NotFound() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box color={colors.redAccent[500]} textAlign="center" alignItems="center" justifyContent="center" >
            <h1>404</h1>
            <h2>Page Not Found</h2>
        </Box>
    );
}

export default NotFound;