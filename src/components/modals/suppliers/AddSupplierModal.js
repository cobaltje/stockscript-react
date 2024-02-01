import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Image,
  Divider,
} from "@nextui-org/react";
import {
  FaTruck,
  FaAddressCard,
  FaList,
  FaMagnifyingGlass,
  FaUser,
  FaEnvelope,
  FaGlobe,
  FaImage,
} from "react-icons/fa6";
import { API_BASE_URL } from "../../../Config";
import { toast } from "react-toastify";

export default function AddSupplierModal({
  isOpen,
  onOpen,
  onOpenChange,
  title,
  fetchDataSuppliers,
}) {
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    suppliername: "",
    contact: "",
    contact_email: "",
    website: "",
    image_url: "",
  });

  const noImage =
    "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg";

  const isFormValid = formData.suppliername.trim() !== "";

  const handleInputChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSave = async () => {
    if (isFormValid) {
      setIsSaving(true);
      try {
        // Create a new site
        const response = await fetch(`${API_BASE_URL}/supplier`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          // Successfully created the site

          fetchDataSuppliers();

          toast.success(`${formData.suppliername} succesfully created!`, {});
        } else {
          // Handle error cases
          throw Error(result.message);
        }
      } catch (error) {
        console.error("Error creating a new supplier:", error);
        toast.error(`${error}`, {});
      }

      onOpenChange(false);
      setFormData({
        suppliername: "",
        contact: "",
        contact_email: "",
        website: "",
        image_url: "",
      });
      setIsSaving(false);
    }
  };

  return (
    <Modal size="xl" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-3">
                  <Input
                    isRequired
                    type="text"
                    label="Supplier name"
                    labelPlacement="inside"
                    className="max-w-xs"
                    startContent={<FaTruck />}
                    onChange={(e) =>
                      handleInputChange("suppliername", e.target.value)
                    }
                  />
                  <Input
                    type="text"
                    label="Contact name"
                    className="max-w-xs"
                    startContent={<FaUser />}
                    onChange={(e) =>
                      handleInputChange("contact", e.target.value)
                    }
                  />
                  <Input
                    type="email"
                    label="Contact email"
                    className="max-w-xs"
                    startContent={<FaEnvelope />}
                    onChange={(e) =>
                      handleInputChange("contact_email", e.target.value)
                    }
                  />
                  <Input
                    type="text"
                    label="Website"
                    className="max-w-xs"
                    startContent={<FaGlobe />}
                    onChange={(e) =>
                      handleInputChange("website", e.target.value)
                    }
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={formData.image_url ? formData.image_url : noImage}
                    width={250}
                    height={150}
                    isZoomed
                  />
                  <Input
                    type="text"
                    label="Supplier image url"
                    className="max-w-xs"
                    startContent={<FaImage />}
                    onChange={(e) =>
                      handleInputChange("image_url", e.target.value)
                    }
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button
                isDisabled={!isFormValid}
                isLoading={isSaving}
                color="primary"
                onPress={handleSave}
              >
                Add supplier
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
