import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useState } from "react";
import StockLocationCard from "../cards/StockLocationCard";
import { useSidebar } from "../../contexts/SidebarContext";

export default function ProductTable({ products, onEditClick, onDeleteClick }) {
  const { setShowSidebar, setSidebarContent } = useSidebar();
  const [selectedId, setSelectedId] = useState(new Set(["0"]));

  return (
    <Table
      aria-label="product table"
      selectionMode="single"
      color="primary"
      selectedKeys={selectedId}
      onSelectionChange={setSelectedId}
    >
      <TableHeader>
        <TableColumn>#</TableColumn>
        <TableColumn>Product</TableColumn>
        <TableColumn>Brand</TableColumn>
        <TableColumn>Supplier</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No products"}>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              <Avatar
                isBordered
                radius="sm"
                src={product.image_url}
                name={product.productname}
              />
            </TableCell>
            <TableCell>{product.productname}</TableCell>
            <TableCell>{product.brandname}</TableCell>
            <TableCell>{product.suppliername}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
