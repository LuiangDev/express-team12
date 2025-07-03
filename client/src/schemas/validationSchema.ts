import * as Yup from "yup";

export const validationSchema = Yup.object({
  type: Yup.string().required("Este campo es obligatorio"),
  tone: Yup.string().required("Este campo es obligatorio"),
  length: Yup.string().required("Este campo es obligatorio"),
  message: Yup.string().required("Este campo es obligatorio"),
});
