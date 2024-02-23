import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [sidebarContent, setSidebarContent] = useState(null);

  return (
    <SidebarContext.Provider
      value={{ showSidebar, setShowSidebar, sidebarContent, setSidebarContent }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
