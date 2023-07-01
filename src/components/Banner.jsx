import React from "react";
import { syndicImag } from "../assets/";

function Banner() {
  return (
    <div className="w-full bg-white py-16 px-5 sm:px-16 ">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 gap-5">
        <img className="w-[500px] mx-auto my-4" src={syndicImag} alt="syndic" />
        <div className="flex flex-col justify-center">
          <p className=" block font-bold bg-slate-800 w-max px-6 py-1 rounded-r-lg text-white">
            O'Syndic
          </p>
          <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2 text-secondary">
            100 % dématérialisé !
          </h1>
          <p>
            Redéfinissez la gestion de votre copropriété : l'innovation au
            service de votre tranquillité.
          </p>
        </div>
      </div>
    </div>
  );
}
export default Banner;
