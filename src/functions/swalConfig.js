// src/functions/swalConfig.js
import Swal from "sweetalert2";

const defaultSwalConfig = {
  icon: "warning",
  showCancelButton: true,
  cancelButtonColor: "#d33",
  confirmButtonColor: "#3085d6",
  reverseButtons: true,
};

export const showDeleteConfirmation = async (itemName, customOptions = {}) => {
  const swalConfig = {
    ...defaultSwalConfig,
    title: `Delete ${itemName} ?`,
    text: "There is no way back after this!",
    confirmButtonText: "Yes, delete it!",
    ...customOptions, // Merge with custom options
  };

  return await Swal.fire(swalConfig);
};
