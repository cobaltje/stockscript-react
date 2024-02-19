import { API_BASE_URL } from "../../Config";

// Get all the locations
export const getLocations = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/location`);
    const result = await response.json();

    return result;
  } catch (error) {
    throw new Error("Error fetching data:", error);
  }
};

// Delete a location
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

// Create a location
export const createLocation = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/location`, {
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

// Update a location
export const updateLocation = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/location/${formData.id}`, {
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
    throw new Error(`Error updating location: ${error.message}`);
  }
};
