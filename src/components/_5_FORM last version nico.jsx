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
      try {/* eslint-disable no-undef */
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

const MyField = (props) => {
  const {
    values: { code },
    setFieldValue,
  } = useFormikContext();
  const [cities, setCities] = useState([]);
  console.log(cities);

  console.log(cities[0]);

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
      } catch (error) {
        setCities([]);
      }
    };
    fetchData();
  }, [code, setFieldValue, props.name]);

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
          validationSchema={Yup.object({
            code: Yup.string()
              .required("Le code postal est requis")
              .length(5, "Le code postal doit contenir exactement 5 chiffres")
              .matches(
                /^(([1-95]{2}|2A|2B)[0-9]{3})$|^[971-974]$/,
                "Aucune commune avec ce code postal"
              )
              .when("nom", {
                is: (value) => value === "undefined",
                then: Yup.string().required("Le nom est requis"),
              }),

            nom: Yup.string().nullable(),

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
          })}
          onSubmit={(values, { resetForm, setStatus }) => {
            if (values.nom !== "") {
              console.log(values);
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
              console.log("values", values);
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
                name="code"
                className="p-3 w-full rounded-md text-black mb-3"
                placeholder="Code Postal"
              />
              <ErrorMessage name="code" className="bg-red-500" />
              <MyField
                name="nom"
                className="p-3 w-full rounded-md text-black mb-3"
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
