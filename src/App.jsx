// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Tributes from "./pages/Tributes.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tributes" element={<Tributes />} />
      </Routes>
    </>
  );
}


