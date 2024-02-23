import React from "react";
import { useSidebar } from "../../contexts/SidebarContext";

export default function Sidebar() {
  const { showSidebar, sidebarContent } = useSidebar();

  if (!showSidebar) {
    return null;
  }

  return (
    <div className="bg-indigo-100  w-5/12 p-5">
      {/* Header */}
      <div className="text-xl uppercase mb-4 "></div>
      {/* Content */}
      <div className="">{sidebarContent}</div>
    </div>
  );
}
