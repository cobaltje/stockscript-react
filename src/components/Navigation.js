import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link as NextUiLink,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Badge,
} from "@nextui-org/react";
import { FaBell } from "react-icons/fa6";

export default function Navigation() {
  const location = useLocation();
  const isRouteActive = (route) => location.pathname === route;

  return (
    <Navbar className="mb-8 bg-slate-200 ">
      <NavbarBrand>
        <p>StockScript React</p>
      </NavbarBrand>
      <NavbarContent>
        <NavbarItem>
          <Button
            as={Link}
            to="/"
            variant={isRouteActive("/") ? "solid" : "light"}
            color={isRouteActive("/") ? "primary" : "default"}
          >
            Dashboard
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            to="/products"
            variant={isRouteActive("/products") ? "solid" : "light"}
            color={isRouteActive("/products") ? "primary" : "default"}
          >
            Products
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            to="/locations"
            variant={isRouteActive("/locations") ? "solid" : "light"}
            color={isRouteActive("/locations") ? "primary" : "default"}
          >
            Sites & Locations
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            to="/suppliers"
            variant={isRouteActive("/suppliers") ? "solid" : "light"}
            color={isRouteActive("/suppliers") ? "primary" : "default"}
          >
            Suppliers
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            to="/brands"
            variant={isRouteActive("/brands") ? "solid" : "light"}
            color={isRouteActive("/brands") ? "primary" : "default"}
          >
            Brands
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent as="div" className="items-center " justify="end">
        <Badge color="danger" content={5} shape="circle">
          <FaBell className="fill-current" size={20} />
        </Badge>
        <Dropdown placement="bottom-end">
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
      </NavbarContent>
    </Navbar>
  );
}
