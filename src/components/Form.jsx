/* eslint-disable no-undef */
/* eslint-disable no-useless-escape */
import React from "react";
import Axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

function Form() {
  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      picked: "",
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
    }),
    onSubmit: (values, { resetForm, setStatus }) => {
      // URL API
      const apiUrl = import.meta.env.VITE_APP_API_URL;

      // Fetch post data
      Axios.post(`${apiUrl}/api/post/create`, values)
        .then((response) => {
          setStatus(response.status);
          console.log(response);
          resetForm();
          setStatus({ sent: true, message: "Message envoyé !" });
        })
        .catch((error) => {
          resetForm();
          setStatus({ sent: false, message: `Oups ! ${error}` });
        });
      console.log(values);
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
