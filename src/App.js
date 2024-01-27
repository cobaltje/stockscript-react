import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SitesAndLocations from "./pages/SitesAndLocations";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <Router>
      <Navigation />
      <ToastContainer />

      <div className="max-w-5xl mx-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/locations" element={<SitesAndLocations />} />
        </Routes>
      </div>
    </Router>
  );
}
