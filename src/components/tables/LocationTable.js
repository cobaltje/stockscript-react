import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@nextui-org/react";

export default function LocationTable({ locations }) {
  return (
    <Table aria-label="location table">
      <TableHeader>
        <TableColumn>ID</TableColumn>
        <TableColumn>LOCATION</TableColumn>
        <TableColumn>SITE</TableColumn>
      </TableHeader>
      <TableBody>
        {locations.map((location) => (
          <TableRow key={location.id}>
            <TableCell>{location.id}</TableCell>
            <TableCell>{location.locationname}</TableCell>
            <TableCell>
              <Chip color="primary" variant="solid">
                {location.sitename}
              </Chip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
