import { Routes, Route } from "react-router-dom";
import Authentication from "./auth/Authentication";
import Dashboard from "./panel/Dashboard";
import InstitutionDetails from "./details/InstitutionDetails";
import EditService from "./components/edit/Service.jsx";
import Home from "./global/Home.jsx";

function App() {
  return (
    <Routes>
      <Route path="/sign-in" element={<Authentication />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/details" element={<InstitutionDetails />} />
      <Route path="/edit-service/:serviceId" element={<EditService />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
