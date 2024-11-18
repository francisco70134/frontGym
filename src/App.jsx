import React, { useState } from "react";
import Login from "./components/Login";
import FormularioIA from "./components/FormularioIA";

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="App">
      {isLogin ? (
        <Login onSwitch={() => setIsLogin(false)} />
      ) : (
        <FormularioIA onSwitch={() => setIsLogin(true)} />
      )}
    </div>
  );
}

export default App;
