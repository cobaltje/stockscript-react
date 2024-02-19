import { Button, Chip, Divider, Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";
import { FaFileCirclePlus } from "react-icons/fa6";

const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "actions"];

export default function Products() {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "productname",
    direction: "ascending",
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-xl uppercase flex items-center gap-3">
          <span>Products</span>
          <Chip variant="flat" color="primary">
            8
          </Chip>
        </h1>
        <span>
          <Button
            color="primary"
            variant="flat"
            startContent={<FaFileCirclePlus />}
            onClick=""
          >
            Add Product
          </Button>
        </span>
      </div>
      <Divider className="mt-3 mb-3" orientation="horizontal" />
      <div className="flex w-full flex-col">
        <Tabs color="primary" aria-label="Options">
          <Tab key="photos" title="Products Overview">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Tab>
          <Tab key="music" title="Music">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </Tab>
          <Tab key="videos" title="Videos">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
