import { useEffect, useState } from "react";
import { API_BASE_URL } from "../Config";
import { deleteSupplier } from "../functions/api/supplierApi";
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
import { showDeleteConfirmation } from "../functions/swalConfig";

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [supplierData, setSupplierData] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [viewType, setViewType] = useState("card");
  const [viewOnly, setViewOnly] = useState(null);
  const [modalType, setModalType] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Open the modal to add a Supplier
  const openAddSupplierModal = () => {
    setModalType("addSupplier");
    onOpen();
  };

  // Open the modal to edit an excisting Supplier
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

  // Fetch all the Suppliers with an API call to the server
  const fetchDataSuppliers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/supplier`);
      const result = await response.json();

      setSuppliers(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Filter the (card) list based on the input filter
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

  // Delete a Supplier
  const handleDeleteSupplier = async (supplierId, supplierName) => {
    const result = await showDeleteConfirmation(supplierName);

    if (result.isConfirmed) {
      const deletedSuccessfully = await deleteSupplier(supplierId);
      if (deletedSuccessfully) {
        fetchDataSuppliers();
        toast.success(`${supplierName} successfully deleted!`, {});
      } else {
        toast.error(`Unable to delete ${supplierName}!`);
      }
    }
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
