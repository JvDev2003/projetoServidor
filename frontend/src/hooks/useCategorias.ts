import { useState, useEffect } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_URL;

const useCategorias = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cancelled, setCancelled] = useState(false);

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  const findCategoria = async (id: string) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);

    try {
      const token = sessionStorage.getItem("token");

      const response = await axios.get(`${apiUrl}/categorias/${id}`, {
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

  const createCategoria = async (nome: string) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);

    try {
      const token = sessionStorage.getItem("token");

      const response = await axios.post(
        `${apiUrl}/categorias/`,
        { nome },
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

  const editCategoria = async (id: string, nome: string) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);

    try {
      const token = sessionStorage.getItem("token");

      const response = await axios.put(
        `${apiUrl}/categorias/${id}`,
        { nome },
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

  const deleteCategoria = async (id: string) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);

    try {
      const token = sessionStorage.getItem("token");

      const response = await axios.delete(`${apiUrl}/categorias/${id}`, {
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

  const findAllCategorias = async () => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);

    try {
      const token = sessionStorage.getItem("token");

      const response = await axios.get(`${apiUrl}/categorias/`, {
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
    findCategoria,
    createCategoria,
    editCategoria,
    deleteCategoria,
    findAllCategorias,
    loading,
    error,
  };
};

export default useCategorias;
