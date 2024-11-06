import { useState, useEffect } from "react";
import { jwtPayloadI } from "../interfaces/JwtPayload.interface";
import { useAuth } from "./useAuth";
import { jwtDecode } from "jwt-decode";

const useSession = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cancelled, setCancelled] = useState(false);
  const { setIsAuthenticated, setAdmin, setEmail } = useAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  const verifySession = async () => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);

    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        return;
      }
      const { admin, email } = jwtDecode(token) as jwtPayloadI;

      setIsAuthenticated(true);
      setAdmin(admin);
      setEmail(email);
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

  return { verifySession, loading, error };
};

export default useSession;
