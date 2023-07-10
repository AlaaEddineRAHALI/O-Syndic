import React from "react";

function Hero() {
  return (
    <div className="text-white">
      <div className="max-w-3xl -mt-24 w-full mx-auto h-screen text-center flex flex-col justify-center px-2">
        <h1 className="md:text-7xl sm:text-6xl text-4xl font-bold md:py-6  text-primary">
          O'Syndic
        </h1>
        <div></div>
        <p className="md:text-2xl text-xl font-bold text-gray-500">
          Quelle que soit la taille de votre copropriété, notre mission est de
          veiller à votre sérénité!
        </p>
        <a
          href="/#form"
          alt="go to newsletters"
          type="button"
          className="bg-secondary w-48 rounded-md font-medium my-6 mx-auto py-3 text-white cursor-pointer"
        >
          Subscribe
        </a>
      </div>
    </div>
  );
}

export default Hero;
