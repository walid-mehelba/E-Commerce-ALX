import { createContext, useContext } from "react";

interface AuthContextType {
  email: string | null;
  token: string | null;
  isAuthenticated: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  myOrders: any[];
  login: (email: string, token: string) => void;
  logout: () => void;
  getMyOrders: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  email: null,
  token: null,
  isAuthenticated: false,
  myOrders: [],
  login: () => {},
  logout: () => {},
  getMyOrders: () => {},
});

export const useAuth = () => useContext(AuthContext);
