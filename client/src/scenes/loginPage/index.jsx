import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Connect Crowd
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Connect Crowd, social media for those whose want to
          connect.
        </Typography>
        <Typography fontWeight="200" variant="h5" sx={{ mb: "1.5rem" }}>
          Please note the back-end is deployed on render and will go in sleep mode after 15 minutes if there are no requests for the application. So please be patient the first time you send a request.
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
