import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import { getCursos } from "../../services/api";

const HomePage = () => {
  useEffect(() => {
    (async () => {
      const response = await getCursos();
      setCursos(response.data);
      setLoading(false);

    })();
  }, []);

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
    <><div>
      <h1>Graduação e Pós-graduação</h1>
      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >

        <button onClick={handleLogout}>Logout</button>

      </nav>


    </div><div>
        <h2>Cursos disponíveis</h2>
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {cursos.map((curso) => (
            <div key={curso.id}>
              <h2>{curso.nome}</h2>
              <p>{curso.descricao}</p> 
                       

            </div>

          ))}
        </nav>
      </div></>


  );
  
};



export default HomePage;
