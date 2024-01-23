import { useState, useEffect } from "react";
import LocationTable from "../components/tables/LocationTable";
import { API_BASE_URL } from "../Config";

export default function Locations() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/location`);
        const result = await response.json();

        setLocations(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Locations</h1>
      <LocationTable locations={locations} />
    </div>
  );
}
