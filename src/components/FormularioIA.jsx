import React, { useContext, useState } from "react";
import axios from "axios";
import "../css/FormularioIA.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function FormularioIA({ onSwitch }) {
  const { login } = useContext(AuthContext); 
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // Controla el paso actual del formulario
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    age: "",
    gender: "",
    weight: "",
    objective: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = `${import.meta.env.VITE_API_URL}auth/register`;

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Registro exitoso:", response.data);
      login(response.data.token, response.data.user);
      navigate("/"); 
    } catch (error) {
      if (error.response) {
        console.error("Error al registrar:", error.response);
        alert(`Error al registrar: ${error.response.status} - ${error.response.statusText}`);
      } else if (error.request) {
        console.error("Error en la solicitud:", error.request);
        alert("Error de red, por favor intente más tarde.");
      } else {
        console.error("Error:", error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  const getTitle = () => {
    switch (step) {
      case 1:
        return "Datos Personales";
      case 2:
        return "Información Física";
      case 3:
        return "Datos de Usuario";
      default:
        return "Registro de Usuario";
    }
  };

  return (
    <div className="formulario-container">
      <form onSubmit={handleSubmit}>
        <h2 className="texth2">{getTitle()}</h2>

        {step === 1 && (
          <>
            <div>
              <label>Nombre de Usuario:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Edad:</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>
            <div className="button-container">
              <button type="button" onClick={handleNextStep}>
                Siguiente
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <label>Peso (kg):</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Género:</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione...</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <div className="button-container">
              <button type="button" onClick={handlePreviousStep}>
                Atrás
              </button>
              <button type="button" onClick={handleNextStep}>
                Siguiente
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div>
              <label>Objetivo:</label>
              <input
                type="text"
                name="objective"
                value={formData.objective}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Contraseña:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="button-container">
              <button type="button" onClick={handlePreviousStep}>
                Atrás
              </button>
              <button type="submit">Registrar</button>
            </div>
          </>
        )}
        <p className="switch-text">
          ¿Ya tienes cuenta?{" "}
          <span onClick={onSwitch} className="switch-link">
            Inicia sesión aquí
          </span>
        </p>
      </form>
    </div>
  );
}

export default FormularioIA;
