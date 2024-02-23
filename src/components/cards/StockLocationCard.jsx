import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Chip,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import {
  FaLocationDot,
  FaMapLocation,
  FaMinus,
  FaPlus,
  FaRegTrashCan,
} from "react-icons/fa6";

export default function StockLocationCard() {
  return (
    <Card className="mb-2 shadow-md">
      <CardBody>
        <div className="flex flex-row gap-2">
          <Chip startContent={<FaLocationDot />} color="primary" variant="flat">
            First Floor
          </Chip>
          <Chip startContent={<FaMapLocation />} color="warning" variant="flat">
            Main building
          </Chip>
        </div>
        <div className="flex mt-5 h-5 items-center space-x-4 text-xl justify-center">
          <span>8</span>
          <Divider orientation="vertical" />
          <span>4</span>
          <Divider orientation="vertical" />
          <span>2</span>
        </div>
      </CardBody>
      <CardFooter className="flex justify-end">
        <Dropdown>
          <DropdownTrigger>
            <Button color="primary" size="sm" variant="flat">
              Actions
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownSection>
              <DropdownItem startContent={<FaPlus />} key="new">
                Add stock
              </DropdownItem>
              <DropdownItem startContent={<FaMinus />} key="copy">
                Remove stock
              </DropdownItem>
            </DropdownSection>
            <DropdownSection title="Danger zone">
              <DropdownItem
                startContent={<FaRegTrashCan />}
                key="delete"
                className="text-danger"
                color="danger"
              >
                Delete stocklocation
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </CardFooter>
    </Card>
  );
}
