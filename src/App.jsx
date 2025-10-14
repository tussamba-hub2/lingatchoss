import { Routes, Route } from "react-router-dom";
import Authentication from "./auth/Authentication";
import Dashboard from "./panel/Dashboard";
import InstitutionDetails from "./details/InstitutionDetails";
import EditService from "./components/edit/Service.jsx";
import Home from "./global/Home.jsx";
import Service from "./global/components/details/Service";
import SearchServices from "./global/SearchServices.jsx";
import Instituition from "./global/components/details/Instituition";
import Appointments from "./panel/Appointments.jsx";
import Services from "./panel/Services.jsx";
import Settings from "./panel/Settings.jsx";
import Appointment from "./components/details/Appointment.jsx";
import Enterprises from "./global/Enterprises.jsx";

function App() {
  return (
    <Routes>
      <Route path="/siadsadgn-asdadagdfgsdinadsadaslgfmd" element={<Authentication />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/services" element={<Services />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/appointment/:appointmentId" element={<Appointment />} />
      <Route path="/details" element={<InstitutionDetails />} />
      <Route path="/edit-service/:serviceId" element={<EditService />} />
      <Route path="/service/:serviceId" element={<Service />} />
      <Route path="/" element={<Home />} />
      <Route path="/enterprises" element={<Enterprises />} />
      <Route path="/search" element={<SearchServices />} />
      <Route path="/instituition/:id" element={<Instituition />} />
    </Routes>
  );
}

export default App;
