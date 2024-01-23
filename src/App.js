import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Locations from "./pages/Locations";

export default function App() {
  return (
    <Router>
      <Navigation />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/locations" element={<Locations />} />
      </Routes>
    </Router>
  );
}
