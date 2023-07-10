/* eslint-disable no-undef */
/* eslint-disable no-useless-escape */
import React from "react";
import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import Axios from "axios";

// Use context to manage the name of the city.
const MyField = (props) => {
  const {
    values: { code },
    setFieldValue,
  } = useFormikContext();
  //state to manage  cities:
  const [cities, setCities] = useState([]);
  //state to manage CodeValid:
  const [isCodeValid, setIsCodeValid] = useState(false);
  //hooks to refresh the page:
  useEffect(() => {
    //API zipcode with city from gouv.fr:
    const apiUrl = "https://geo.api.gouv.fr/communes?codePostal=";
    const fetchData = async () => {
      try {
        const response = await Axios.get(apiUrl + code);
        const results = response.data;

        if (results.length) {
          setCities(results);
          setFieldValue(props.name, results[0].nom);
          setIsCodeValid(false);
        } else {
          setCities([]);
          setFieldValue(props.name, "");
          setIsCodeValid(true);
        }
      } catch (error) {
        setCities([]);
        setFieldValue(props.name, "");
        setIsCodeValid(true);
      }
    };

    if (code.length === 5) {
      fetchData();
    }
  }, [code, props.name, setFieldValue]);

  return (
    <>
      {code.length === 5 && !isNaN(code) && (
        <select
          as="select"
          name="selectedCity"
          className="p-3 w-full rounded-md text-black mb-3"
          onChange={(event) => {
            const selectedCity = event.target.value;
            setFieldValue(props.name, selectedCity);
          }}
        >
          {/* To display all the cities from the results */}
          {cities.map((city, index) => (
            <option key={index} value={city.nom}>
              {city.nom}
            </option>
          ))}
        </select>
      )}
      {code.length === 5 && isCodeValid && !isNaN(code) && (
        <p className="text-white-500">Aucune commune avec ce code postal</p>
      )}
    </>
  );
};

function FormNews() {
  // Schema to validat Field:
  const validationSchema = Yup.object({
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
      .required("Adresse mail est requise"),
    nom: Yup.string().nullable(),
    code: Yup.string()
      .required("Le code postal est requis")
      .length(5, "Composé de 5 chiffres (Sans lettres...)")
      // To exclude non-digits:
      .test(
        "is-valid-code",
        "Composé de 5 chiffres (Sans lettres...)",
        (value) => {
          return /^\d{5}$/.test(value);
        }
      ),
  });
  return (
    <div className="w-full py-16 text-white px-5 sm:px-16 bg-primary" id="form">
      <div className="max-w-[1240px] mx-auto grid lg:grid-cols-3 items-center">
        <div className="lg:col-span-2 ml-0 sm:ml-0">
          <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">
            Chez O'Syndic <br /> Nous souhaitons rester en contact avec
            vous&nbsp;!
          </h1>
          <p>Inscrivez-vous pour recevoir nos newsletters</p>
        </div>

        <Formik
          initialValues={{
            name: "",
            lastName: "",
            email: "",
            code: "",
            nom: "",
          }}
          // use validation Schema:
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm, setStatus }) => {
            if (values.nom !== "") {
              console.log(values);
              const apiUrl = import.meta.env.VITE_APP_API_URL;
              Axios.post(`${apiUrl}/api/post/create`, values)
                .then((response) => {
                  setStatus(response.status);
                  resetForm();
                  setStatus({
                    sent: true,
                    message: "Votre formulaire a été bien prise en compte !",
                  });
                  setTimeout(() => setStatus({}), 2000);
                })
                .catch((error) => {
                  resetForm();
                  setStatus({ sent: false, message: `Oups ! ${error}` });
                });
            }
          }}
        >
          {({ isSubmitting, status }) => (
            <Form className="flex flex-col items-center justify-between w-full ">
              <Field
                name="name"
                className="p-3  w-full rounded-md text-black mb-3"
                placeholder="votre Prénom"
              />
              <ErrorMessage name="name" className="bg-red-500" />

              <Field
                name="lastName"
                className="p-3  w-full rounded-md text-black mb-3"
                placeholder="votre Nom"
              />
              <ErrorMessage name="lastName" className="bg-red-500" />
              <Field
                name="email"
                className="p-3  w-full rounded-md text-black mb-3"
                placeholder="adresse mail"
              />
              <ErrorMessage name="email" className="bg-red-500" />
              <Field
                id="code"
                name="code"
                className="p-3 w-full rounded-md text-black mb-3"
                placeholder="Code Postal"
              />
              <ErrorMessage name="code" className="bg-red-500" />
              <MyField name="nom" />
              {status && status.message && (
                <p
                  className={` ${
                    status.sent
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {status.message}
                </p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-secondary text-white rounded-md font-medium w-full px-6 py-3 cursor-pointer hover:bg-slate-400"
              >
                Subscribe
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default FormNews;
