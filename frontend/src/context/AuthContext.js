import React, { createContext, useState, useMemo, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState("light");
  const [token, setToken] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    const savedMode = localStorage.getItem("mode");

    if (savedToken) setToken(savedToken);

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser)); 
      } catch {
        setUser(savedUser);
      }
    }

    if (savedMode) setMode(savedMode);
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (mode) {
      localStorage.setItem("mode", mode);
    }
  }, [mode]);

  useEffect(() => {
    if (posts) {
      localStorage.setItem("mode", posts);
    }
  }, [posts]);

  const value = useMemo(
    () => ({
      user,
      setUser,
      posts,
      setPosts,
      mode,
      setMode,
      token,
      setToken,
    }),
    [user, mode, token, posts]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};