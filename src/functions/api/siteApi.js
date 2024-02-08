import { API_BASE_URL } from "../../Config";

export const getSites = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/site`);
    const result = await response.json();

    return result;
  } catch (error) {
    throw new Error("Error fetching data:", error);
  }
};

export const deleteSite = async (siteId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/site/${siteId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      return true;
    }
  } catch (error) {
    console.error("Error deleting the site:", error);
    throw new Error("Failed to delete the site");
  }
};
