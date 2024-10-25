import { styled, Tooltip, tooltipClasses, useTheme, TooltipProps } from "@mui/material";
import { tokens } from "../../theme";

// Define props type using TooltipProps from MUI
type MyTooltipProps = TooltipProps

export default function MyTooltip({ ...props }: MyTooltipProps) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // Styled Tooltip component
    const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: colors.primary[400],
            color: colors.grey[100],
            boxShadow: theme.shadows[1],
            fontSize: 11,
        },
    }));

    return <StyledTooltip {...props} />;
}
