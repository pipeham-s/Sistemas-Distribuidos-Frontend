import React from "react";
import Button from "../components/Button";
import Text from "../components/Text";

function Card({ category }) {
  return (
    <div
      className="relative bg-white border-2 border-gray-200 rounded-lg p-6 shadow-lg text-center transition-transform transform hover:scale-105 group overflow-hidden"
      style={{ width: "100%", paddingTop: "56.25%", position: "relative" }} // Rectangular
    >
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity rounded-lg"></div>
      <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center">
        <img
          src={category.icon}
          alt={`${category.name} icon`}
          className="w-20 h-20 mx-auto mb-3 relative z-10"
        />
        <Text size="xl" className="mt-3 mb-4 relative z-10">
          {category.name}
        </Text>
        {category.buttonText && (
          <Button
            type="glass"
            width="fixed"
            height="fixed"
            minWidth="120px"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity text-sm px-1 py-1"
          >
            {category.buttonText}
          </Button>
        )}
      </div>
    </div>
  );
}

export default Card;
