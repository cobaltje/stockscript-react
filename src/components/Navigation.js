import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Link as NextUiLink,
} from "@nextui-org/react";

export default function Navigation() {
  return (
    <Navbar>
      <NavbarBrand>
        <p>StockScript React</p>
      </NavbarBrand>
      <NavbarContent>
        <NavbarItem>
          <Link to="/login">Dashboard</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/">Products</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/">Sites & Locations</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/">Suppliers</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/">Brands</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent as="div" className="items-center" justify="end">
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
