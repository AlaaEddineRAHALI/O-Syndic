/* eslint-disable no-undef */
/* eslint-disable no-useless-escape */
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Axios from "axios";
import { useFormik } from "formik";

import * as Yup from "yup";

function Form() {
  const [zipcode, setZipcode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("dd");

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
          setErrorMessage("");
          setCities(results);
        } else {
          if (zipcode) {
            console.log("Erreur de code postal.");
            setErrorMessage("Aucune commune avec ce code postal.");
          } else {
            setErrorMessage("");
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

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      code: "",
      nom: "",
    },

    validationSchema: Yup.object({
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
      code: Yup.string().matches(
        /^[0-9]{5}$/,
        "Code postal doit contenir exactement 5 chiffres"
      ),
      // .required('ffff"'),
      // nom: Yup.string().required('Merci de saisir votre prénom"'),
    }),
    onSubmit: (values, { resetForm, setStatus }) => {
      console.log(values);
      values.code = zipcode;
      values.nom = selectedCity;
      // URL API

      const apiUrl = import.meta.env.VITE_APP_API_URL;

      // Fetch post data
      Axios.post(`${apiUrl}/api/post/create`, values)

        .then((response) => {
          setStatus(response.status);
          console.log(response);
          resetForm();
          setZipcode("");
          setSelectedCity("");
          setStatus({ sent: true, message: "Message envoyé !" });
        })
        .catch((error) => {
          resetForm();
          setStatus({ sent: false, message: `Oups ! ${error}` });
        });
      console.log("values", values);
    },
  });

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

        <form onSubmit={formik.handleSubmit} className="my-4">
          <div className="flex flex-col  items-center justify-between w-full ">
            <input
              id="name"
              className="p-3  w-full rounded-md text-black mb-3"
              type="text"
              placeholder="votre Prénom"
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name ? (
              <div>{formik.errors.name}</div>
            ) : null}
            <input
              id="lastName"
              className="p-3  w-full rounded-md text-black mb-3"
              type="text"
              placeholder="votre Nom"
              {...formik.getFieldProps("lastName")}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="bg-red-500">{formik.errors.lastName}</div>
            ) : null}
            <input
              id="email"
              className="p-3  w-full rounded-md text-black mb-3"
              type="email"
              placeholder="adresse mail"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}

            <input
              id="code"
              type="text"
              className="p-3  w-full rounded-md text-black mb-3"
              value={zipcode}
              placeholder="code Postale"
              onChange={handleZipcodeChange}
            />
            {formik.touched.code && formik.errors.code ? (
              <div className="text-white">{formik.errors.code}</div>
            ) : null}
            {errorMessage && <div id="error-message">{errorMessage}</div>}
            <select
              id="nom"
              className="p-3 w-full rounded-md text-black mb-3"
              value={selectedCity}
              onChange={handleCityChange}
            >
              {cities.map((city) => (
                <option key={city.nom} value={city.nom}>
                  {city.nom}
                </option>
              ))}
            </select>
            {formik.touched.nom && formik.errors.nom ? (
              <div>{formik.errors.nom}</div>
            ) : null}

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
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="bg-secondary text-white rounded-md font-medium w-full px-6 py-3 cursor-pointer hover:bg-slate-400"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
