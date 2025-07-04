import { Formik, Form, Field, ErrorMessage } from "formik";
import { createProfile } from "../../services/appServices";
import Swal from "sweetalert2";

export interface ProfilePayload {
  name: string;
  mission: string;
  tone: string;
  story: string;
  products: string;
  values: string;
  faqs: string;
  email_examples: string;
}

export const FormProfile = () => {
  return (
    <Formik
      initialValues={{
        name: "",
        mission: "",
        tone: "",
        story: "",
        products: "",
        values: "",
        faqs: "",
        email_examples: "",
      }}
      onSubmit={async (values) => {
        try {
          console.log(values);
          await createProfile(values);
          Swal.fire({
            icon: "success",
            title: "Perfil creado exitosamente",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        } catch (error) {
          console.error("Error al crear el perfil:", error);
        }
      }}
    >
      {() => (
        <Form className="w-full max-w-4xl mx-auto border p-8 rounded-xl shadow-lg space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <fieldset className="flex flex-col">
              <legend className="label-text font-semibold mb-1">Nombre</legend>
              <Field
                type="text"
                className="input input-bordered w-full"
                name="name"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </fieldset>

            <fieldset className="flex flex-col">
              <legend className="label-text font-semibold mb-1">Tono</legend>
              <Field
                type="text"
                className="input input-bordered w-full"
                name="tone"
              />
              <ErrorMessage
                name="tone"
                component="div"
                className="text-red-500 text-sm"
              />
            </fieldset>
          </div>

          <div className="flex flex-col gap-4">
            <fieldset className="flex flex-col">
              <legend className="label-text font-semibold mb-1">Misión</legend>
              <Field
                as="textarea"
                className="textarea textarea-bordered w-full"
                name="mission"
              />
              <ErrorMessage
                name="mission"
                component="div"
                className="text-red-500 text-sm"
              />
            </fieldset>

            <fieldset className="flex flex-col">
              <legend className="label-text font-semibold mb-1">
                Historia
              </legend>
              <Field
                as="textarea"
                className="textarea textarea-bordered w-full"
                name="story"
              />
              <ErrorMessage
                name="story"
                component="div"
                className="text-red-500 text-sm"
              />
            </fieldset>

            <fieldset className="flex flex-col">
              <legend className="label-text font-semibold mb-1">
                Productos
              </legend>
              <Field
                as="textarea"
                className="textarea textarea-bordered w-full"
                name="products"
              />
              <ErrorMessage
                name="products"
                component="div"
                className="text-red-500 text-sm"
              />
            </fieldset>

            <fieldset className="flex flex-col">
              <legend className="label-text font-semibold mb-1">Valores</legend>
              <Field
                as="textarea"
                className="textarea textarea-bordered w-full"
                name="values"
              />
              <ErrorMessage
                name="values"
                component="div"
                className="text-red-500 text-sm"
              />
            </fieldset>

            <fieldset className="flex flex-col">
              <legend className="label-text font-semibold mb-1">FAQs</legend>
              <Field
                as="textarea"
                className="textarea textarea-bordered w-full"
                name="faqs"
              />
              <ErrorMessage
                name="faqs"
                component="div"
                className="text-red-500 text-sm"
              />
            </fieldset>

            <fieldset className="flex flex-col">
              <legend className="label-text font-semibold mb-1">
                Ejemplos de email
              </legend>
              <Field
                as="textarea"
                className="textarea textarea-bordered w-full"
                name="email_examples"
              />
              <ErrorMessage
                name="email_examples"
                component="div"
                className="text-red-500 text-sm"
              />
            </fieldset>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="btn bg-[var(--color-quinary)] rounded-2xl text-primary px-8"
            >
              Generar Perfil
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
