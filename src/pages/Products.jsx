import { Button, Chip, Divider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FaFileCirclePlus } from "react-icons/fa6";
import { deleteProduct, getProducts } from "../functions/api/productApi";
import { toast } from "react-toastify";
import { showDeleteConfirmation } from "../functions/swalConfig";
import { useSidebar } from "../contexts/SidebarContext";
import ProductTable from "../components/tables/ProductTable";
import StockLocationCard from "../components/cards/StockLocationCard";

export default function Products() {
  const { setShowSidebar, setSidebarContent } = useSidebar();
  const [products, setProducts] = useState([]);

  const fetchDataProducts = async () => {
    try {
      const result = await getProducts();
      setProducts(result);
    } catch (error) {
      console.error(error);
      toast.error("Unable to get the products from the database!");
    }
  };

  useEffect(() => {
    fetchDataProducts();
  }, []);

  const handleDeleteProduct = async (productId, productName) => {
    const result = await showDeleteConfirmation(productName);
    if (result.isConfirmed) {
      try {
        const result = await deleteProduct(productId);
        if (result) {
          fetchDataProducts();
          toast.success(`${productName} succesfully deleted!`);
        }
      } catch (error) {
        toast.error(`Unable to delete ${productName}`);
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-xl uppercase flex items-center gap-3">
          <span>Products</span>
          <Chip variant="flat" color="primary">
            {products.length}
          </Chip>
        </h1>
        <span>
          <Button
            color="primary"
            variant="flat"
            startContent={<FaFileCirclePlus />}
            onClick={() => {
              setShowSidebar(true);
              setSidebarContent(<StockLocationCard />);
            }}
          >
            Add Product
          </Button>
        </span>
      </div>

      <Divider className="mt-3 mb-3" orientation="horizontal" />
      <ProductTable products={products} />
    </>
  );
}
