import {Typography, useTheme} from "@mui/material";
import {tokens} from "../../theme.ts";


function Home()  {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Typography
            variant="h6"
            color={colors.grey[300]}
            sx={{ m: "15px 0 5px 20px" }}
        >
            Home not created
        </Typography>
    )
}

export default Home;
