import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
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
      <CardHeader>
        <div className="flex flex-row gap-2">
          <Chip startContent={<FaLocationDot />} color="primary" variant="flat">
            First Floor
          </Chip>
          <Chip startContent={<FaMapLocation />} color="warning" variant="flat">
            Main building
          </Chip>
        </div>
      </CardHeader>
      <CardBody>
        <div className="flex mt-5  items-center space-x-4 text-3xl gap-20">
          <div className="flex flex-col gap-1">
            <Chip color="success" variant="flat">
              Minimum Stock: 3
            </Chip>
            <Chip color="warning" variant="flat">
              Maximum Stock: 7
            </Chip>
          </div>
          <div>
            <span className="text-center">8</span>
          </div>
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
