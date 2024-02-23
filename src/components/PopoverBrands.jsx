import {
  Button,
  Chip,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useState } from "react";

export default function PopoverBrand({
  brand,
  selectedBrand,
  setSelectedBrand,
  handleDeleteBrand,
  handleUpdate,
}) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <Popover
      key={brand.id}
      placement="bottom"
      backdrop="opaque"
      offset={10}
      isOpen={isPopoverOpen}
      onOpenChange={() => {
        setIsPopoverOpen(true);
      }}
      onClose={() => setIsPopoverOpen(false)}
      showArrow
    >
      <PopoverTrigger>
        <Chip
          onClose={() => handleDeleteBrand(brand.id, brand.brandname)}
          variant="shadow"
          color="primary"
        >
          <span
            onClick={() => {
              setSelectedBrand({
                id: brand.id,
                brandname: brand.brandname,
              });

              setIsPopoverOpen(true);
            }}
          >
            {brand.brandname}
          </span>
        </Chip>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex items-center gap-2">
          <Input
            size="sm"
            value={selectedBrand.brandname}
            onChange={(e) =>
              setSelectedBrand({
                ...selectedBrand,
                brandname: e.target.value,
              })
            }
          />
          <Button
            size="sm"
            color="primary"
            onClick={() => {
              handleUpdate();
              setIsPopoverOpen(false);
            }}
          >
            Save
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
