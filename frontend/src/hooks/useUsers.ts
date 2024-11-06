import { useState, useEffect } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_URL;
import { UserI } from "../interfaces/User.interface";

const useUsers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cancelled, setCancelled] = useState(false);

  const users = async (): Promise<UserI[] | null> => {
    if (cancelled) return null;

    setLoading(true);
    setError(null);

    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(`${apiUrl}/usuarios`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const dados = response.data as UserI[];

      return dados;
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

  return { users, loading, error };
};

export default useUsers;
