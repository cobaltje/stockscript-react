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
  FaEllipsisVertical,
  FaCircle,
} from "react-icons/fa6";

export default function SiteTable({ sites, onEditClick, onDeleteClick }) {
  const handleOnClick = (site, view) => {
    onEditClick("editSite", site, view);
  };

  return (
    <Table isStriped aria-label="location table">
      <TableHeader>
        <TableColumn>ID</TableColumn>
        <TableColumn>SITE</TableColumn>
        <TableColumn>ACTIONS</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No sites found."}>
        {sites.map((site) => (
          <TableRow key={site.id}>
            <TableCell>
              <Chip color="default" variant="flat">
                {site.id}
              </Chip>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <FaCircle style={{ color: site.color_code }} />
                <span> {site.sitename}</span>
              </div>
            </TableCell>
            <TableCell className="text-right">
              <Dropdown showArrow placement="bottom-end">
                <DropdownTrigger>
                  <Button size="sm" isIconOnly variant="flat">
                    <FaEllipsisVertical />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Dropdown menu for sites"
                  variant="flat"
                >
                  <DropdownItem
                    description={`View the details of this site.`}
                    startContent={<FaEye />}
                    onClick={() => handleOnClick(site, "view")}
                    color="default"
                    textValue={`View ${site.sitename}`}
                  >
                    View {site.sitename}
                  </DropdownItem>
                  <DropdownItem
                    description={`Edit the details of this site.`}
                    startContent={<FaPencil />}
                    onClick={() => handleOnClick(site)}
                    color="primary"
                    textValue={`Edit ${site.sitename}`}
                  >
                    Edit {site.sitename}
                  </DropdownItem>
                  <DropdownItem
                    description={`Delete this site.`}
                    startContent={<FaRegTrashCan />}
                    onClick={() => onDeleteClick(site.id, site.sitename)}
                    color="danger"
                    className="text-danger"
                    textValue={`Delete ${site.sitename}`}
                  >
                    Delete {site.sitename}
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
