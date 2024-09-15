import React from "react";
import ServiceCard from "./Card";

function CardList({ categories }) {
  return (
    <section className="flex w-3/4 justify-start items-center px-8 mb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {categories.map((category, index) => (
          <ServiceCard key={index} category={category} />
        ))}
      </div>
    </section>
  );
}

export default CardList;
