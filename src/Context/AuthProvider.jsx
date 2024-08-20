import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { getToken, storeToken } from "../Utils/TokenUtils";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

    const login = async (data) => {
        try {
            const res = await axios.post(`${API_URL}/auth/login`, data);
            if (res.status === 200) {
                setUser(res.data.user);
                storeToken(res.data.token);
            }
        } catch (error) {
            setUser(null);
            storeToken(null);
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
            console.error("Sign up error:", error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        storeToken(null);
        console.log("User logged out successfully");
    };


    useEffect(() => {
        const token = getToken();
        if (token) {
            axios.get(`${API_URL}/auth/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
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

  return (
    <AuthContext.Provider value={{ user, login, signUp, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
