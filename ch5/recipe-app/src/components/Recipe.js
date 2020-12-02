import React from "react";
import IngredientsList from "./IngredientsList";
import Instructions from "./Instructions";
import Summary from "./Summary";

export default function Recipe({
  name = "untitled",
  ingredients = [],
  steps = []
}) {
  return (
    <section id={name.toLowerCase().replace(/ /g, "-")}>
      <h1>{name}</h1>
      <Summary title="Cooking Instructions" ingredients="6" steps="4"/>
      <IngredientsList list={ingredients} />
      <Instructions title="Cooking Instructions" steps={steps} />
    </section>
  );
}
