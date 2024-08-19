import { createContext, useState, useEffect } from "react";
import axios from "axios";


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
                console.log(res.data)
                localStorage.setItem("token", res.data.token)
            }
        } catch (error) {
            setUser(null);
            localStorage.removeItem("token");
            console.error("Login error:", error);
        }
    };

    const signUp = async (data) => {
        try {
            const res = await axios.post(`${API_URL}/auth/signup`, data);           
            if (res.status === 200) {
                setUser(res.data.user);
                console.log(res.data)
                localStorage.setItem("token", res.data.token)
            }
        } catch (error) {
            setUser(null);
            localStorage.removeItem("token");
            console.error("Sign up error:", error);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
        console.log("User logged out successfully");
    };

    useEffect(() => {
        axios.get(`${API_URL}/auth/me`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
        .then((res) => {
            setUser(res.data.user)
        })
        .catch((err) => {
            console.error(err);
            setUser(null);
        })
        .finally(() => {setLoading(false)})
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, signUp, logout, loading }}>
            { children }
        </AuthContext.Provider>
    );
};

export default AuthProvider;