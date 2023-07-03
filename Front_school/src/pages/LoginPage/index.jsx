import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/auth";

const LoginPage = () => {
  const { authenticated, login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit", { email, password });
    login(email, password);
  };
  return (
    <div className="container">
      <div className="login">
        <div className="login-triangle"></div>
        <h2 className="login-header">Login School</h2>
        <p> {String(authenticated)}</p>
        <form className="login-container" onSubmit={handleSubmit}>
          <p>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </p>
          <p>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </p>
          <p>
            <input type="submit" value="Login" />
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
