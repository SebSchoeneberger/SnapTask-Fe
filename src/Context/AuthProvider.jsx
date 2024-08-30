import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { getToken, storeToken } from "../Utils/TokenUtils";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [storedPath, setStoredPath] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  const login = async (data) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, data);
      if (res.status === 200) {
        setUser(res.data.user);
        storeToken(res.data.token);

        return res.data.user;
      }
    } catch (error) {
      setUser(null);
      storeToken(null);
      toast.error("Login failed. Please try again.");
      console.error("Login error:", error);
      throw error;
    }
  };

  const signUp = async (data) => {
    try {
      const res = await axios.post(`${API_URL}/auth/signup`, data);
      if (res.status === 200) {
        setUser(res.data.user);
        storeToken(res.data.token);
      }
    } catch (error) {
      setUser(null);
      storeToken(null);
      toast.error("Sign up failed. Please try again.");
      console.error("Sign up error:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    storeToken(null);
    // console.log("User logged out successfully");
    setStoredPath(null);
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      axios
        .get(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((err) => {
          console.error(err);
          setUser(null);
          storeToken(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return <AuthContext.Provider value={{ user, login, signUp, logout, loading, setUser, storedPath, setStoredPath }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
