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
import { FaMapLocation, FaKey, FaPaintbrush } from "react-icons/fa6";
import { TwitterPicker } from "react-color";
import { API_BASE_URL } from "../../../Config";
import { toast } from "react-toastify";

export default function SiteModal({
  isOpen,
  onOpenChange,
  title,
  content,
  footer,
  siteData,
  fetchDataLocations,
  fetchDataSites,
}) {
  const defaultBackgroundColor = "#fff";
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    id: siteData.id || "",
    sitename: siteData.sitename || "",
    color_code: siteData.color_code || defaultBackgroundColor,
  });

  useEffect(() => {
    setFormData({
      id: siteData.id || "",
      sitename: siteData.sitename || "",
      color_code: siteData.color_code || defaultBackgroundColor,
    });
  }, [siteData]);

  const handleInputChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSave = async () => {
    try {
      // Save Logic
      setIsSaving(true);
      console.log("Saving data:", formData);

      // Make an HTTP request to update the data
      const response = await fetch(`${API_BASE_URL}/site/${formData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Data updated successfully");
        fetchDataSites();
        fetchDataLocations();
        toast.success(`${formData.sitename} succesfully saved!`, {});
      } else {
        console.error("Failed to update data");
      }

      setIsSaving(false);
      // Close modal
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <FaMapLocation />
                {siteData.sitename}
              </div>
            </ModalHeader>
            <ModalBody>
              <Input
                isDisabled
                type="text"
                label="Site ID"
                color="primary"
                defaultValue={siteData.id}
                className="max-w-xs"
                startContent={<FaKey />}
              />
              <Input
                isRequired
                type="text"
                label="Site name"
                defaultValue={siteData.sitename}
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
                <FaPaintbrush /> Choose site color
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
                Close
              </Button>
              <Button isLoading={isSaving} color="primary" onPress={handleSave}>
                {!isSaving ? "Save" : "Saving"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
