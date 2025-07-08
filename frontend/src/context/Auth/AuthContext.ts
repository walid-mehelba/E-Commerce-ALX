import { createContext, useContext } from "react";

interface AuthContextType {
  username: string | null;
  token: string | null;
  isAuthenticated: boolean;
  myOrders: any[];
  login: (username: string, token: string) => void;
  logout: () => void;
  getMyOrders: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  username: null,
  token: null,
  isAuthenticated: false,
  myOrders: [],
  login: () => {},
  logout: () => {},
  getMyOrders: () => {},
});

export const useAuth = () => useContext(AuthContext);
