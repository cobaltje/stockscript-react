import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Link,
  useDisclosure,
} from "@nextui-org/react";
import {
  FaRegTrashCan,
  FaPencil,
  FaEye,
  FaEllipsisVertical,
} from "react-icons/fa6";
import { useState, useEffect } from "react";

export default function SupplierTable({ suppliers, onDeleteClick }) {
  return (
    <Table isStriped aria-label="suppliers table">
      <TableHeader>
        <TableColumn>ID</TableColumn>
        <TableColumn>SUPPLIERNAME</TableColumn>
        <TableColumn>CONTACT</TableColumn>
        <TableColumn>CONTACT EMAIL</TableColumn>
        <TableColumn>WEBSITE</TableColumn>
        <TableColumn>ACTIONS</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No suppliers found."}>
        {suppliers.map((supplier) => (
          <TableRow key={supplier.id}>
            <TableCell>
              <Chip color="default" variant="flat">
                {supplier.id}
              </Chip>
            </TableCell>
            <TableCell>{supplier.suppliername}</TableCell>
            <TableCell>{supplier.contact}</TableCell>
            <TableCell>
              {supplier.contact_email && (
                <Link
                  size="sm"
                  isExternal
                  isBlock
                  showAnchorIcon
                  href={"mailto:" + supplier.contact_email}
                >
                  {supplier.contact_email}
                </Link>
              )}
            </TableCell>
            <TableCell>
              {supplier.website && (
                <Link
                  size="sm"
                  isExternal
                  isBlock
                  showAnchorIcon
                  href={supplier.website}
                >
                  {supplier.website}
                </Link>
              )}
            </TableCell>
            <TableCell className="text-right">
              <Dropdown>
                <DropdownTrigger>
                  <Button size="sm" isIconOnly variant="flat">
                    <FaEllipsisVertical />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu variant="flat">
                  <DropdownItem
                    description={`View the details of this site.`}
                    startContent={<FaEye />}
                    color="default"
                  >
                    View
                  </DropdownItem>
                  <DropdownItem
                    description={`Edit the details of this site.`}
                    startContent={<FaPencil />}
                    color="primary"
                  >
                    Edit
                  </DropdownItem>
                  <DropdownItem
                    description={`Delete this site.`}
                    startContent={<FaRegTrashCan />}
                    color="danger"
                    className="text-danger"
                    onClick={() =>
                      onDeleteClick(supplier.id, supplier.suppliername)
                    }
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
