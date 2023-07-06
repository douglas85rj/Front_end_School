
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

export const cancelInscricao = async (id) => {
    return api.delete(`/cancelar-inscricao/${id}`);
}

export const inscreverAluno = async (id) => {
    return api.post(`/inscricao${id}`);
}


export const atualizarCurso = async (id, nome, descricao) => {
    return api.put(`/curso/${id}`, {
        nome,
        descricao,
    });
}

export const getAlunos = async (nome, email, curso) => {
    return api.get("/alunos", {
        nome,
        email,
        curso,
    });
}






