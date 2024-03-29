import { API_BASE_URL } from "../../Config";

// Get all the sites
export const getSites = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/site`);
    const result = await response.json();

    return result;
  } catch (error) {
    throw new Error("Error fetching data:", error);
  }
};

// Delete a site
export const deleteSite = async (siteId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/site/${siteId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      return true;
    } else {
      throw new Error("Failed to delete the site");
    }
  } catch (error) {
    console.error("Error deleting the site:", error);
    throw Error;
  }
};

// Create a site
export const createSite = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/site`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok) {
      return true;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    throw Error(error);
  }
};

// Update a site
export const updateSite = async (formData) => {
  try {
    // Make an HTTP request to update the data
    const response = await fetch(`${API_BASE_URL}/site/${formData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok) {
      return true;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    throw new Error(`Error updating site: ${error.message}`);
  }
};
