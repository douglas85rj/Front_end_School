
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


export const getCursos = async () => {
    return api.get("/cursos");
  
};




