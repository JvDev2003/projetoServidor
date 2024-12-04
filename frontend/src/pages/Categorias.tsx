import { useEffect, useState } from "react";
import useCategorias from "../hooks/useCategorias";
import { ICategorias } from "../interfaces/Categoria.interface";
import { useNavigate } from "react-router-dom";

const Categorias = () => {
    const { findAllCategorias, deleteCategoria, loading, error } = useCategorias();
    const [categorias, setCategorias] = useState<ICategorias[]>([]);
    const navigate = useNavigate()

    const fetchData = async () => {
        try {
            const result = await findAllCategorias();
            if (result) {
                setCategorias(result);
            }
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEdit = (id: string) => {
        try {
            navigate(`/editarCategoria/${id}`)
        } catch (e: any) {
            console.error(e)
        }
    }

    const handleCreate = () => {
        try {
            navigate("/criarCategoria")
        } catch (e: any) {
            console.error(e)
        }
    }

    const handleDelete = async (id: string) => {
        try {
            await deleteCategoria(id)
            const catAtualizada = categorias.filter((categoria) => {
                return categoria.id === id ? false : true
            })
            setCategorias(catAtualizada)

        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            <div className="flex flex-col items-center min-h-screen bg-gray-100 p-8">
                <div className="w-full max-w-lg p-8 space-y-8 bg-white shadow-lg rounded-lg">
                    <h2 className="text-2xl font-bold text-center">Lista de Categorias</h2>
                    <button
                        onClick={handleCreate}
                        className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Criar Categoria
                    </button>
                    {loading && <p>Carregando...</p>}
                    {error && <p>{error}</p>}
                    <ul className="space-y-4">
                        {categorias && categorias.length === 0 && (<h4 className="text-center">Não existe nenhuma categoria categorias!</h4>)}
                        {categorias ? categorias.map(categoria => (
                            <li key={categoria.id} className="p-4 border border-gray-300 rounded-lg shadow hover:bg-gray-50 transition flex justify-between items-center">
                                <div className="mt-2 space-x-2">
                                    <h3 className="text-xl">{categoria.nome}</h3>
                                </div>
                                <div className="mt-2 flex space-x-2">
                                    <button
                                        onClick={() => handleEdit(categoria.id)}
                                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(categoria.id)}
                                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </li>
                        )) : (
                            <div>Carregando...</div>
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Categorias;
