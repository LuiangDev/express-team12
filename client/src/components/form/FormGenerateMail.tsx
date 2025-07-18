import { Formik, Form, Field, ErrorMessage } from "formik";
import { generateWelcomeEmail } from "../../services/appServices";
import { validationSchema } from "../../schemas/validationSchema";
import { IoSparkles } from "react-icons/io5";
import { FaCopy, FaSpinner } from "react-icons/fa";
import { MdCleaningServices } from "react-icons/md";
import { useState } from "react";
import { copyToClipboard } from "../../helpers/copyToCliboard";

export interface Payload {
  tone: string;
  length: string;
  message: string;
  name: string;
  country: string;
  occupation: string;
  interests: string[];
}

export const FormGenerateMail = () => {
  const [mailResponse, setMailResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
          setIsLoading(true);
          const payload = {
            tone: values.tone,
            length: values.length,
            message: values.message,
            name: values.name,
            country: values.country,
            occupation: values.occupation,
            interests: values.interests
              .split(",")
              .map((interest) => interest.trim())
              .filter((i) => i !== ""),
          } as Payload;

          const profileId = localStorage.getItem("profileId");

          if (!profileId) {
            throw new Error("No se encontró el ID del perfil en localStorage.");
          }

          const response = await generateWelcomeEmail(profileId, payload);
          setMailResponse(response.email_content);

          //   resetForm()
        } catch (error) {
          console.error("Error al generar el mail:", error);
        } finally {
          setIsLoading(false);
        }
      }}
    >
      {({ resetForm }) => (
        <Form className="w-full max-w-4xl mx-auto border-1 p-8 rounded-xl shadow-lg space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {/* Columna izquierda */}
            <div className="flex flex-col gap-4">
              <fieldset className="flex flex-col">
                <legend className="label-text font-semibold mb-1">
                  Tipo de email
                </legend>
                <Field
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Solicitud de información, seguimiento, etc."
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
                  Tono del email
                </legend>
                <Field
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Formal, casual, técnico, etc."
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
                  Longitud del mensaje
                </legend>
                <Field
                  as="select"
                  className="select select-bordered w-full"
                  name="length"
                >
                  <option disabled={true} value="pequeño">
                    Seleccionar tamaño
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
                  placeholder="Ejemplo: 30"
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
                  placeholder="user@example.com"
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
                  placeholder="Ejemplo: Frontend Developer"
                  name="occupation"
                />
                <ErrorMessage
                  name="occupation"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </fieldset>

              <fieldset className="flex flex-col">
                <legend className="label-text font-semibold mb-1">País</legend>
                <Field
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Ejemplo: Perú"
                  name="country"
                />
                <ErrorMessage
                  name="country"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </fieldset>
            </div>
            <div className="md:col-span-2">
              <fieldset className="flex flex-col">
                <legend className="label-text font-semibold mb-1">
                  Intereses
                </legend>
                <Field
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Ejemplo: tecnología, deportes, música"
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
                      Correo generado. Puedes copiarlo, editarlo o ajustarlo
                      según tus necesidades.
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
          {mailResponse ? (
            <div className="flex justify-between items-center mt-10 mb-4 w-full max-w-xs mx-auto">
              <button
                type="button"
                onClick={() => copyToClipboard(mailResponse || "")}
                className="btn bg-gradient-custom text-white rounded-2xl px-8 flex items-center gap-2"
              >
                <FaCopy className="ml-2" />
                Copiar
              </button>

              <button
                className="btn bg-[var(--color-quinary)] rounded-2xl text-primary btn-md px-8 flex items-center gap-2"
                type="submit"
                onClick={() => handleReset(resetForm)}
              >
                <MdCleaningServices className="ml-2 text-primary" />
                Limpiar
              </button>
            </div>
          ) : (
            <div className="text-center mt-10 mb-4 flex justify-center">
              <button
                type="submit"
                aria-disabled={isLoading}
                className={`btn bg-[var(--color-quinary)] rounded-2xl text-primary btn-md px-8 flex items-center gap-2 ${
                  isLoading ? "pointer-events-none opacity-100 cursor-wait" : ""
                }`}
              >
                {isLoading ? (
                  <>
                    Generando...
                    <FaSpinner className="ml-2 text-primary animate-spin" />
                  </>
                ) : (
                  <>
                    Generar <IoSparkles className="ml-2 text-primary" />
                  </>
                )}
              </button>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};
