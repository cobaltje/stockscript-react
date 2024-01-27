import { useState, useEffect } from "react";
import LocationTable from "../components/tables/LocationTable";
import { API_BASE_URL } from "../Config";
import SiteTable from "../components/tables/SiteTable";
import { Button, Divider, useDisclosure } from "@nextui-org/react";
import { FaMapLocation, FaLocationDot } from "react-icons/fa6";
import { toast } from "react-toastify";
import SiteModal from "../components/modals/sites/SiteModal";
import LocationModal from "../components/modals/sites/LocationModal";
import AddSiteModal from "../components/modals/sites/AddSiteModal";

export default function SitesAndLocations() {
  const [locations, setLocations] = useState([]);
  const [sites, setSites] = useState([]);
  const [modalType, setModalType] = useState(null);
  const [siteData, setSiteData] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [viewOnly, setViewOnly] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const notify = () =>
    toast.success("Wow so easy !", { position: "bottom-right" });

  useEffect(() => {
    // Locations
    const fetchDataLocations = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/location`);
        const result = await response.json();

        setLocations(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Sites
    const fetchDataSites = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/site`);
        const result = await response.json();

        setSites(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataLocations();
    fetchDataSites();
  }, []);

  const openAddSiteModal = () => {
    setModalType("addSite");
    onOpen();
  };

  const openEditSiteModal = (site) => {
    setModalType("editSite");
    setSiteData(site);
    onOpen();
  };

  const openAddLocationModal = () => {
    setModalType("addLocation");
    onOpen();
  };

  const openEditLocationModal = (location, view) => {
    setModalType("editLocation");
    setLocationData(location);
    console.log(view);
    setViewOnly(view === "view" ? false : true);
    onOpen();
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <div className="flex items-center justify-between">
            <h1 className="text-xl uppercase">Sites</h1>

            <Button
              color="primary"
              variant="flat"
              startContent={<FaMapLocation />}
              onClick={() => openAddSiteModal()}
            >
              Add Site
            </Button>
          </div>
          <Divider className="mt-3 mb-3" orientation="horizontal" />
          <SiteTable sites={sites} onEditClick={openEditSiteModal} />
        </div>
        <div className="w-full md:w-2/3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl uppercase">Locations</h1>
            <Button
              color="primary"
              variant="flat"
              startContent={<FaLocationDot />}
              onClick={() => openAddLocationModal()}
            >
              Add Location
            </Button>
          </div>
          <Divider className="mt-3 mb-3" orientation="horizontal" />
          <LocationTable
            locations={locations}
            onEditClick={openEditLocationModal}
          />
        </div>
      </div>
      {modalType === "editSite" && (
        <SiteModal
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          title="Edit Site"
          content="content tekst"
          footer="footer"
          siteData={siteData}
        />
      )}

      {modalType === "addSite" && (
        <AddSiteModal
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          title="Add new site"
          content="content tekst"
          footer="footer"
        />
      )}

      {modalType === "editLocation" && (
        <LocationModal
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          title="Add new location"
          content="content tekst"
          footer="footer"
          locationData={locationData}
          sitesData={sites}
          viewOnly={viewOnly}
        />
      )}

      {modalType === "addLocation" && (
        <AddSiteModal
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          title="Add new location"
          content="content tekst"
          footer="footer"
        />
      )}
    </>
  );
}
