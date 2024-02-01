import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Link,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Divider,
  CardFooter,
  Tooltip,
} from "@nextui-org/react";
import {
  FaRegTrashCan,
  FaPencil,
  FaEye,
  FaEllipsisVertical,
  FaUser,
  FaEnvelope,
  FaGlobe,
} from "react-icons/fa6";

export default function SupplierCard({ supplier, onDeleteClick }) {
  const noImage =
    "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg";

  return (
    <Card className="">
      <div className="image-container">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={supplier.image_url ? supplier.image_url : noImage}
          width={250}
          height={150}
          isZoomed
        />
      </div>
      <CardHeader className="pb-0 pt-2 px-4 flex-row justify-between  ">
        <p className=" uppercase font-bold">{supplier.suppliername}</p>

        <Dropdown>
          <DropdownTrigger>
            <Button size="sm" isIconOnly variant="flat">
              <FaEllipsisVertical />
            </Button>
          </DropdownTrigger>
          <DropdownMenu variant="flat">
            <DropdownItem
              description={`View the details of this supplier.`}
              startContent={<FaEye />}
              color="default"
            >
              View {supplier.suppliername}
            </DropdownItem>
            <DropdownItem
              description={`Edit the details of this supplier.`}
              startContent={<FaPencil />}
              color="primary"
            >
              Edit {supplier.suppliername}
            </DropdownItem>
            <DropdownItem
              description={`Delete this supplier.`}
              startContent={<FaRegTrashCan />}
              color="danger"
              className="text-danger"
              onClick={() => onDeleteClick(supplier.id, supplier.suppliername)}
            >
              Delete {supplier.suppliername}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardHeader>

      <CardBody className="overflow-visible py-2">
        <Divider className="mt-3 mb-3" orientation="horizontal" />
        <span className="flex items-center gap-2">
          <FaUser /> {supplier.contact}
        </span>
      </CardBody>
      <CardFooter className="justify-end">
        <small className="text-default-500 flex gap-1">
          {supplier.contact_email && (
            <Tooltip showArrow color="primary" content={supplier.contact_email}>
              <Link isExternal href={"mailto:" + supplier.contact_email}>
                <Button
                  size="sm"
                  variant="flat"
                  color="primary"
                  startContent={<FaEnvelope />}
                >
                  Contact
                </Button>
              </Link>
            </Tooltip>
          )}
          {supplier.website && (
            <Tooltip showArrow color="primary" content={supplier.website}>
              <Link isExternal href={supplier.website}>
                <Button
                  size="sm"
                  variant="flat"
                  color={supplier.website ? "primary" : "default"}
                  startContent={<FaGlobe />}
                >
                  {supplier.website ? "Visit website" : "No website"}
                </Button>
              </Link>
            </Tooltip>
          )}
        </small>
      </CardFooter>
    </Card>
  );
}
