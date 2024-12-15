import { useState, useEffect } from "react";
import { jwtPayloadI } from "../interfaces/JwtPayload.interface";
import axios from "axios";
const apiUrl = import.meta.env.VITE_URL;
import { useAuth } from "./useAuth";
import { jwtDecode } from "jwt-decode";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cancelled, setCancelled] = useState(false);
  const { setIsAuthenticated, setAdmin, setEmail } = useAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  const login = async (email: string, senha: string) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${apiUrl}/login`, { email, senha });
      const { token } = response.data;
      sessionStorage.setItem("token", token);
      const { admin } = jwtDecode(token) as jwtPayloadI;

      setIsAuthenticated(true);
      setAdmin(admin);
      setEmail(email);

      return response;
    } catch (error: any) {
      setError(error.response?.data?.msg || error.message);
      console.log(`Error: ${error.response?.data?.msg || error.message}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);

    try {
      sessionStorage.removeItem("token");
      setAdmin(false);
      setIsAuthenticated(false);
      const response = await axios.post(`${apiUrl}/logout`);

      return response;
    } catch (error: any) {
      setError(error.response?.data?.msg || error.message);
      console.log(`Error: ${error.response?.data?.msg || error.message}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { login, logout, loading, error };
};

export default useLogin;
