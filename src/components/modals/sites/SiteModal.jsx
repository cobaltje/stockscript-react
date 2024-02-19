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
import { toast } from "react-toastify";
import { updateSite } from "../../../functions/api/siteApi";

export default function SiteModal({
  isOpen,
  onOpenChange,
  siteData,
  fetchDataLocations,
  fetchDataSites,
  viewOnly,
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
      const response = await updateSite(formData);

      if (response) {
        // Successful update
        fetchDataSites();
        fetchDataLocations();
        toast.success(`${formData.sitename} successfully saved!`, {});
      }
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error(`${error}`, {});
    } finally {
      setIsSaving(false);
      onOpenChange(false);
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
                isDisabled={!viewOnly}
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
                <FaPaintbrush />
                {!viewOnly ? "See site color" : "Choose site color"}
              </Button>

              {showColorPicker && (
                <TwitterPicker
                  className="max-w-xs"
                  color={formData.color_code}
                  onChange={(color) => {
                    if (viewOnly) {
                      setFormData((prevData) => ({
                        ...prevData,
                        color_code: color.hex,
                      }));
                    }
                  }}
                  // onChangeComplete={(color) => setColor(color)}
                />
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              {viewOnly ? (
                <Button
                  isLoading={isSaving}
                  color="primary"
                  onPress={handleSave}
                >
                  {!isSaving ? "Save" : "Saving"}
                </Button>
              ) : (
                ""
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
