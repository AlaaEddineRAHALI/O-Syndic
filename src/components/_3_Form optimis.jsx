/* eslint-disable no-undef */
/* eslint-disable no-useless-escape */
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Axios from "axios";
import { useFormik, Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from "yup";

function FormNews() {
  const handlcode = (code) => {
    setZipcode(code);
  };
  handlcode();
  const [zipcode, setZipcode] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  const handleZipcodeChange = (event) => {
    const code = event.target.value;
    setZipcode(code);
  };
  const handleCityChange = (event) => {
    const cityName = event.target.value;

    if (cityName) {
      const filteredResults = cities.filter((city) => city.nom === cityName);
      if (filteredResults.length === 1) {
        setSelectedCity(filteredResults[0].nom);
      } else {
        setSelectedCity("");
      }
    }
  };
  useEffect(() => {
    if (cities && cities.length > 0) {
      const firstCityName = cities[0].nom;
      setSelectedCity(firstCityName);
    }
  }, [cities]);
  useEffect(() => {
    const apiUrl = "https://geo.api.gouv.fr/communes?codePostal=";
    const fetchData = async () => {
      try {
        const response = await Axios.get(apiUrl + zipcode);
        const results = response.data;

        if (results.length) {
          // setErrorMessage("");
          setCities(results);
        } else {
          if (zipcode) {
            console.log("Erreur de code postal.");
            setErrorMessage("Aucune commune avec ce code postal.");
          } else {
            // setErrorMessage("");
            setCities([]);
          }
        }
      } catch (error) {
        console.log(error);
        setCities([]);
      }
    };

    fetchData();
  }, [zipcode]);
  const formik = useFormik({});
  return (
    <div
      className="w-full py-16 text-white px-5 sm:px-16  bg-primary"
      id="form"
    >
      <div className="max-w-[1240px] mx-auto grid lg:grid-cols-3 items-center">
        <div className="lg:col-span-2 ml-0 sm:ml-0">
          <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">
            Chez O'Syndic <br /> Nous souhaitons rester en contact avec
            vous&nbsp;!
          </h1>
          <p>Inscrivez-vous pour recevoir nos newsletter </p>
        </div>

        <Formik
          initialValues={{
            name: "",
            lastName: "",
            email: "",
            code: "",
            nom: "",
          }}
          onSubmit={(values, { resetForm, setStatus }) => {
            values.code = zipcode;
            values.nom = selectedCity;
            // URL API
            const apiUrl = import.meta.env.VITE_APP_API_URL;

            // Fetch post data
            Axios.post(`${apiUrl}/api/post/create`, values)

              .then((response) => {
                setStatus(response.status);
                console.log(response);
                // resetForm();
                setZipcode("");
                setSelectedCity("");
                setStatus({ sent: true, message: "Message envoyé !" });
              })
              .catch((error) => {
                resetForm();
                setStatus({ sent: false, message: `Oups ! ${error}` });
              });
            console.log("values", values);
          }}
          //validations
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
              .required("Adresse mail est requise"),
            code: Yup.number()
              .required("obligatoire")
              .min(2, "Too Short!")
              .max(5, "Too Long!"),
          })}
        >
          <Form className="flex flex-col  items-center justify-between w-full ">
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
              className="p-3  w-full rounded-md text-black mb-3"
              placeholder="code Postale"
              // value={zipcode}
              // onChange={handleZipcodeChange}
            />
            <ErrorMessage
              name="code"
              component="div"
              className="text-red-500"
            />

            <Field
              as="select"
              name="nom"
              className="p-3 w-full rounded-md text-black mb-3"
              value={selectedCity}
              onChange={handleCityChange}
            >
              {cities.map((city) => (
                <option key={city.nom} value={city.nom}>
                  {city.nom}
                </option>
              ))}
            </Field>
            <ErrorMessage name="nom" className="bg-red-500" />

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="bg-secondary text-white rounded-md font-medium w-full px-6 py-3 cursor-pointer hover:bg-slate-400"
            >
              Subscribe
            </button>
            {formik.status && formik.status.message && (
              <p
                className={` ${
                  formik.status.sent
                    ? "bg-green-200 text-green-700"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {formik.status.message}
              </p>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
}
export default FormNews;
