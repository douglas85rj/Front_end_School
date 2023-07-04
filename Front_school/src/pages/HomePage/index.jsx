import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import { getCursos, criarCurso } from "../../services/api";
import { toast, ToastContainer } from "react-toastify";
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  thead {
    font-size: 16px;
    color: #333;
    text-align: left;
    tr {
      th {
        padding: 10px;
      }
    }
  }
  tbody {
    font-size: 14px;
    color: #555;
    tr {
      td {
        padding: 10px;
        border-bottom: 1px solid #ccc;
      }
    }
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const Input = styled.input`
  width: 300px;
  height: 40px;
  padding: 0 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  transition: all ease 0.4s;
  &:focus {
    border: 1px solid #333;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  }
`;
const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
`;
const Label = styled.label`
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
`;
const TextArea = styled.textarea`
  width: 300px;
  height: 100px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  transition: all ease 0.4s;
  &:focus {
    border: 1px solid #333;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  }
`;

const Button = styled.button`
  padding: 0 20px;
  height: 40px;
  border: 0;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: all ease 0.4s;
  &:hover {
    background-color: #555;
  }
`;

const HomePage = () => {
  useEffect(() => {
    (async () => {
      const response = await getCursos();
      setCursos(response.data);
      setLoading(false);
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await criarCurso(nome, descricao);
    if (response.status === 201) {
      toast.success("Curso cadastrado com sucesso!");
      const response = await getCursos();
      setCursos(response.data);
    } else {
      toast.error("Erro ao cadastrar curso!");
    }
  };

  

  const [nome, setNome] = useState(""); // [state, setState
  const [descricao, setDescricao] = useState(""); // [state, setState
  const [cursos, setCursos] = useState([]); // [state, setState
  const [loading, setLoading] = useState(true); // [state, setState
  const { logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return <div className="loading">Carregando dados...</div>;
  }

  return (
    <>
      <div>
        <h1>Graduação e Pós-graduação</h1>
        <Nav>
          <Button onClick={handleLogout}>Logout</Button>
        </Nav>
      </div>
      <div>
        <h2>Cadastrar curso</h2>
        <FormContainer>
          <Nav>
            {" "}
            <Label htmlFor="nome">Nome do Curso</Label>
            <Input type="text" id="nome" />{" "}
            <Label htmlFor="descricao">Descrição</Label>
            <TextArea type="text" id="descricao" />
            <button onClick={handleSubmit} type="submit">
              Cadastrar
            </button>
          </Nav>
        </FormContainer>
      </div>
      <div>
        <h2>Cursos disponíveis</h2>
        {cursos.map((curso) => (
          <Table key={curso.id}>
            <thead>
              <tr>
                <th>{curso.nome}</th>
                <th>{curso.descricao}</th>
              </tr>
            </thead>
            {/* <tbody>
              <tr>
                <td>{curso.nome}</td>
                <td>{curso.descricao}</td>
              </tr>
            </tbody>             */}
          </Table>
        ))}
      </div>
      <Footer>
        <h2>Contato</h2>
        <p>douglas85rj@gmail.com</p>
      </Footer>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
    </>
  );
};

export default HomePage;
