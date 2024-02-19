import { useState, useEffect } from "react";
import LocationTable from "../components/tables/LocationTable";
import SiteTable from "../components/tables/SiteTable";
import { Button, Divider, useDisclosure, Chip } from "@nextui-org/react";
import { FaMapLocation, FaLocationDot } from "react-icons/fa6";
import { toast } from "react-toastify";
import SiteModal from "../components/modals/sites/SiteModal";
import LocationModal from "../components/modals/locations/LocationModal";
import AddSiteModal from "../components/modals/sites/AddSiteModal";
import AddLocationModal from "../components/modals/locations/AddLocationModal";
import { deleteSite, getSites } from "../functions/api/siteApi";
import { deleteLocation, getLocations } from "../functions/api/locationApi";
import { showDeleteConfirmation } from "../functions/swalConfig";

export default function SitesAndLocations() {
  const [locations, setLocations] = useState([]);
  const [sites, setSites] = useState([]);
  const [modalType, setModalType] = useState(null);
  const [siteData, setSiteData] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [viewOnly, setViewOnly] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const fetchDataLocations = async () => {
    try {
      const result = await getLocations();
      setLocations(result);
    } catch (error) {
      console.error(error);
      toast.error("Unable to get the locations from the database!");
    }
  };

  const fetchDataSites = async () => {
    try {
      const result = await getSites();
      setSites(result);
    } catch (error) {
      console.error(error);
      toast.error("Unable to get the sites from the database!");
    }
  };

  useEffect(() => {
    fetchDataLocations();
    fetchDataSites();
  }, []);

  const handleDeleteSite = async (siteId, siteName) => {
    const result = await showDeleteConfirmation(siteName);
    if (result.isConfirmed) {
      try {
        const result = await deleteSite(siteId);
        if (result) {
          // Successfully deleted the site
          fetchDataSites();
          fetchDataLocations();
          toast.success(`${siteName} succesfully deleted!`);
        }
      } catch (error) {
        toast.error(`Unable to delete ${siteName}!`);
      }
    }
  };

  const handleDeleteLocation = async (locationId, locationName) => {
    const result = await showDeleteConfirmation(locationName);
    if (result.isConfirmed) {
      try {
        const result = await deleteLocation(locationId);
        if (result) {
          // Successfully deleted the site
          fetchDataSites();
          fetchDataLocations();
          toast.success(`${locationName} succesfully deleted!`);
        }
      } catch (error) {
        toast.error(`Unable to delete ${locationName}!`);
      }
    }
  };

  const openModal = (type, data, view) => {
    setModalType(type);
    if (type === "editSite" && data) {
      setSiteData(data);
    } else if (type === "editLocation" && data) {
      setLocationData(data);
    }
    setViewOnly(view === "view" ? false : true);
    onOpen();
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <div className="flex items-center justify-between">
            <h1 className="text-xl uppercase flex items-center gap-3">
              <span>Sites</span>
              <Chip variant="flat" color="primary">
                {sites.length}
              </Chip>
            </h1>

            <Button
              color="primary"
              variant="flat"
              startContent={<FaMapLocation />}
              onClick={() => openModal("addSite")}
            >
              Add Site
            </Button>
          </div>
          <Divider className="mt-3 mb-3" orientation="horizontal" />
          <SiteTable
            sites={sites}
            onEditClick={openModal}
            onDeleteClick={handleDeleteSite}
          />
        </div>
        <div className="w-full md:w-2/3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl uppercase flex items-center gap-3">
              <span>Locations</span>
              <Chip variant="flat" color="primary">
                {locations.length}
              </Chip>
            </h1>
            <Button
              color="primary"
              variant="flat"
              startContent={<FaLocationDot />}
              onClick={() => openModal("addLocation")}
            >
              Add Location
            </Button>
          </div>
          <Divider className="mt-3 mb-3" orientation="horizontal" />
          <LocationTable
            locations={locations}
            onEditClick={openModal}
            onDeleteClick={handleDeleteLocation}
          />
        </div>
      </div>
      {modalType === "editSite" && (
        <SiteModal
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          title="Edit Site"
          siteData={siteData}
          fetchDataLocations={fetchDataLocations}
          fetchDataSites={fetchDataSites}
          viewOnly={viewOnly}
        />
      )}

      {modalType === "addSite" && (
        <AddSiteModal
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          title="Add new site"
          fetchDataLocations={fetchDataLocations}
          fetchDataSites={fetchDataSites}
        />
      )}

      {modalType === "editLocation" && (
        <LocationModal
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          title="Add new location"
          locationData={locationData}
          sitesData={sites}
          fetchDataLocations={fetchDataLocations}
          fetchDataSites={fetchDataSites}
          viewOnly={viewOnly}
        />
      )}

      {modalType === "addLocation" && (
        <AddLocationModal
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          title="Add new location"
          sitesData={sites}
          fetchDataLocations={fetchDataLocations}
          fetchDataSites={fetchDataSites}
        />
      )}
    </>
  );
}
