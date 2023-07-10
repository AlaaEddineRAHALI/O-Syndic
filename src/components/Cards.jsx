import React from "react";
import { Icon1, Icon2, Icon3 } from "../assets/";
import Card from "./Card";

const cardsData = [
  {
    id: 1,
    title: "Evolution de vos comptes",
    photo: Icon1,
    subtitle: "En Temps Réel",
    info: {
      title1: "Documents personnels",
      title2: "Documents immeuble",
    },
  },
  {
    id: 2,
    title: "Gestion des coproprités",
    subtitle: "Moderne",
    photo: Icon2,
    info: {
      title1: "Gestion des travaux",
      title2: "Gestion des assurances",
    },
  },
  {
    id: 3,
    title: "Echange Facile",
    subtitle: "Dématérialisé",
    photo: Icon3,
    info: {
      title1: "Entre copropriétaires",
      title2: "Avec les sous-traitants",
    },
  },
];

function Cards() {
  return (
    <div className="w-full py-40 bg-white px-5 sm:px-16">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8">
        {cardsData.map((card) => (
          <Card cardInfo={card} key={card.id} />
        ))}
      </div>
    </div>
  );
}

export default Cards;
