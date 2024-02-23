import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SitesAndLocations from "./pages/SitesAndLocations";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Suppliers from "./pages/Suppliers";
import Brands from "./pages/Brands";
import Products from "./pages/Products";
import SidebarNavigation from "./components/Sidebars/SidebarNavigation";
import Sidebar from "./components/Sidebars/Sidebar";
import { SidebarProvider } from "./contexts/SidebarContext";

export default function App() {
  return (
    <Router>
      <SidebarProvider>
        <div className="flex h-screen">
          <SidebarNavigation />
          <div className="flex flex-col w-full">
            <ToastContainer
              pauseOnFocusLoss={false}
              closeOnClick={true}
              theme={"colored"}
              autoClose={3000}
            />
            <div className="flex-grow overflow-y-auto">
              <div className="max-w-screen-2xl mx-auto p-4">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/locations" element={<SitesAndLocations />} />
                  <Route path="/suppliers" element={<Suppliers />} />
                  <Route path="/brands" element={<Brands />} />
                </Routes>
              </div>
            </div>
          </div>
          <Sidebar />
        </div>
      </SidebarProvider>
    </Router>
  );
}
