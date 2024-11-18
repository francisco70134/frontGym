import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import "./HomePage.css";
import ReactMarkdown from "react-markdown";
const HomePage = () => {
  const { logout } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const [userData] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [messages, setMessages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false); // Estado para controlar si está cargando

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Validar que sea un archivo JPG
    if (file && file.type === "image/jpeg") {
      setSelectedFile(file);
    } else {
      alert("Solo se permiten archivos en formato JPG");
      setSelectedFile(null);
    }
  };

  const handleSend = async () => {
    if (!selectedFile) {
      alert("Por favor selecciona un archivo JPG antes de enviar.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile); // El archivo se envía con la clave 'file'

    setLoading(true); // Iniciar la carga

    try {
      const apiUrl = `${import.meta.env.VITE_API_URL}ia/rutine`; // URL de la API

      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: token,
        },
      });

      // Añadir la respuesta del backend a los mensajes
      setMessages((prev) => [
        ...prev,
        { text: response.data.txt || "Respuesta del backend simulada" },
      ]);
      console.log(response.data.txt);

      setSelectedFile(null); // Limpiar la selección del archivo
    } catch (error) {
      console.error("Error al enviar el archivo:", error);
      alert("Ocurrió un error al enviar el archivo. Intenta nuevamente.");
    } finally {
      setLoading(false); // Finalizar la carga
    }
  };

  if (!userData) {
    return <p>Cargando datos del usuario...</p>;
  }

  return (
    <div className="home-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="user-info">
          <h2>Bienvenido, {userData.name}</h2>
          <hr />
          <p>Peso: {userData.weight} kg</p>
          <p>Edad: {userData.age}</p>
          <p>Género: {userData.gender}</p>
          <p>Objetivo: {userData.objective}</p>
        </div>
        <button className="logout-button" onClick={logout}>
          Cerrar sesión
        </button>
      </div>

      {/* Chat principal */}
      <div className="main-content">
        <div
          className={`chat-container ${messages.length ? "with-messages" : ""}`}
        >
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className="chat-message">
                {/* Renderiza el texto con formato Markdown */}
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            ))}
            {loading && (
              <p className="chat-message loading-message">Cargando...</p>
            )}
          </div>
          <div className="chat-input">
            <input
              type="file"
              accept="image/jpeg"
              onChange={handleFileChange}
              className="file-input"
            />
            <button onClick={handleSend} className="send-button">
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
