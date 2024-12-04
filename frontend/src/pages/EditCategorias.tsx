import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import useCategorias from '../hooks/useCategorias';
import { ICategorias } from '../interfaces/Categoria.interface';

const EditCategorias = () => {
    const { id } = useParams()
    const [nome, setNome] = useState('')
    const { editCategoria, findCategoria, loading, error } = useCategorias();
    const navigate = useNavigate();


    useEffect(() => {
        const fetchCategoria = async () => {
            if (!id) { return }
            const categoria: ICategorias = await findCategoria(id)
            setNome(categoria.nome)
        }

        fetchCategoria()
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!id) {
                throw new Error("O id da categoria esta vazio");
            }
            await editCategoria(id, nome)
            navigate("/categorias")
        } catch (e) {
            console.error(e)
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-12">
            <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center">Editar Categoria</h2>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm">
                        <div>
                            <label htmlFor="name" className="sr-only">Nome</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                className="relative block w-full px-3 py-2 border border-gray-300 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {loading ? "Carregando..." : "Editar"}
                        </button>
                    </div>
                    {error && <ErrorMessage message={error} />}
                </form>
            </div>
        </div>
    );
};

export default EditCategorias;
