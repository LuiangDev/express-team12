import Swal from "sweetalert2";

export const copyToClipboard = (text: string) => {
  if (!text) return;

  navigator.clipboard
    .writeText(text)
    .then(() => {
      Swal.fire({
        icon: "success",
        title: "Texto copiado al portapapeles",
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    })
    .catch((err) => {
      console.error("Error al copiar el texto: ", err);
    });
};
