import React from "react";

function Card({ cardInfo }) {
  return (
    <div className="w-full shadow-xl  justify-between flex flex-col py-4 my-4 rounded-lg hover:scale-105 duration-300">
      <img className="w-20 mx-auto -mt-12" src={cardInfo.photo} alt="econom" />
      <h2 className="text-2xl font-bold text-center py-8">{cardInfo.name}</h2>
      <p className="text-center text-4xl font-bold">{cardInfo.price}</p>
      <div className="text-center font-medium">
        <p className="py-2 border-b border-slate-300 mx-8 mt-8 break-words">
          {cardInfo.info.title1}
        </p>
        <p className="py-2 border-b border-slate-3000 mx-8 break-words">
          {cardInfo.info.title2}
        </p>
      </div>
      <button
        className="bg-secondary w-[200px] rounded-md text-white font-medium my-6 mx-auto px-6 py-3 cursor-pointer"
        type="button"
      >
        <a href="/#form" alt="go to music">
          Plus d'informations
        </a>
      </button>
    </div>
  );
}

export default Card;
