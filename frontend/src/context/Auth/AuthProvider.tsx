import { useState, type FC, type PropsWithChildren } from "react";
import { AuthContext } from "./AuthContext";

const USERNAME_KEY = "email";
const TOKEN_KEY = "token";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [email, setUsername] = useState<string | null>(
    localStorage.getItem(USERNAME_KEY)
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem(TOKEN_KEY)
  );

  console.log("Token in AuthProvider:", token);

  const [myOrders, setMyOrders] = useState([]);

  const isAuthenticated = !!token;

  const login = (email: string, token: string) => {
    setUsername(email);
    setToken(token);
    localStorage.setItem(USERNAME_KEY, email);
    localStorage.setItem(TOKEN_KEY, token);
  };


  const logout = () => {
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(TOKEN_KEY);
    setUsername(null);
    setToken(null);
  };


  const getMyOrders = async () => {
    const response = await fetch("http://localhost:3001/user/my-orders", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    if (!response.ok) return;

    const data = await response.json();
    setMyOrders(data);
  }

  return (
    <AuthContext.Provider
      value={{ email, token, myOrders, login, logout, isAuthenticated, getMyOrders }}
    >

      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
