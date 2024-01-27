import React from "react";
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
import { FaMapLocation, FaKey, FaLocationDot } from "react-icons/fa6";

export default function SiteModal({
  isOpen,
  onOpenChange,
  title,
  content,
  footer,
  locationData,
  sitesData,
  viewOnly,
}) {
  console.log(viewOnly);
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
              />
              <Select
                defaultSelectedKeys={[locationData.sitename]}
                isRequired
                isDisabled={!viewOnly}
                label="Choose a site"
                startContent={<FaLocationDot />}
                className="max-w-xs"
              >
                {sitesData.map((site) => (
                  <SelectItem key={site.sitename} value={site.sitename}>
                    {site.sitename}
                  </SelectItem>
                ))}
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              {viewOnly ? (
                <Button color="primary" onPress={onClose}>
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
