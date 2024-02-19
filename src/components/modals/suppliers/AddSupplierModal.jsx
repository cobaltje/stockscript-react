import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Image,
} from "@nextui-org/react";
import {
  FaTruck,
  FaUser,
  FaEnvelope,
  FaGlobe,
  FaImage,
  FaCirclePlus,
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
          <form onSubmit={handleSubmit(handleSave)}>
            <ModalHeader className="flex flex-row items-center gap-3">
              <FaCirclePlus />
              <span>{title}</span>
            </ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-3">
                  <Input
                    {...register("supplierName", { required: true })}
                    aria-invalid={errors.firstname ? true : false}
                    type="text"
                    label="Supplier name"
                    labelPlacement="inside"
                    className="max-w-xs"
                    startContent={<FaTruck />}
                    onChange={(e) =>
                      handleInputChange("suppliername", e.target.value)
                    }
                  />
                  {errors.supplierName?.type === "required" && <p>Error</p>}

                  <Input
                    {...register("contact", { required: false })}
                    type="text"
                    label="Contact name"
                    className="max-w-xs"
                    startContent={<FaUser />}
                    onChange={(e) =>
                      handleInputChange("contact", e.target.value)
                    }
                  />
                  <Input
                    {...register("contactemail", { required: false })}
                    type="email"
                    label="Contact email"
                    className="max-w-xs"
                    startContent={<FaEnvelope />}
                    onChange={(e) =>
                      handleInputChange("contact_email", e.target.value)
                    }
                  />
                  <Input
                    {...register("website", { required: false })}
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
                    {...register("supplierimage", { required: false })}
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
                type="submit"
                //isDisabled={!isFormValid}
                isLoading={isSaving}
                color="primary"
              >
                Add supplier
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
