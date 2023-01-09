import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:3001/assets/info1.jpg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Pixel View</Typography>
        <Typography color={medium}>pixelview.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Polaroids are back baby. Shop for newest cameras, high quality analog instant film cameras, and even vintage cameras at one of our stores, today!
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
