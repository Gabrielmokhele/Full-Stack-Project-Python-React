import { useContext } from "react";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "pages/HomePage";
import LoginPage from "pages/LoginPage";
// import ProfilePage
import { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

import Navbar from "pages/Navbar";
// import CreatePostPage from "pages/CreatePostPage";
import ProtectedRoute from "components/protectedRoute";

const App = () => {
  const { mode, token } = useContext(AuthContext);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(token);

  return (
    <div className="app">
      <AuthProvider>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={isAuth ? <Navigate to="/profile" /> : <LoginPage />} />
              <Route path="/register" element={isAuth ? <Navigate to="/profile" /> : <LoginPage />} />

              <Route
                path="/create-post"
                element={
                  <ProtectedRoute>
                    {/* <CreatePostPage /> */}
                  </ProtectedRoute>
                }
              />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </AuthProvider>
    </div >
  );
};

export default App;