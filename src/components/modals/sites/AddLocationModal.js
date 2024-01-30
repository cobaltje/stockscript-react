import React from "react";
import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { FaMapLocation, FaPaintbrush, FaLocationDot } from "react-icons/fa6";
import { TwitterPicker } from "react-color";
import { API_BASE_URL } from "../../../Config";
import { toast } from "react-toastify";

export default function AddLocationModal({
  isOpen,
  onOpenChange,
  title,
  sitesData,
  fetchDataLocations,
  fetchDataSites,
}) {
  const [isSaving, setIsSaving] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [formData, setFormData] = useState({
    locationname: "",
    site_id: "",
    color_code: "",
  });

  const isFormValid =
    formData.locationname.trim() !== "" && formData.site_id !== "";

  const handleInputChange = (fieldName, value) => {
    console.log(fieldName, value);
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
        const response = await fetch(`${API_BASE_URL}/location`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          fetchDataSites();
          fetchDataLocations();
          toast.success(`${formData.locationname} succesfully created!`, {});
        } else {
          // Handle error cases
          throw Error(result.message);
        }
      } catch (error) {
        console.error("Error creating a new location:", error);
        toast.error(`${error}`, {});
      }

      onOpenChange(false);
      setFormData({
        locationname: "",
        site_id: "",
        color_code: "",
      });
      setIsSaving(false);
    }
  };

  return (
    <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              <Input
                isRequired
                type="text"
                label="Location name"
                className="max-w-xs"
                startContent={<FaLocationDot />}
                onChange={(e) =>
                  handleInputChange("locationname", e.target.value)
                }
              />

              <Select
                isRequired
                label="Choose a site"
                startContent={<FaMapLocation />}
                className="max-w-xs"
                onChange={(e) => handleInputChange("site_id", e.target.value)}
              >
                {sitesData.map((site) => (
                  <SelectItem key={site.id} value={site.sitename}>
                    {site.sitename}
                  </SelectItem>
                ))}
              </Select>

              <Button
                onPress={() => setShowColorPicker(!showColorPicker)}
                size="sm"
                color="default"
                variant="flat"
                className="max-w-xs"
              >
                <FaPaintbrush /> Site color
              </Button>

              {showColorPicker && (
                <TwitterPicker
                  className="max-w-xs"
                  color={formData.color_code}
                  onChange={(color) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      color_code: color.hex,
                    }))
                  }
                  // onChangeComplete={(color) => setColor(color)}
                />
              )}
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
                Add location
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
