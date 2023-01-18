import { useState } from "react";
import {
  Box,
  IconButton,
  // InputBase,
  Typography,
  // Select,
  // MenuItem,
  // FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  // Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
  Logout,
} from "@mui/icons-material";
import { useDispatch /*useSelector*/ } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const user = useSelector((state) => state.user);
  // useMediaQuery() is a built-in MUI hook - determines screen width, use media query in react rather than in css
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  // useTheme() allows the use of theme settings from theme.js
  const theme = useTheme();
  // const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  // convenience variable
  // const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      backgroundColor={alt}
      height="100%"
      width="5%"
      position="fixed"
      left="0"
    >
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          padding="1rem 0"
          onClick={() => navigate("/home")}
          sx={{ "&:hover": { color: primaryLight, cursor: "pointer" } }}
        >
          CC
        </Typography>
        {/*  Search bar
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap={"3rem"}
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
        */}
      </FlexBetween>

      {/* desktop nav */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem" flexDirection="column">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          <Logout
            sx={{ fontSize: "25px" }}
            onClick={() => dispatch(setLogout())}
          />
          {/* drop down menu for more profile options
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl> 
          */}
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* mobile nav */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* close icon */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* menu items */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <Logout
              sx={{ fontSize: "25px" }}
              onClick={() => dispatch(setLogout())}
            />
            {/* drop down menu for more profile options
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
             */}
          </FlexBetween>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
