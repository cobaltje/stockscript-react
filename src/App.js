import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";

export default function App() {
  return (
    <Router>
      <Navigation />

      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
