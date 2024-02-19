import { API_BASE_URL } from "../../Config";

// Get all the products
export const getProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/product`);
    const result = await response.json();

    return result;
  } catch (error) {
    throw new Error("Error fetching data:", error);
  }
};

// Delete a product
export const deleteProduct = async (productId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/product/${productId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      return true;
    }
  } catch (error) {
    throw new Error("Failed to delete the product");
  }
};

// Create a product
export const createProduct = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/product`, {
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

// Update a product
export const updateProduct = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/product/${formData.id}`, {
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
    throw new Error(`Error updating product: ${error.message}`);
  }
};
