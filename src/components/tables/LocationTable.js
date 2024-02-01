import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import {
  FaRegTrashCan,
  FaPencil,
  FaEye,
  FaCircle,
  FaEllipsisVertical,
} from "react-icons/fa6";
import ColorDecider from "../ColorDecider";

export default function LocationTable({
  locations,
  sites,
  onEditClick,
  onDeleteClick,
}) {
  const handleOnClick = (location, view) => {
    onEditClick(location, view);
  };

  return (
    <Table isStriped aria-label="location table">
      <TableHeader>
        <TableColumn>ID</TableColumn>
        <TableColumn>LOCATION</TableColumn>
        <TableColumn>SITE</TableColumn>
        <TableColumn className="text-right">ACTIONS</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No locations found."}>
        {locations.map((location) => (
          <TableRow key={location.id}>
            <TableCell>
              <Chip color="default" variant="flat">
                {location.id}
              </Chip>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <FaCircle style={{ color: location.color_code }} />
                <span>{location.locationname}</span>
              </div>
            </TableCell>
            <TableCell>
              <Chip
                size="sm"
                variant="solid"
                style={{
                  backgroundColor: `${location.site_color_code}`,
                  color: ColorDecider(location.site_color_code),
                }}
              >
                {location.sitename}
              </Chip>
            </TableCell>
            <TableCell className="text-right">
              <Dropdown>
                <DropdownTrigger>
                  <Button size="sm" isIconOnly variant="flat">
                    <FaEllipsisVertical />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu variant="flat">
                  <DropdownItem
                    description={`View the details of this location.`}
                    startContent={<FaEye />}
                    onClick={() => handleOnClick(location, "view")}
                    color="default"
                  >
                    View {location.locationname}
                  </DropdownItem>
                  <DropdownItem
                    description={`Edit the details of this location.`}
                    startContent={<FaPencil />}
                    onClick={() => handleOnClick(location)}
                    color="primary"
                  >
                    Edit {location.locationname}
                  </DropdownItem>
                  <DropdownItem
                    description={`Delete this location.`}
                    startContent={<FaRegTrashCan />}
                    onClick={() =>
                      onDeleteClick(location.id, location.locationname)
                    }
                    color="danger"
                    className="text-danger"
                  >
                    Delete {location.locationname}
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              {/* <Button
                isIconOnly
                size="sm"
                color="default"
                variant="flat"
                className="mr-2"
                onClick={() => handleOnClick(location, "view")}
              >
                <FaEye />
              </Button>
              <Button
                isIconOnly
                size="sm"
                color="primary"
                variant="flat"
                className="mr-2"
                onClick={() => handleOnClick(location)}
              >
                <FaPencil />
              </Button>
              <Button isIconOnly size="sm" color="danger" variant="flat">
                <FaRegTrashCan />
              </Button> */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
