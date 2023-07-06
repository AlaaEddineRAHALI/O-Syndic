/* eslint-disable no-undef */
/* eslint-disable no-useless-escape */
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Axios from "axios";
import * as Yup from "yup";
import {
  useFormik,
  Formik,
  Form,
  Field,
  ErrorMessage,
  useField,
  useFormikContext,
} from "formik";

const MyField = (props) => {
  const {
    values: { code },
    setFieldValue,
  } = useFormikContext();
  const [cities, setCities] = useState([]);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [field, meta] = useField(props);

  // const handleChange = (e) => {
  //   const selectedCity = cities.find((city) => city.nom === e.target.value);
  //   setFieldValue(props.name, selectedCity ? selectedCity.nom : "");
  // };
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
            setErrorMessage("Aucune commune avec ce code postal.");
          } else {
            setCities([code]);
          }
        }
      } catch (error) {
        setCities([]);
      }
    };

    fetchData();
  }, [code, setFieldValue, props.name]);
  const handleChange = (event) => {
    const selectedCity = event.target.value;
    setFieldValue(props.name, selectedCity);
  };

  return (
    <>
      {/* {!!meta.touched && !!meta.error && <div>{meta.error}</div>} */}
      {cities && cities.length > 0 && (
        <select
          className="p-3 w-full rounded-md text-black mb-3"
          value={props.value}
          onChange={handleChange}
        >
          {cities.map((city) => (
            <option key={city.code} value={city.nom}>
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
            code: "",
            ville: "",
          }}
          onSubmit={(values, { resetForm, setStatus }) => {
            console.log(values);
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
          }}
        >
          <Form className="flex flex-col items-center justify-between w-full ">
            <ErrorMessage name="email" className="bg-red-500" />
            <Field
              name="code"
              className="p-3 w-full rounded-md text-black mb-3"
              placeholder="Code Postal"
            />

            <ErrorMessage name="code" className="bg-red-500" />
            <MyField
              name="ville"
              className="p-3 w-full rounded-md text-black mb-3"
            />

            <button
              type="submit"
              className="bg-secondary text-white rounded-md font-medium w-full px-6 py-3 cursor-pointer hover:bg-slate-400"
            >
              Subscribe
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default FormNews;
