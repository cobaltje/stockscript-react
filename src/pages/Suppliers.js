import { useEffect, useState } from "react";
import { API_BASE_URL } from "../Config";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import SupplierCard from "../components/cards/SupplierCard";
import SupplierTable from "../components/tables/SupplierTable";
import SupplierModal from "../components/modals/suppliers/SupplierModal";
import AddSupplierModal from "../components/modals/suppliers/AddSupplierModal";
import {
  Button,
  Divider,
  ButtonGroup,
  Chip,
  Input,
  useDisclosure,
} from "@nextui-org/react";
import {
  FaTruck,
  FaAddressCard,
  FaList,
  FaMagnifyingGlass,
} from "react-icons/fa6";

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [supplierData, setSupplierData] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [viewType, setViewType] = useState("card");
  const [viewOnly, setViewOnly] = useState(null);
  const [modalType, setModalType] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const openAddSupplierModal = () => {
    setModalType("addSupplier");
    onOpen();
  };

  const openEditSupplierModal = (supplier, view) => {
    setModalType("editSupplier");
    setSupplierData(supplier);
    setViewOnly(view === "view" ? false : true);
    onOpen();
  };

  // Function to switch between Card or Table view
  const handleView = (type) => {
    setViewType(type);
  };

  const fetchDataSuppliers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/supplier`);
      const result = await response.json();

      setSuppliers(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filterSuppliers = (suppliers, searchInput) => {
    return suppliers.filter(
      (supplier) =>
        searchInput === "" ||
        supplier.suppliername.toLowerCase().includes(searchInput.toLowerCase())
    );
  };

  useEffect(() => {
    fetchDataSuppliers();
  }, []);

  const handleDeleteSupplier = async (supplierId, supplierName) => {
    Swal.fire({
      title: `Delete ${supplierName} ?`,
      text: "There is no way back after this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `${API_BASE_URL}/supplier/${supplierId}`,
            {
              method: "DELETE",
            }
          );

          if (response.ok) {
            // Successfully deleted the site
            console.log("Supplier deleted successfully");
            fetchDataSuppliers(); // Refresh the site data

            toast.success(`${supplierName} succesfully deleted!`, {});
          } else {
            // Handle error cases
            console.error("Failed to delete the site");
            toast.error(`Unable to delete ${supplierName}!`);
          }
        } catch (error) {
          console.error("Error deleting the site:", error);
        }
      }
    });
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-xl uppercase flex items-center gap-3">
          <span>Suppliers</span>
          <Chip variant="flat" color="primary">
            {suppliers.length}
          </Chip>
        </h1>
        <ButtonGroup isIconOnly variant="flat">
          <Button
            color={viewType === "card" ? "primary" : "default"}
            onClick={() => handleView("card")}
          >
            <FaAddressCard />
          </Button>
          <Button
            color={viewType === "list" ? "primary" : "default"}
            onClick={() => handleView("list")}
          >
            <FaList />
          </Button>
        </ButtonGroup>

        <div className="flex items-center gap-2">
          <Input
            labelPlacement="outside"
            size="md"
            placeholder="Search supplier"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            startContent={
              <FaMagnifyingGlass className="text-default-400 pointer-events-none flex-shrink-0" />
            }
          />
          <div>
            <Button
              color="primary"
              variant="flat"
              startContent={<FaTruck />}
              onClick={openAddSupplierModal}
            >
              Add Supplier
            </Button>
          </div>
        </div>
      </div>
      <Divider className="mt-3 mb-3" orientation="horizontal" />
      {viewType === "card" ? (
        <div className="grid grid-cols-4 gap-4 mt-3">
          {filterSuppliers(suppliers, searchInput).map((supplier) => (
            <SupplierCard
              key={supplier.id}
              supplier={supplier}
              onDeleteClick={handleDeleteSupplier}
            />
          ))}
        </div>
      ) : (
        <SupplierTable
          suppliers={filterSuppliers(suppliers, searchInput)}
          onDeleteClick={handleDeleteSupplier}
        />
      )}
      {modalType === "editSupplier" && (
        <SupplierModal
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          supplierData={supplierData}
          fetchDataSuppliers={fetchDataSuppliers}
          viewOnly={viewOnly}
        />
      )}
      {modalType === "addSupplier" && (
        <AddSupplierModal
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          title="Add Supplier"
          fetchDataSuppliers={fetchDataSuppliers}
        />
      )}
    </>
  );
}
