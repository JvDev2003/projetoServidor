import { useEffect, useState } from "react";
import useAvisos from "../hooks/useAvisos";
import { useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import IAvisos from "../interfaces/Avisos.interface";

const Avisos = () => {
    const { idCategoria } = useParams()
    const { findAvisos, deleteAviso, editAviso, loading, error } = useAvisos();
    const [avisos, setAvisos] = useState<IAvisos[]>([]);
    const [idCat, setIdCat] = useState('')
    const [descricao, setDescricao] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            if (!idCategoria) {
                throw new Error("A categoria está vazia")
            }
            const result = await findAvisos(idCategoria);
            if (result) {
                setAvisos(result);
            }
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
        }
    };

    const handleEdit = (id: string) => {
        setIdCat(id)
    }

    const handleCancelClick = () => {
        setIdCat('')
    }

    const handleSaveEdit = async (id: string) => {
        try {
            await editAviso(id, descricao)
            setIdCat('')
            setDescricao('')

            const editAvisos: IAvisos[] = avisos.map((aviso) => {
                if (aviso.id === idCat) {
                    return { id: idCat, descricao }
                }

                return aviso
            })

            setAvisos(editAvisos)
        } catch (e) {
            console.error(e)
            setDescricao('')
        }
    }

    const handleCreate = () => {
        try {
            navigate(`/avisos/create/${idCategoria}`)
        } catch (e: any) {
            console.error(e)
        }
    }

    const handleDelete = async (id: string) => {
        try {
            await deleteAviso(id)
            const avisosAtualizada = avisos.filter((aviso) => {
                return aviso.id === id ? false : true
            })
            setAvisos(avisosAtualizada)

        } catch (e) {
            console.error(e)
        }
    }


    return (
        <>
            <div className="flex flex-col items-center min-h-screen bg-gray-100 p-8">
                <div className="w-full max-w-lg p-8 space-y-8 bg-white shadow-lg rounded-lg">
                    <h2 className="text-2xl font-bold text-center">Lista de Avisos</h2>
                    <button
                        onClick={handleCreate}
                        className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Criar Aviso
                    </button>
                    {loading && <p>Carregando...</p>}
                    {error && <ErrorMessage message={error} />}
                    <ul className="space-y-4">
                        {avisos && avisos.length === 0 && (<h4 className="text-center">Não existe nenhum aviso nesta categoria!</h4>)}
                        {avisos ? avisos.map(aviso => (
                            <li key={aviso.id} className="p-4 border border-gray-300 rounded-lg shadow hover:bg-gray-50 transition flex justify-between items-center">
                                {idCat === aviso.id ?
                                    (
                                        <>
                                            <div className="mt-2 space-x-2">
                                                <input
                                                    type="text"
                                                    value={descricao}
                                                    onChange={(e) => setDescricao(e.target.value)}
                                                    className="border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                                                    autoFocus
                                                />
                                            </div>
                                            <div className="mt-2 flex space-x-2">
                                                <button
                                                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                                    onClick={() => handleSaveEdit(aviso.id)}>
                                                    Salvar
                                                </button>
                                                <button
                                                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                    onClick={handleCancelClick}
                                                >
                                                    Cancelar
                                                </button>
                                            </div>
                                        </>
                                    )
                                    : (
                                        <>
                                            <div className="mt-2 space-x-2">
                                                <h3>{aviso.descricao}</h3>
                                            </div>
                                            <div className="mt-2 flex space-x-2">
                                                <button
                                                    onClick={() => handleEdit(aviso.id)}
                                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(aviso.id)}
                                                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                >
                                                    Excluir
                                                </button>
                                            </div>
                                        </>
                                    )
                                }

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

export default Avisos;
