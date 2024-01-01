import React from "react";

const Spinner = () => {
  return (
    <div
      className={`absolute w-16 h-16 animate-spin`}
      style={{ backgroundImage: "url(/circle.svg)" }}
    ></div>
  );
};

export { Spinner };
