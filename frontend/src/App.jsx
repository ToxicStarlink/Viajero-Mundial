import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Inicio from './pages/Inicio';
import Login from "./pages/login";
import Partidos from "./pages/partidos";
import Boletos from "./pages/boletos";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/partidos" element={<Partidos />} />
        <Route path="/boletos/:id" element={<Boletos />} />
      </Routes>
    </Router>
  );
}

export default App;
