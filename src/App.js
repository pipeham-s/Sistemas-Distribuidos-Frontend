import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

import Home from "./pages/Home";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Ruta para la página de inicio */}
          <Route path="/" element={<Home />} />


        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
