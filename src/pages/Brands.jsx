import { Button, Divider, Chip, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FaMagnifyingGlass, FaNapster } from "react-icons/fa6";
import { API_BASE_URL } from "../Config";
import { showDeleteConfirmation } from "../functions/swalConfig";
import { createBrand, deleteBrand } from "../functions/api/brandApi";
import { toast } from "react-toastify";

export default function Brands() {
  const [isSaving, setIsSaving] = useState(false);
  const [brands, setBrands] = useState([]);
  const [formData, setFormData] = useState({
    brandname: "",
  });
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const fetchDataBrands = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/brand`);
      const result = await response.json();

      setBrands(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filterBrands = (brands, searchInput) => {
    return brands.filter(
      (brand) =>
        searchInput === "" ||
        brand.brandname.toLowerCase().includes(searchInput.toLowerCase())
    );
  };

  useEffect(() => {
    fetchDataBrands();
  }, []);

  const handleSave = async () => {
    if (formData.brandname.trim() !== "") {
      setIsSaving(true);
      try {
        const response = await createBrand(formData);
        if (response) {
          fetchDataBrands();
          toast.success(`${formData.brandname} succesfully created!`, {});
        }
      } catch (error) {
        console.error("Error creating a new brand:", error);
        toast.error(`${error}`, {});
      }
    }
  };

  const handleDeleteBrand = async (brandId, brandName) => {
    const result = await showDeleteConfirmation(brandName);

    if (result.isConfirmed) {
      const deletedSuccessfully = await deleteBrand(brandId);
      if (deletedSuccessfully) {
        fetchDataBrands();
        toast.success(`${brandName} successfully deleted!`, {});
      } else {
        toast.error(`Unable to delete ${brandName}!`);
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-xl uppercase flex items-center gap-3">
          <span>Brands</span>
          <Chip variant="flat" color="primary">
            {brands.length}
          </Chip>
        </h1>
        <div className="flex flex-row  gap-2">
          <Input
            labelPlacement="outside"
            size="md"
            placeholder="Search brand"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            startContent={
              <FaMagnifyingGlass className="text-default-400 pointer-events-none flex-shrink-0" />
            }
          />
          <Input
            labelPlacement="outside"
            size="md"
            placeholder="Add brand"
            onChange={(e) => handleInputChange("brandname", e.target.value)}
            startContent={
              <FaNapster className="text-default-400 pointer-events-none flex-shrink-0" />
            }
          />
          <span>
            <Button
              color="primary"
              variant="flat"
              startContent={<FaNapster />}
              onClick={handleSave}
            >
              Add Brands
            </Button>
          </span>
        </div>
      </div>
      <Divider className="mt-3 mb-3" orientation="horizontal" />
      <div className="flex flex-wrap mt-2 gap-2">
        {filterBrands(brands, searchInput).map((brand) => (
          <div key={brand.id}>
            <Chip
              onClose={() => handleDeleteBrand(brand.id, brand.brandname)}
              variant="shadow"
              color="primary"
            >
              {brand.brandname}
            </Chip>
          </div>
        ))}
      </div>
    </>
  );
}
