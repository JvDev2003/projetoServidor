import { useEffect, useState } from "react";
import useUsers from "../hooks/useUsers";
import { UserI } from "../interfaces/User.interface";
import useDeleteUser from "../hooks/useDeleteUser";
import { useNavigate } from "react-router-dom";

const Usuarios = () => {
  const { users, loading, error } = useUsers();
  const [usuarios, setUsuarios] = useState<UserI[]>([]);
  const {deleteUser} = useDeleteUser()
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const result = await users();
      if (result) {
        setUsuarios(result);
      }
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (email: string) => {
    navigate(`/editUser/${email}`);
  }

  const handleDelete = async(email: string) => {
    try {
      await deleteUser(email)
      setUsuarios(usuarios.filter((usuario) => usuario.email !== email))

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="flex flex-col items-center min-h-screen bg-gray-100 p-8">
        <div className="w-full max-w-lg p-8 space-y-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-center">Lista de Dados</h2>
          {loading && <p>Carregando...</p>}
          {error && <p>{error}</p>}
          <ul className="space-y-4">
            {usuarios ? usuarios.map(user => (
              <li key={user._id} className="p-4 border border-gray-300 rounded-lg shadow hover:bg-gray-50 transition flex justify-between items-center">
                <div className="mt-2 space-x-2">
                  <h3 className="text-xl">{user.nome}</h3>
                  <p className="text-gray-600">{user.email}</p>
                </div>
                <div className="mt-2 flex space-x-2">
                  <button 
                    onClick={() => handleEdit(user.email)} 
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  > 
                    Editar 
                  </button>
                  <button 
                    onClick={() => handleDelete(user.email)} 
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  > 
                    Excluir 
                  </button>
                </div>
              </li>
            )):(
              <div>Carregando...</div>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Usuarios;
