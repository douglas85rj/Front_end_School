import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";
import { getCursos } from "../../services/api";

const HomePage = () => {
  useEffect(() => {
    (async () => {
      const response = await getCursos();
      console.log("getCursos", response.data);
    })();
  }, []);

  const { logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h1>Cursos</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HomePage;
