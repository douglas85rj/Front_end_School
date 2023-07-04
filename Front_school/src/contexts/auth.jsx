import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, createSession } from "../services/api";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [aluno, setAluno] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storagedUser = localStorage.getItem("aluno");
    const token = localStorage.getItem("token");

    if (storagedUser && token) {
      setAluno(JSON.parse(storagedUser));
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {    

    const response = await createSession(email, password);   

    const loggedUSer = response.data;
    const token = response.data.token;

    console.log("login", loggedUSer);
    console.log("login", token);

    localStorage.setItem("aluno", JSON.stringify(loggedUSer));
    localStorage.setItem("token", token);

    api.defaults.headers.Authorization = `Bearer ${token}`;

    setAluno(loggedUSer);
    navigate("/");
  };

  const logout = () => {
    setAluno(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = null;
    alert("You have been logged out");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ authenticated: !!aluno, aluno, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
