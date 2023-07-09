/* eslint-disable no-undef */
/* eslint-disable no-useless-escape */
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Axios from "axios";
import * as Yup from "yup";
import {
  Formik,
  useFormik,
  Form,
  Field,
  ErrorMessage,
  useFormikContext,
} from "formik";

const MyField = (props, { handleBlur }) => {
  const {
    values: { code },
    setFieldValue,
  } = useFormikContext();
  const [cities, setCities] = useState([]);
  // console.log(cities);

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
          if (code) {
            // ErrorMessage("Aucune commune");
            setCities([""]);
          } else {
            setCities([""]);
          }
        }
        props.onChange(results);
      } catch (error) {
        setCities([]);
      }
    };
    fetchData();
  }, [code, props.name, setFieldValue]);

  return (
    <>
      {(cities && cities[0] === "" && code.length !== 5) ||
      (cities[0] === "" && code.length === 5) ||
      isNaN(code)
        ? null
        : code.length === 5 && (
            <select
              as="select"
              name="selectedCity"
              className="p-3 w-full rounded-md text-black mb-3"
              value={props.value}
              onChange={() => {
                const selectedCity = event.target.value;
                setFieldValue(props.name, selectedCity);
              }}
            >
              {cities.map((city, index) => (
                <option key={index} value={city.nom}>
                  {city.nom}
                </option>
              ))}
            </select>
          )}
    </>
  );
};

function FormNews() {
  const [citi, setCiti] = useState([]);
  const [citiValue, setCitiValue] = useState([]);
  useEffect(() => {
    setCitiValue(citi);
  }, [citi]);
  useEffect(() => {
    const apiUrl = "https://geo.api.gouv.fr/communes?codePostal=";
    const fetchData = async () => {
      try {
        const response = await Axios.get(apiUrl + code);

        const results = response.data;
        if (results.length) {
          setCiti(results);
        } else {
          setCiti([]);
        }
      } catch (error) {
        setCiti([]);
      }
    };
    fetchData();
  }, []);
  const validationSchema = Yup.object({
    nom: Yup.string().nullable(),
    code: Yup.string()
      .required("Le code postal est requis")
      .length(5, "Le code postal doit contenir exactement 5 chiffres")
      .test(
        "is-valid-code",
        "Le code postal doit contenir exactement 5 chiffres",
        (value) => {
          console.log("valuesheam", value);
          if (isNaN(value) || (isNaN(value) && value.lenght !== 5)) {
            return false;
            // Vérifier si le code postal a des résultats dans cities
            // return citi.length !== 0 || !citi[0] !== undefined;
          }
          return true; // La validation passe si le champ est vide
        }
      ),
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
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm, setStatus }) => {
            if (values.nom === "") {
              setStatus({
                sent: false,
                message: "Veuillez choisir un code valable!",
              });
              setTimeout(() => setStatus({}), 2000);
            }
            if (values.nom !== "") {
              console.log("onsubmit", values);
              // URL API
              const apiUrl = import.meta.env.VITE_APP_API_URL;

              // Fetch post data
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
          {({ handleSubmit, handleBlur, isSubmitting, status }) => (
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
                onBlur={handleBlur}
              />
              <ErrorMessage name="code" className="bg-red-500" />
              <MyField
                name="nom"
                className="p-3 w-full rounded-md text-black mb-3"
                handleBlur={handleBlur}
                onChange={(newCities) => {
                  setCiti(newCities);
                }}
              />
              {status && status.message && (
                <p
                  className={` ${
                    status.sent
                      ? "bg-green-200 text-green-700"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {status.message}
                </p>
              )}
              <button
                type="submit"
                // disabled={isSubmitting}
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
