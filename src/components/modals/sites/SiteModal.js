import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { FaMapLocation, FaKey } from "react-icons/fa6";

export default function SiteModal({
  isOpen,
  onOpenChange,
  title,
  content,
  footer,
  siteData,
}) {
  console.log(siteData);
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
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
