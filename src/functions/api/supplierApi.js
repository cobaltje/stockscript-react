// src/functions/api.js
import { API_BASE_URL } from "../../Config";

export const deleteSupplier = async (supplierId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/supplier/${supplierId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log("Supplier deleted successfully");
      return true;
    } else {
      console.error("Failed to delete the supplier");
      return false;
    }
  } catch (error) {
    console.error("Error deleting the supplier:", error);
    return false;
  }
};
