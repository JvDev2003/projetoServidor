export interface AuthContextI {
  admin: boolean;
  setAdmin: (admin: boolean) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  email: string;
  setEmail: (email: string) => void;
}
