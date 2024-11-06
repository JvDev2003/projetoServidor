import { createContext, useState, ReactNode } from 'react';
import { AuthContextI } from '../interfaces/AuthContextI';

// Criando o contexto com o tipo definido
export const AuthContext = createContext<AuthContextI | null>(null);

// Tipo para o componente Provider
interface AuthContextProviderProps {
  children: ReactNode;  // O provider vai envolver componentes React
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [admin, setAdmin] = useState<boolean>(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('')

  return (
    <AuthContext.Provider value={{ admin, setAdmin, isAuthenticated, setIsAuthenticated, email, setEmail}}>
      {children}
    </AuthContext.Provider>
  );
};
