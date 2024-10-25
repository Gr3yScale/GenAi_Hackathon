import {Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens} from "../../../theme.ts";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
//import LogoText from "../../../assets/LogoText.svg"
//import Logo from "../../../assets/Logo.svg"
import Tooltip from "@mui/material/Tooltip";


const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);


  return (
      <Box display="flex" justifyContent="space-between" p={4} sx={{
        backgroundColor: colors.primary[600]
      }}>
        {/* SEARCH BAR*/}

        <Box display="flex" sx={{
          backgroundColor: colors.primary[400],
          borderRadius: "3px"
        }} >
          <img src={"src/assets/Logo.svg"}/>
    <Box display="flex" sx={{
      backgroundColor: colors.primary[600],
      marginLeft:2,
      marginTop:0.75,
      marginBottom:0.75
    }}>
      <img src={"src/assets/LogoText.svg"}/>
    </Box>
        </Box>

        {/* ICONS */}
        <Box display="flex" alignSelf="right">
          <Tooltip title={theme.palette.mode === "dark" ? "Dark Mode" : "Light Mode"}>
            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === "dark" ? (
                  <DarkModeOutlinedIcon />
              ) : (
                  <LightModeOutlinedIcon />
              )}
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications">
            <IconButton>
              <NotificationsOutlinedIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Settings">
            <IconButton>
              <SettingsOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
  );
};

export default Topbar;
