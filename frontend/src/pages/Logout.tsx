import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Logout = () => {
    const {setAdmin, setIsAuthenticated} = useAuth()
    const navigate = useNavigate();
    useEffect(() => {
        sessionStorage.removeItem('token');
        setAdmin(false)
        setIsAuthenticated(false)
        navigate('/')
        return () => {
            
        };
    },[]);

    return (
        <div>
            <p>Você está sendo desconectado...</p>
        </div>
    )
}

export default Logout