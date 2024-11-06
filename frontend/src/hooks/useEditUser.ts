import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_URL;

const useEditUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cancelled, setCancelled] = useState(false);

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  const editUser = async (email: string, senha: string, nome: string) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);

    try {
      const token = sessionStorage.getItem("token");

      const response = await axios.put(
        `${apiUrl}/usuarios/${email}`,
        { nome, senha },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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

  return { editUser, loading, error };
};

export default useEditUser;
