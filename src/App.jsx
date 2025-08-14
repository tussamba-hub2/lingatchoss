import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authentication from "./auth/Authentication";
import Dashboard from "./panel/Dashboard";
import InstitutionDetails from "./details/InstitutionDetails";
import EditService from "./components/edit/Service.jsx";
import Home from "./global/Home.jsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter basename="/lingatchoss">
      <Routes>
        <Route path="/sign-in" element={<Authentication />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/details" element={<InstitutionDetails />} />
        <Route path="/edit-service/:serviceId" element={<EditService />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
