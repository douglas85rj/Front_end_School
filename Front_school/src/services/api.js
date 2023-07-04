
import axios from "axios";

export const  api = axios.create({
    baseURL: "https://schoolapi-sbv0.onrender.com" 
});

export const createSession = async (email, password) => {
  return api.post("/login", {
        email,
        password,    
    });
};


export const getCursos = async (nome, descricao) => {
    return api.get("/cursos",{
        nome,
        descricao,
        
    });
  
};

export const criarCurso = async (nome, descricao) => {
    return api.post("/curso", {
        nome,
        descricao,
        
    });
}




