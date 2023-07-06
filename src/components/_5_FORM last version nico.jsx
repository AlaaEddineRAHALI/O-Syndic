import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
const SelectedCity = (props) => {
  const {
    values: { code },
    setFieldValue,
  } = useFormikContext();
  const [cities, setCities] = useState([]);
  useEffect(() => {
    const apiUrl = "https://geo.api.gouv.fr/communes?codePostal=";
    const fetchData = async () => {
      try {
        const response = await Axios.get(apiUrl + code);
        const results = response.data;
        if (results.length) {
          setCities(results);
          setFieldValue(props.name, results[0].nom);
        } else {
          setCities([code]);
        }
      } catch (error) {
        setCities([]);
      }
    };
    fetchData();
  }, [code, setFieldValue, props.name]);
  return (
    <>
      {cities && cities.length > 0 && (
        <Field
          as="select"
          name="selectedCity"
          className="p-3 w-full rounded-md text-black mb-3"
          value={props.value}
          onChange={() => {
            const selectedCity = event.target.value;
            setFieldValue(props.name, selectedCity);
          }}
        >
          <option defaultValue>Saissisez votre Ville</option>
          {cities.map((city, index) => (
            <option key={index} value={city.nom}>
              {city.nom}
            </option>
          ))}
        </Field>
      )}
    </>
  );
};
function FormNews() {
  return (
    <div
      className="w-full py-16 text-white px-5 sm:px-16  bg-primary"
      id="form"
    >
      <Formik
        initialValues={{
          name: "",
          lastName: "",
          email: "",
          code: "",
          nom: "",
        }}
        onSubmit={(values, { resetForm, setStatus }) => {
          if (values.nom !== "") {
            // URL API
            const apiUrl = import.meta.env.VITE_APP_API_URL;
            // Fetch post data
            Axios.post(`${apiUrl}/api/post/create`, values)
              .then((response) => {
                setStatus(response.status);
                resetForm();
                setStatus({ sent: true, message: "Message envoyé !" });
              })
              .catch((error) => {
                resetForm();
                setStatus({ sent: false, message: `Oups ! ${error}` });
              });
            console.log("values", values);
          }
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(2, "Too Short!")
            .max(5, "Too Long!")
            .required('Merci de saisir votre nom"'),
          lastName: Yup.string()
            .min(2, "Too Short!")
            .max(5, "Too Long!")
            .required('Merci de saisir votre prénom"'),
          email: Yup.string()
            .email("Adresse mail est invalide")
            .required("Votre adresse mail est requise"),
          code: Yup.string()
            .required("Le code postal est la ville sont requise")
            .length(5, "Le code postal doit contenir exactement 5 chiffres")
            .matches(/^(([1-95]{2}|2A|2B)[0-9]{3})$|^[971-974]$/, {
              message: "Aucune commune avec ce code postal",
            }),
        })}
      >
        {({ handleSubmit, handleBlur }) => (
          <Form
            onSubmit={handleSubmit}
            className="flex flex-col  items-center justify-between w-full "
          >
            <Field
              name="name"
              className="p-3 w-full rounded-md text-black mb-4"
              placeholder="Saissisez votre prénom"
            />
            <div className="text-red-700 mt-[-12px] inputs-error w-full text-center m-2 ">
              <ErrorMessage name="name" />
            </div>
            <Field
              name="lastName"
              className="p-3 w-full rounded-md text-black mb-4"
              placeholder="Saissisez votre nom"
            />
            <div className="text-red-700 mt-[-12px] inputs-error w-full text-center m-2 ">
              <ErrorMessage name="lastName" />
            </div>
            <Field
              name="email"
              className="p-3  w-full rounded-md text-black mb-4"
              placeholder="Saissisez votre adresse mail"
            />
            <div className="text-red-700 mt-[-12px] inputs-error w-full text-center m-2">
              <ErrorMessage name="email" />
            </div>
            <Field
              name="code"
              onBlur={handleBlur}
              className="p-3 w-full rounded-md text-black mb-3"
              placeholder="Code Postal"
            />
            <div className="text-red-700 mt-[-9px] inputs-error w-full text-center m-2">
              <ErrorMessage name="code" />
            </div>
            <SelectedCity
              name="nom"
              className="p-3 w-full rounded-md text-black mb-3"
            />
            <button
              type="submit"
              className="bg-secondary text-white rounded-md font-medium w-full px-6 py-3 cursor-pointer hover:bg-slate-400"
            >
              Subscribe
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default FormNews;
