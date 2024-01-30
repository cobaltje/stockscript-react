import React from "react";
import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { FaMapLocation, FaPaintbrush } from "react-icons/fa6";
import { TwitterPicker } from "react-color";
import { API_BASE_URL } from "../../../Config";
import { toast } from "react-toastify";

export default function AddSiteModal({
  isOpen,
  onOpenChange,
  title,
  fetchDataLocations,
  fetchDataSites,
}) {
  const [isSaving, setIsSaving] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [formData, setFormData] = useState({
    sitename: "",
    color_code: "",
  });

  const isFormValid = formData.sitename.trim() !== "";

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
        const response = await fetch(`${API_BASE_URL}/site`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          // Successfully created the site
          const newSite = await response.json();
          fetchDataSites();
          fetchDataLocations();
          toast.success(`${formData.sitename} succesfully created!`, {});
          onOpenChange(false);
        } else {
          // Handle error cases
          console.error("Failed to create a new site");
        }
      } catch (error) {
        console.error("Error creating a new site:", error);
      } finally {
        setFormData({
          sitename: "",
          color_code: "",
        });
      }

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
                label="Site name"
                className="max-w-xs"
                startContent={<FaMapLocation />}
                onChange={(e) => handleInputChange("sitename", e.target.value)}
              />

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
                Add site
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
