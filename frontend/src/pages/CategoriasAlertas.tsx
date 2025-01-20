import { useEffect, useState } from "react";
import useCategorias from "../hooks/useCategorias";
import { ICategorias } from "../interfaces/Categoria.interface";
import { useNavigate } from "react-router-dom";

const CategoriasAlertas = () => {
    const { findAllCategorias, loading, error } = useCategorias();
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

    const handleClick = (id: string) => {
        navigate(`/avisos/${id}`)
    }


    return (
        <>
            <div className="flex flex-col items-center min-h-screen bg-gray-100 p-8">
                <div className="w-full max-w-lg p-8 space-y-8 bg-white shadow-lg rounded-lg">
                    <h2 className="text-2xl font-bold text-center">Lista de Categorias</h2>
                    {loading && <p>Carregando...</p>}
                    {error && <p>{error}</p>}
                    <ul className="space-y-4">
                        {categorias && categorias.length === 0 && (<h4 className="text-center">Não existe nenhuma categoria categorias!</h4>)}
                        {categorias ? categorias.map(categoria => (
                            <li
                                key={categoria.id}
                                className="p-4 border border-gray-300 rounded-lg shadow hover:bg-gray-50 transition flex justify-between items-center"
                                onClick={() => handleClick(categoria.id)}
                            >
                                <div className="mt-2 space-x-2">
                                    <h3 className="text-xl">{categoria.nome}</h3>
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

export default CategoriasAlertas;
