import { useEffect, useState } from "react";
import useAvisos from "../hooks/useAvisos";
import { useNavigate, useParams } from "react-router-dom";
import IAvisos from "../interfaces/Avisos.interface";

const AvisoUser = () => {
    const { idCategoria } = useParams()
    const { findAvisos, loading, error } = useAvisos();
    const [avisos, setAvisos] = useState<IAvisos[]>([]);

    const fetchData = async () => {
        try {
            if (!idCategoria) {
                throw new Error("Categoria não encontrada");
            }

            const result = await findAvisos(idCategoria);
            if (result) {
                setAvisos(result);
            }
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="flex flex-col items-center min-h-screen bg-gray-100 p-8">
                <div className="w-full max-w-lg p-8 space-y-8 bg-white shadow-lg rounded-lg">
                    <h2 className="text-2xl font-bold text-center">Lista de Categorias</h2>
                    {loading && <p>Carregando...</p>}
                    {error && <p>{error}</p>}
                    <ul className="space-y-4">
                        {avisos && avisos.length === 0 && (<h4 className="text-center">Não existe nenhum aviso nesta categoria!</h4>)}
                        {avisos ? avisos.map(aviso => (
                            <li key={aviso.id} className="p-4 border border-gray-300 rounded-lg shadow hover:bg-gray-50 transition flex justify-between items-center">
                                <div className="mt-2 space-x-2">
                                    <h3 className="text-xl">{aviso.descricao}</h3>
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

export default AvisoUser;
