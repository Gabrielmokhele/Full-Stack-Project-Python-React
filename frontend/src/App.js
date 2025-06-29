import { useContext, useMemo } from "react";
import { AuthContext } from "./context/AuthContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "pages/HomePage";
import LoginPage from "pages/LoginPage";
import ProfilePage from "pages/ProfilePage";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Navbar from "pages/Navbar";
import ProtectedRoute from "components/protectedRoute";

const App = () => {
  const { mode, token, user } = useContext(AuthContext);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(token);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              isAuth && user?.id ? (
                <Navigate to={`/Profile/${user.id}`} />
              ) : (
                <LoginPage />
              )
            }
          />
          <Route path="/register" element={<LoginPage />} />
          <Route
            path="/Profile/:userId"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
