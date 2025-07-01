import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchema } from "../../schemas/validationSchema";

export const FormGenerateMail = () => (
  <Formik
    initialValues={{
      type: "",
      tone: "",
      length: "pequeño",
      message: "",
    }}
    validationSchema={validationSchema}
    onSubmit={(values, { resetForm }) => {
      console.log(values);
      resetForm();
    }}
  >
    {() => (
      <Form className="flex flex-col items-center space-y-3 w-full">
        {" "}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Tipo de email</legend>
          <Field
            type="text"
            className="input w-80"
            placeholder="ingresar"
            name="type"
          />
          <p className="label">
            Indica la intención (prospectar, vender, informar, etc)
          </p>
          <ErrorMessage
            name="type"
            component="div"
            className="text-red-500 text-sm"
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Tono de email</legend>
          <Field
            type="text"
            className="input w-80"
            placeholder="ingresar"
            name="tone"
          />
          <p className="label">Indica el tono (Tecnico, casual, etc)</p>
          <ErrorMessage
            name="tone"
            component="div"
            className="text-red-500 text-sm"
          />
        </fieldset>
        <Field as="select" className="select w-80" name="length">
          <option disabled={true} value="pequeño">
            Longitud del mensaje
          </option>
          <option value="pequeño">Pequeño (50 palabras)</option>
          <option value="medio">Mediano (100 palabras)</option>
          <option value="largo">Largo (150 palabras)</option>
        </Field>
        <ErrorMessage
          name="length"
          component="div"
          className="text-red-500 text-sm"
        />
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Mensaje</legend>
          <Field
            as="textarea"
            className="textarea h-24 w-80"
            placeholder="Mensaje"
            name="message"
          />
          <div className="label">Que quieres comunicar</div>
          <ErrorMessage
            name="message"
            component="div"
            className="text-red-500 text-sm"
          />
        </fieldset>
        <button className="btn btn-wide" type="submit">
          Generar
        </button>
      </Form>
    )}
  </Formik>
);
