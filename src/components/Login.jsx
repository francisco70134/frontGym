import React, { useContext, useState } from "react";
import axios from "axios";
import "../css/Login.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login({ onSwitch }) {
  const { login } = useContext(AuthContext); 
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
   const handleGoToRegister = ()=>{
    navigate("/register"); // Redirigir a la página de registro
   }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = `${import.meta.env.VITE_API_URL}auth/login`;

    try {
      const response = await axios.post(apiUrl, loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      login(response.data.token, response.data.user);
      navigate("/"); // Redirigir a la página principal

    } catch (error) {
      if (error.response) {
        console.error("Error al iniciar sesión:", error.response);
        alert(`Error al iniciar sesión: ${error.response.status} - ${error.response.statusText}`);
      } else if (error.request) {
        console.error("Error en la solicitud:", error.request);
        alert("Error de red, por favor intente más tarde.");
      } else {
        console.error("Error:", error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2 className="login-title">Iniciar Sesión</h2>
        <div>
          <label>Nombre de Usuario:</label>
          <input
            type="text"
            name="name"
            value={loginData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="button-container">
          <button type="submit">Iniciar Sesión</button>
        </div>
        <p className="switch-text">
          ¿No tienes cuenta?{" "}
          <span onClick={handleGoToRegister} className="switch-link">
            Regístrate aquí
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
