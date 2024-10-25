import { Typography, Box, useTheme, useMediaQuery } from "@mui/material";
import { tokens } from "../../theme.ts";

type Props = {
    title: string;
    subtitle: string | null;
};

const Header = ({ title, subtitle }: Props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // Use useMediaQuery to determine if the screen is narrow (e.g., mobile)
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Adjust breakpoint as needed

    return (
        <Box
            mb="30px"
            display="flex"
            flexDirection="column"
            alignItems={isMobile ? "center" : "flex-start"} // Center if mobile, left-align if wider
            textAlign={isMobile ? "center" : "left"} // Center text if mobile, left if wider
        >
            <Typography
                variant="h2"
                color={colors.grey[100]}
                fontWeight="bold"
                sx={{ m: "0 0 5px 0" }}
            >
                {title}
            </Typography>
            <Typography variant="h5" color={colors.greenAccent[400]}>
                {subtitle}
            </Typography>
        </Box>
    );
};

export default Header;
