import { useContext, useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import { AuthContext } from "context/AuthContext";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const navigate = useNavigate();
  const { user, setUser, mode, setMode } = useContext(AuthContext);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const handleModeToggle = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("mode");
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  // Handle select change
  const handleSelectChange = (event) => {
    const value = event.target.value;
    if (value === "logout") {
      handleLogout();
    } else if (value === "login") {
      handleLogin();
    } else if (value === "register") {
      handleRegister();
    }
  };

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          BlogVerse
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={handleModeToggle}>
            {mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          <FormControl variant="standard">
            <Select
              value={user ? "logout" : "login"}
              onChange={handleSelectChange}
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
              renderValue={() => user?.email || "Email"}
            >
              {user ? (
                  <MenuItem value="logout" onClick={handleLogout}>Log Out</MenuItem>
                ) : (
                  <>
                    <MenuItem value="login" onClick={handleLogin}>Log In</MenuItem>
                    <MenuItem value="register" onClick={handleRegister}>Register</MenuItem>
                  </>
                )}
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton onClick={handleModeToggle} sx={{ fontSize: "25px" }}>
              {mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard">
              <Select
                value={user ? "logout" : "login"}
                onChange={handleSelectChange}
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
                renderValue={() => user?.email || "Email"}
              >
                {user ? (
                  <MenuItem value="logout" onClick={handleLogout}>Log Out</MenuItem>
                ) : (
                  <>
                    <MenuItem value="login" onClick={handleLogin}>Log In</MenuItem>
                    <MenuItem value="register" onClick={handleRegister}>Register</MenuItem>
                  </>
                )}
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;