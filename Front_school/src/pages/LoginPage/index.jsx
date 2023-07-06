import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  

    .login-header {
      background-color: #333;
      padding: 20px;
      font-size: 1.4em;
      font-weight: normal;
      color: #fff;
      text-align: center;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }

    .login-container {
      padding: 12px;
    }
  }

  @media (max-width: 600px) {
    .login {
      width: 300px;
    }
  }

  @media (max-width: 400px) {
    .login {
      width: 100%;
    }
  }

  
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;

  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);

 

  input {
    height: 40px;
    padding: 0 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    transition: all ease 0.4s;
    &:focus {
      border: 1px solid #333;
    }
  }
  



  button {

    height: 40px;
    border: 0;
    border-radius: 5px;
    background-color: #333;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    transition: all ease 0.4s;
    &:hover {
      background-color: #fff;
      color: #333;
      border: 1px solid #333;
      
      
  }
`;

const LoginPage = () => {
  const { authenticated, login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      toast.error("Preencha todos os campos!");
      return;
    }

    

  login(email, password);


   
      
  };
  return (
    
    <Container>
            <ToastContainer autoClose={3000} position={toast.POSITION.TOP_RIGHT} />;
      <div className="login">
        <div className="login-triangle"></div>
        <h2 className="login-header">Login School</h2>
       
        <Form className="login-container" onSubmit={handleSubmit}>
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
            <input id="cad" type="submit" value="Login" />
          </p>
        </Form>
      </div>
    </Container>
  );
};

export default LoginPage;
