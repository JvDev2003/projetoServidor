import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import { UserI } from '../interfaces/User.interface';
import useUser from '../hooks/useUser';

const Perfil = () => {
  const { email } = useParams<{ email: string }>();
  const [name, setName] = useState('');
  const { findUser, loading, error } = useUser();
  const [usuario, setUsuario] = useState<UserI | null>(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const result = await findUser(email!);
      if (result) {
        setUsuario(result);
      }
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [email]);

  useEffect(() => {
    if (usuario) {
      setName(usuario.nome);
    }
  }, [usuario]);

  const handleEdit = () => {
    navigate(`/editUser/${email}`)
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-12">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center">Perfil de usuário</h2>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <h3 className="text-3xl font-semibold mt-4 text-center">Nome: {name}</h3>
              <p className="text-gray-600 text-center mt-2">Email: {email}</p>
              <button 
              onClick={handleEdit} 
              className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" >
                Editar Perfil
              </button>
            </div>
          </>
        )}
        {error && <ErrorMessage message={error} />}
      </div>
    </div>
  );
};

export default Perfil;
