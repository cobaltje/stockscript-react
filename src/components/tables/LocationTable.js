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

export default function LocationTable({ locations, onEditClick }) {
  const handleOnClick = (location, view) => {
    console.log(view);
    onEditClick(location, view);
  };

  return (
    <Table aria-label="location table">
      <TableHeader>
        <TableColumn>ID</TableColumn>
        <TableColumn>LOCATION</TableColumn>
        <TableColumn>SITE</TableColumn>
        <TableColumn>ACTIONS</TableColumn>
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
                color="primary"
                variant="flat"
                style={{ backgroundColor: "darkblue", color: "#fff" }}
              >
                {location.sitename}
              </Chip>
            </TableCell>
            <TableCell>
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
