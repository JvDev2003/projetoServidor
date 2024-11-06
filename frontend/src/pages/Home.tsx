import Menu from "../components/Menu";
import { useNavigate } from "react-router-dom";
const Home = () => {
    const navigate = useNavigate()

    const handleCadastro = () => {
        navigate("/cadastrar")
    }

    const handleLogin = () => {
        navigate("/login")
    }

    return (
        <>
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-8">
        <div className="w-full max-w-2xl p-8 space-y-8 bg-white shadow-lg rounded-lg">
            <h1 className="text-4xl font-bold text-center text-indigo-600">Bem-vindo ao Sistema</h1>
            <p className="text-lg text-center text-gray-700">
            Aqui você pode gerenciar suas tarefas, visualizar relatórios e muito mais. Utilize o menu de navegação para acessar as diferentes funcionalidades do sistema.
            </p>
            <div className="flex justify-center space-x-4">
            <button 
            onClick={handleLogin}   
            className="px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Entrar
            </button>
            <button
            onClick={handleCadastro} 
            className="px-4 py-2 font-medium text-indigo-600 bg-white border border-indigo-600 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Registrar
            </button>
            </div>
        </div>
        </div>
        </>
    );
};

export default Home;
