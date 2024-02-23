import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

export default function ProductTable({ products, onEditClick, onDeleteClick }) {
  return (
    <Table isStriped aria-label="product table">
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
