import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Inicio from './pages/Inicio';
import Login from "./pages/login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
