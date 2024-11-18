import React, { useState } from "react";
import "../css/FormularioIA.css";
import axios from "axios";

function FormularioIA() {
  const [step, setStep] = useState(1); 
  const [formData, setFormData] = useState({
    nombre: "",
    edad: "",
    genero: "",
    objetivo: "",
    peso: "",
    contraseña: "",
  });

  // Función para manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Funciones para cambiar entre pasos
  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = "https://3nbxtlj5-8083.brs.devtunnels.ms/api/auth/register";

    // Preparar el objeto JSON para enviar
    const payload = {
      name: formData.nombre,
      password: formData.contraseña,
      weight: parseInt(formData.peso),
      age: parseInt(formData.edad),
      gender: formData.genero,
      objective: formData.objetivo,
    };

    try {
      // Hacer la solicitud POST usando axios
      const response = await axios.post(apiUrl, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Manejo de una respuesta exitosa
      console.log("Registro exitoso:", response.data);
      alert("Registro exitoso.");
    } catch (error) {
      // Manejo de error con axios
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        console.error("Error al registrar:", error.response);
        alert(`Error al registrar: ${error.response.status} - ${error.response.statusText}\nDetalles: ${error.response.data}`);
      } else if (error.request) {
        // La solicitud se hizo pero no se recibió respuesta
        console.error("Error en la solicitud:", error.request);
        alert("Error de red, por favor intente más tarde.");
      } else {
        // Algo pasó al preparar la solicitud
        console.error("Error:", error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  // Títulos dinámicos según el paso actual
  const getTitle = () => {
    switch (step) {
      case 1:
        return "Nombre";
      case 2:
        return "Edad";
      case 3:
        return "Género";
      case 4:
        return "Objetivo";
      case 5:
        return "Peso";
      case 6:
        return "Contraseña";
      default:
        return "Formulario de Implementación IA";
    }
  };

  return (
    <div className="formulario-container">
      <form onSubmit={handleSubmit}>
        <h2 className="texth2">{getTitle()}</h2>

        {step === 1 && (
          <>
            <div>
              <label>Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
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
              <label>Edad:</label>
              <input
                type="number"
                name="edad"
                value={formData.edad}
                onChange={handleChange}
                required
              />
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
              <label>Género:</label>
              <select
                name="genero"
                value={formData.genero}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione...</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
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

        {step === 4 && (
          <>
            <div>
              <label>Objetivo:</label>
              <select
                name="objetivo"
                value={formData.objetivo}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione...</option>
                <option value="bajar de peso">Bajar de peso</option>
                <option value="ganar peso">Ganar peso</option>
                <option value="mantener peso">Mantener peso</option>
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

        {step === 5 && (
          <>
            <div>
              <label>Peso (kg):</label>
              <input
                type="number"
                name="peso"
                value={formData.peso}
                onChange={handleChange}
                required
              />
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

        {step === 6 && (
          <>
            <div>
              <label>Contraseña:</label>
              <input
                type="password"
                name="contraseña"
                value={formData.contraseña}
                onChange={handleChange}
                required
              />
            </div>
            <div className="button-container">
              <button type="button" onClick={handlePreviousStep}>
                Atrás
              </button>
              <button type="submit">Enviar</button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default FormularioIA;
