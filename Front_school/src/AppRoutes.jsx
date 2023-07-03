import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./contexts/auth";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { AuthProvider } from "./contexts/auth";

const AppRoutes = () => {
  const Private = (children) => {
    const { authenticated, loading } = useContext(AuthContext);
    if (loading) {
      return <div>Carregando...</div>;
    }
    if (!authenticated) {
      return <Navigate to="/login" />;
    } else {
      return children.children;
    }
  };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <Private>
                <HomePage />
              </Private>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
