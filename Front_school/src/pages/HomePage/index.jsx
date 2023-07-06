import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import { getCursos, criarCurso } from "../../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  gap: 10px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);

  a {
    text-decoration: none;
    color: #333;
    font-size: 16px;
    transition: all ease 0.4s;
    &:hover {
      color: #555;
    }
  }

  button {
    padding: 0 20px;
    align-self: flex-end;
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
  }

  .active {
    color: #555;
  }

  .logout {
    margin-top: 20px;
    background-color: #f00;
    &:hover {
      background-color: #f55;
    }
  }
`;

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TextArea = styled.textarea`
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

const FormCadastro = styled.form`

  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  label {
    font-size: 16px;
    color: #333;
    margin-bottom: 5px;
  }


  input {
    display: block;
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

    textarea {
      display: block;
      width: 600px;
      height: 200px;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 16px;
      transition: all ease 0.4s;
      &:focus {
        border: 1px solid #333;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);

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

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  const [cursos, setCursos] = useState([]); // [state, setState
  const [loading, setLoading] = useState(true); // [state, setState
  const { logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nome = e.target.nome.value;
    const descricao = e.target.descricao.value;
    const response = await criarCurso(nome, descricao);

    if (response.status === 200) {
      toast.success("Curso cadastrado com sucesso!");
      const response = await getCursos();
      setCursos(response.data);
      
    } else {
      toast.error("Erro ao cadastrar curso!");
    }
    e.target.reset();
    getCursos();
   
  };

  if (loading) {
    return <div className="loading">Carregando dados...</div>;
  }

  return (
    <>
      <ToastContainer autoClose={3000} position={toast.POSITION.TOP_RIGHT} />
      <div>
        <h1>Graduação e Pós-graduação</h1>
        <Nav>
          <Button onClick={handleLogout}>Logout</Button>
        </Nav>
      </div>
      <div>
        <h2>Cadastrar curso</h2>
        <FormCadastro onSubmit={handleSubmit}>
          <label htmlFor="nome">Nome</label>
          <input
            onChange={(e) => setNome(e.target.value)}
            type="text"
            name="nome"
            id="nome"
          />
          <label htmlFor="descricao">Descrição</label>
          <TextArea
            onChange={(e) => setDescricao(e.target.value)}
            name="descricao"
            id="descricao"
          ></TextArea>
          <button type="submit">Cadastrar</button>
        </FormCadastro>
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
    </>
  );
};

export default HomePage;
