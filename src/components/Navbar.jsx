import React from "react";

import { logo } from "../assets/";
function Navbar() {
  return (
    <div className="flex gap-4 text-white justify-between items-center h-24 max-w-[1240px] mx-auto px-4">
      <h1 className="w-full text-1xl font-bold text-secondary sm:text-2xl md:text-3xl ease-in-out duration-500">
        <img src={logo} alt="Heart Music" />
      </h1>
    </div>
  );
}

export default Navbar;
