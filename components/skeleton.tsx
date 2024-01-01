import React from "react";

export const Skeleton = () => {
  return (
    <div
      className={`animate-pulse flex items-center relative z-10 max-w-5xl w-full text-left font-mono text-sm lg:flex`}
    >
      <span
        className={`absolute w-12 h-12 -top-4 -left-16`}
        style={{backgroundImage: "url(/quote.svg)", opacity: "0.6"}}
      ></span>
      <blockquote className="text-4xl flex-grow bg-slate-700 rounded w-full h-32">
      </blockquote>
    </div>
  );
};