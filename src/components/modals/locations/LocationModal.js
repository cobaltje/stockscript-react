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
  Select,
  SelectItem,
} from "@nextui-org/react";
import {
  FaMapLocation,
  FaKey,
  FaLocationDot,
  FaPaintbrush,
} from "react-icons/fa6";
import { API_BASE_URL } from "../../../Config";
import {
  HuePicker,
  SketchPicker,
  SliderPicker,
  TwitterPicker,
} from "react-color";
import { toast } from "react-toastify";

export default function SiteModal({
  isOpen,
  onOpenChange,

  locationData,
  sitesData,
  fetchDataLocations,
  fetchDataSites,
  viewOnly,
}) {
  const defaultBackgroundColor = "#fff";
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    id: locationData.id || "",
    locationname: locationData.locationname || "",
    site_id: locationData.site_id || "",
    color_code: locationData.color_code || defaultBackgroundColor,
  });

  useEffect(() => {
    setFormData({
      id: locationData.id || "",
      locationname: locationData.locationname || "",
      site_id: locationData.site_id || "",
      color_code: locationData.color_code || defaultBackgroundColor,
    });
  }, [locationData]);

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
      const response = await fetch(`${API_BASE_URL}/location/${formData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Successful update
        fetchDataSites();
        fetchDataLocations();
        toast.success(`${formData.locationname} successfully saved!`, {});
      } else {
        const result = await response.json();
        throw Error(result.message);
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
                {locationData.locationname}
              </div>
            </ModalHeader>
            <ModalBody>
              <Input
                isDisabled
                type="text"
                label="Site ID"
                color="primary"
                defaultValue={locationData.id}
                className="max-w-xs"
                startContent={<FaKey />}
              />
              <Input
                isRequired
                isDisabled={!viewOnly}
                type="text"
                label="Site name"
                defaultValue={locationData.locationname}
                className="max-w-xs"
                startContent={<FaMapLocation />}
                onChange={(e) =>
                  handleInputChange("locationname", e.target.value)
                }
              />
              <Select
                defaultSelectedKeys={[String(locationData.site_id)]}
                isRequired
                isDisabled={!viewOnly}
                label="Choose a site"
                startContent={<FaLocationDot />}
                className="max-w-xs"
                onChange={(e) => handleInputChange("site_id", e.target.value)}
              >
                {sitesData.map((site) => (
                  <SelectItem
                    key={site.id}
                    value={site.id}
                    textValue={site.sitename}
                  >
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
                  Save
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
