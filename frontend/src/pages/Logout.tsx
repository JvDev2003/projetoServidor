import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const Logout = () => {
    const { logout, error, loading } = useLogin()
    const navigate = useNavigate();
    useEffect(() => {
        const out = async () => {
            await logout()
            navigate("/")
        }

        out()
    }, []);

    return (
        <div>
            {error && <p>{error}</p>}
            {loading && <p>carregando</p>}
            <p>Você está sendo desconectado...</p>
        </div>
    )
}

export default Logout