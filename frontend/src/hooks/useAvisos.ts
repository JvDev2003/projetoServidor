import { useState, useEffect } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_URL;

const useAvisos = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cancelled, setCancelled] = useState(false);

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  const findAvisos = async (idCategoria: string) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);

    try {
      const token = sessionStorage.getItem("token");

      const response = await axios.get(`${apiUrl}/avisos/${idCategoria}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      setError(error.response?.data?.msg || error.message);
      console.log(`Error: ${error.response?.data?.msg || error.message}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createAviso = async (idCategoria: string, descricao: string) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);

    try {
      const token = sessionStorage.getItem("token");

      const response = await axios.post(
        `${apiUrl}/avisos/`,
        { idCategoria, descricao },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      setError(error.response?.data?.msg || error.message);
      console.log(`Error: ${error.response?.data?.msg || error.message}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const editAviso = async (id: string, descricao: string) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);

    try {
      const token = sessionStorage.getItem("token");

      const response = await axios.put(
        `${apiUrl}/avisos/${id}`,
        { descricao },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      setError(error.response?.data?.msg || error.message);
      console.log(`Error: ${error.response?.data?.msg || error.message}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteAviso = async (id: string) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);

    try {
      const token = sessionStorage.getItem("token");

      const response = await axios.delete(`${apiUrl}/avisos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
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

  return {
    findAvisos,
    createAviso,
    editAviso,
    deleteAviso,
    loading,
    error,
  };
};

export default useAvisos;
