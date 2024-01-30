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
import { FaRegTrashCan, FaPencil } from "react-icons/fa6";

export default function SiteTable({ sites, onEditClick, onDeleteClick }) {
  const handleOnClick = (site) => {
    onEditClick(site);
  };

  return (
    <Table aria-label="location table">
      <TableHeader>
        <TableColumn>ID</TableColumn>
        <TableColumn>SITE</TableColumn>
        <TableColumn>ACTIONS</TableColumn>
      </TableHeader>
      <TableBody>
        {sites.map((site) => (
          <TableRow key={site.id}>
            <TableCell>
              <Chip color="default" variant="flat">
                {site.id}
              </Chip>
            </TableCell>
            <TableCell>{site.sitename}</TableCell>
            <TableCell>
              <Button
                isIconOnly
                size="sm"
                color="primary"
                variant="flat"
                className="mr-2"
                onClick={() => handleOnClick(site)}
              >
                <FaPencil />
              </Button>
              <Button
                onClick={() => onDeleteClick(site.id, site.sitename)}
                isIconOnly
                size="sm"
                color="danger"
                variant="flat"
              >
                <FaRegTrashCan />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
