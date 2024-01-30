import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
} from "@nextui-org/react";
import { FaRegTrashCan, FaPencil, FaEye } from "react-icons/fa6";
import ColorDecider from "../ColorDecider";

export default function LocationTable({ locations, sites, onEditClick }) {
  const handleOnClick = (location, view) => {
    onEditClick(location, view);
  };

  return (
    <Table aria-label="location table">
      <TableHeader>
        <TableColumn>ID</TableColumn>
        <TableColumn>LOCATION</TableColumn>
        <TableColumn>SITE</TableColumn>
        <TableColumn className="text-right">ACTIONS</TableColumn>
      </TableHeader>
      <TableBody>
        {locations.map((location) => (
          <TableRow key={location.id}>
            <TableCell>
              <Chip color="default" variant="flat">
                {location.id}
              </Chip>
            </TableCell>
            <TableCell>{location.locationname}</TableCell>
            <TableCell>
              <Chip
                variant="flat"
                style={{
                  backgroundColor: `${location.color_code}`,
                  color: ColorDecider(location.color_code),
                }}
              >
                {location.sitename}
              </Chip>
            </TableCell>
            <TableCell className="text-right">
              <Button
                isIconOnly
                size="sm"
                color="default"
                variant="flat"
                className="mr-2"
                onClick={() => handleOnClick(location, "view")}
              >
                <FaEye />
              </Button>
              <Button
                isIconOnly
                size="sm"
                color="primary"
                variant="flat"
                className="mr-2"
                onClick={() => handleOnClick(location)}
              >
                <FaPencil />
              </Button>
              <Button isIconOnly size="sm" color="danger" variant="flat">
                <FaRegTrashCan />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
