import React from "react";

import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
} from "react-icons/fa";

function Footer() {
  return (
    <div className="bg-primary">
      <div className="max-w-[1000px] mx-auto py-16 text-gray-300 text-center px-5 sm:px-16">
        <div>
          <h1 className="w-full text-1xl font-bold text-secondary sm:text-2xl md:text-3xl">
            O'Syndic vise la performance et l'efficacité
          </h1>
          <p className="py-4">
            On rassemble les copropriétaires dans la joie et la bonne humeur
          </p>
          <div className="w-[140px] m-auto">
            <div className="flex justify-between my-6">
              <FaFacebookSquare size={30} />
              <FaInstagramSquare size={30} />
              <FaTwitterSquare size={30} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
