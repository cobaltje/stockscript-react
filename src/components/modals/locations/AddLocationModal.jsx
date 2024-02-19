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
import {
  FaMapLocation,
  FaPaintbrush,
  FaLocationDot,
  FaCirclePlus,
} from "react-icons/fa6";
import { TwitterPicker } from "react-color";
import { toast } from "react-toastify";
import { createLocation } from "../../../functions/api/locationApi";

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
        const response = await createLocation(formData);
        if (response) {
          fetchDataSites();
          fetchDataLocations();
          toast.success(`${formData.locationname} succesfully created!`);
        }
      } catch (error) {
        console.error("Error creating a new location:", error);
        toast.error(`Error creating a new location`);
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
            <ModalHeader className="flex flex-row items-center gap-3">
              <FaCirclePlus />
              <span>{title}</span>
            </ModalHeader>
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
