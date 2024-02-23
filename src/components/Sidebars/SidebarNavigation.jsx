import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import {
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Tooltip,
} from "@nextui-org/react";
import {
  FaFileCirclePlus,
  FaHouse,
  FaLocationDot,
  FaNapster,
  FaTruck,
} from "react-icons/fa6";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();
  const isRouteActive = (route) => location.pathname === route;

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={`bg-blue-900 text-white flex flex-col transition-all duration-300 ${
        collapsed ? "w-16 items-center" : "w-52"
      }`}
    >
      <div className="p-4">
        <p className={`text-lg font-bold ${collapsed ? "text-center" : ""}`}>
          {collapsed
            ? `Stock
          Script`
            : "StockScript"}
        </p>
      </div>
      <Button
        className={`p-2 bg-blue-900 text-white self-start ${
          collapsed ? "mx-auto" : ""
        }`}
        onClick={toggleSidebar}
        isIconOnly
      >
        {collapsed ? <FaBars /> : <FaTimes />}
      </Button>
      <div className="flex-grow">
        <ul>
          <li className=" hover:bg-blue-700">
            <Link
              to="/"
              className={`block py-2 px-4 ${
                isRouteActive("/") && "bg-white text-blue-900"
              }`}
            >
              {collapsed ? (
                <Tooltip
                  showArrow
                  placement="right"
                  color="primary"
                  content="Dashboard"
                  offset={30}
                >
                  <span>
                    <FaHouse />
                  </span>
                </Tooltip>
              ) : (
                <span className="flex items-center gap-2">
                  <FaHouse /> Dashboard
                </span>
              )}
            </Link>
          </li>
          <li className="hover:bg-blue-700">
            <Link
              to="/products"
              className={`block py-2 px-4 ${
                isRouteActive("/products") && "bg-white text-blue-900"
              }`}
            >
              {collapsed ? (
                <Tooltip
                  showArrow
                  placement="right"
                  color="primary"
                  content="Products"
                  offset={30}
                >
                  <span>
                    <FaFileCirclePlus />
                  </span>
                </Tooltip>
              ) : (
                <span className="flex items-center gap-2">
                  <FaFileCirclePlus /> Products
                </span>
              )}
            </Link>
          </li>
          <li className="hover:bg-blue-700">
            <Link
              to="/locations"
              className={`block py-2 px-4 ${
                isRouteActive("/locations") && "bg-white text-blue-900"
              }`}
            >
              {collapsed ? (
                <Tooltip
                  showArrow
                  placement="right"
                  color="primary"
                  content="Locations"
                  offset={30}
                >
                  <span>
                    <FaLocationDot />
                  </span>
                </Tooltip>
              ) : (
                <span className="flex items-center gap-2">
                  <FaLocationDot /> Sites & Locations
                </span>
              )}
            </Link>
          </li>
          <li className="hover:bg-blue-700">
            <Link
              to="/suppliers"
              className={`block py-2 px-4 ${
                isRouteActive("/suppliers") && "bg-white text-blue-900"
              }`}
            >
              {collapsed ? (
                <Tooltip
                  showArrow
                  placement="right"
                  color="primary"
                  content="Suppliers"
                  offset={30}
                >
                  <span>
                    <FaTruck />
                  </span>
                </Tooltip>
              ) : (
                <span className="flex items-center gap-2">
                  <FaTruck /> Suppliers
                </span>
              )}
            </Link>
          </li>
          <li className=" hover:bg-blue-700">
            <Link
              to="/brands"
              className={`block py-2 px-4 ${
                isRouteActive("/brands") && " bg-white text-blue-900"
              }`}
            >
              {collapsed ? (
                <Tooltip
                  showArrow
                  placement="right"
                  color="primary"
                  content="Brands"
                  offset={30}
                >
                  <span>
                    <FaNapster />
                  </span>
                </Tooltip>
              ) : (
                <span className="flex items-center gap-2">
                  <FaNapster /> Brands
                </span>
              )}
            </Link>
          </li>
        </ul>
      </div>
      <div className="p-4 flex justify-center items-center">
        <Dropdown placement="top-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042ss581f4e2x026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">timothy.vinckier@hotmail.com</p>
            </DropdownItem>
            <DropdownItem key="settings">
              <Link to="/dashboard">My Settings</Link>
            </DropdownItem>
            <DropdownItem key="team_settings">
              StockScript Settings
            </DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Sidebar;
