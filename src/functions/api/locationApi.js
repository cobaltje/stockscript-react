import { API_BASE_URL } from "../../Config";

export const getLocations = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/location`);
    const result = await response.json();

    return result;
  } catch (error) {
    throw new Error("Error fetching data:", error);
  }
};

export const deleteLocation = async (locationId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/location/${locationId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      return true;
    }
  } catch (error) {
    throw new Error("Failed to delete the site");
  }
};
