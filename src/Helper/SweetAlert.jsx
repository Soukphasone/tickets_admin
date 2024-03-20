// SweetAlert.js
import Swal from "sweetalert2";

export const showErrorAlert = (message) => {
  Swal.fire({
    title: "Error!",
    text: message,
    icon: "error",
    showConfirmButton: false,
    timer: 1500,
  });
};

export const showSuccessAlert = (message) => {
  Swal.fire({
    title: "Success!",
    text: message,
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
  });
};

export const showConfirmationAlert = (onConfirm) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: `Yes, delete it!`,
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });
};
