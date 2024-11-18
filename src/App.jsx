import React, { useState } from "react";
import Login from "./components/Login";
import FormularioIA from "./components/FormularioIA";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true); // Cuando el login es exitoso, el usuario se autentica
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        <FormularioIA />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;
