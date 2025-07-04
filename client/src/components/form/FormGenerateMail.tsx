import { Formik, Form, Field, ErrorMessage } from "formik";
import { generateMail } from "../../services/appServices";
import { validationSchema } from "../../schemas/validationSchema";
import { useState } from "react";

export interface Payload {
  age: number | null;
  type: string;
  tone: string;
  length: string;
  message: string;
  name: string;
  country: string;
  email: string;
  occupation: string;
  interests: string;
}

export const FormGenerateMail = () => {
  const [mailResponse, setMailResponse] = useState<string | null>(null);

  const handleReset = (resetForm: () => void) => {
    resetForm();
    setMailResponse(null);
  };

  return (
    <Formik
      initialValues={{
        type: "",
        tone: "",
        length: "pequeño",
        message: "",
        name: " ",
        age: "",
        country: "",
        email: "",
        occupation: "",
        interests: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values /* , { resetForm } */) => {
        try {
          const payload = {
            ...values,
            age: values.age ? Number(values.age) : null,
          } as Payload;

          const response = await generateMail(payload);
          setMailResponse(response);
          /*   resetForm(); */
        } catch (error) {
          console.error("Error al generar el mail:", error);
        }
      }}
    >
      {({ resetForm }) => (
        <Form className="w-full max-w-4xl mx-auto bg-base-100 p-8 rounded-xl shadow-lg space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Columna izquierda */}
            <div className="flex flex-col gap-4">
              <fieldset className="flex flex-col">
                <legend className="label-text font-semibold mb-1">
                  Tipo de email
                </legend>
                <Field
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Profesional"
                  name="type"
                />
                {/*   <p className="label">Indica la intención</p> */}
                <ErrorMessage
                  name="type"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </fieldset>

              <fieldset className="flex flex-col">
                <legend className="label-text font-semibold mb-1">
                  Tono de email
                </legend>
                <Field
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Amigable y formal"
                  name="tone"
                />
                {/*     <p className="label">Indica el tono (Tecnico, casual, etc)</p> */}
                <ErrorMessage
                  name="tone"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </fieldset>

              <fieldset className="flex flex-col">
                <legend className="label-text font-semibold mb-1">
                  Tamaño del Email
                </legend>
                <Field
                  as="select"
                  className="select select-bordered w-full"
                  name="length"
                >
                  <option disabled={true} value="pequeño">
                    Selecciona tamaño
                  </option>
                  <option value="corto">Pequeño (50 palabras)</option>
                  <option value="medio">Mediano (100 palabras)</option>
                  <option value="largo">Largo (150 palabras)</option>
                </Field>
                <ErrorMessage
                  name="length"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </fieldset>

              <fieldset className="flex flex-col">
                <legend className="label-text font-semibold mb-1">
                  Nombre del destinatario
                </legend>
                <Field
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Juan Perez"
                  name="name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </fieldset>
            </div>

            {/* Columna derecha */}
            <div className="flex flex-col gap-4">
              <fieldset className="flex flex-col">
                <legend className="label-text font-semibold mb-1">
                  Edad del destinatario
                </legend>
                <Field
                  type="number"
                  className="input input-bordered w-full"
                  placeholder="23"
                  name="age"
                />
                <ErrorMessage
                  name="age"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </fieldset>

              <fieldset className="flex flex-col">
                <legend className="label-text font-semibold mb-1">
                  Correo electrónico
                </legend>
                <Field
                  type="email"
                  className="input input-bordered w-full"
                  placeholder="luis@example.com"
                  name="email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </fieldset>

              <fieldset className="flex flex-col">
                <legend className="label-text font-semibold mb-1">
                  Ocupación
                </legend>
                <Field
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Frontend Developer"
                  name="occupation"
                />
                <ErrorMessage
                  name="occupation"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </fieldset>

              <fieldset className="flex flex-col">
                <legend className="label-text font-semibold mb-1">
                  Intereses
                </legend>
                <Field
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="React"
                  name="interests"
                />
                <ErrorMessage
                  name="interests"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </fieldset>
            </div>

            {/* Área del mensaje o respuesta */}
            <div className="md:col-span-2">
              {!mailResponse && (
                <fieldset className="flex flex-col">
                  <legend className="label-text font-semibold mb-1">
                    ¿Qué quieres comunicar?
                  </legend>
                  <Field
                    as="textarea"
                    className="textarea textarea-bordered h-24 w-full"
                    placeholder="Mensaje"
                    name="message"
                  />
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </fieldset>
              )}

              {mailResponse && (
                <div className="flex flex-col space-y-3 md:col-span-1">
                  <fieldset className="flex flex-col">
                    <legend className="label-text font-semibold mb-1">
                      Respuesta del backend
                    </legend>
                    <div
                      id="response"
                      className="w-full border p-4 rounded bg-base-200 overflow-auto"
                    >
                      {mailResponse}
                    </div>
                  </fieldset>
                </div>
              )}
            </div>
          </div>

          {/* Botón */}
          <div className="text-center">
            <button
              className="btn btn-primary btn-wide flex items-center gap-2"
              type="submit"
              onClick={() => {
                if (mailResponse) {
                  handleReset(resetForm);
                }
              }}
            >
              {mailResponse ? (
                <>
                  Limpiar <span className="material-icons">refresh</span>
                </>
              ) : (
                <>
                  Generar <span className="material-icons">send</span>
                </>
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
