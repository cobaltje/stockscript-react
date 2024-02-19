import { API_BASE_URL } from "../../Config";

// Get all the brands
export const getBrands = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/brand`);
    const result = await response.json();

    return result;
  } catch (error) {
    throw new Error("Error fetching data:", error);
  }
};

// Delete a brand
export const deleteBrand = async (brandId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/brand/${brandId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      return true;
    }
  } catch (error) {
    throw new Error("Failed to delete the brand");
  }
};

// Create a brand
export const createBrand = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/brand`, {
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
export const updateBrand = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/brand/${formData.id}`, {
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
    throw new Error(`Error updating brand: ${error.message}`);
  }
};
