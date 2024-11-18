import React, { useState } from "react";
import axios from "axios";
import "../css/Login.css"; // Archivo CSS para estilizar el login

function Login({ onLoginSuccess }) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = "https://3nbxtlj5-8083.brs.devtunnels.ms/api/auth/login";

    try {
      // Enviando los datos de inicio de sesión con axios
      const response = await axios.post(apiUrl, loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Si el inicio de sesión es exitoso
      console.log("Inicio de sesión exitoso:", response.data);
      alert("Inicio de sesión exitoso.");

      // Llama a la función para indicar que el login fue exitoso
      onLoginSuccess();
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
      </form>
    </div>
  );
}

export default Login;
