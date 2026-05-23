import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Inicio from './pages/Inicio';
import Login from "./pages/login";
import Partidos from "./pages/partidos";
import Boletos from "./pages/boletos";
import Registro from "./pages/registro";
import Compra from "./pages/compra";
import Guia from "./pages/guia";
import Perfil from "./pages/perfil";
import BoletoDetalle from './pages/BoletoDetalle';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/partidos" element={<Partidos />} />
        <Route path="/boletos/:id" element={<Boletos />} />
        <Route path="/compra" element={<Compra />} />
        <Route path="/guia" element={<Guia />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/boleto/:id" element={<BoletoDetalle />} />
      </Routes>
    </Router>
  );
}

export default App;
