"use client";

import { QuoteType } from "@/app/page";

import React, { useState } from "react";

async function fetchNewQuote(): Promise<QuoteType[]> {
  const res = await fetch(
    "https://api.quotable.io/quotes/random?tags=happiness,famous-quotes&limit=1"
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Quote = ({ initQuote }: { initQuote: QuoteType }) => {
  const [quote, setQuote] = useState(initQuote);

  const handleClick = async () => {
    const quotes = await fetchNewQuote();
    setQuote(quotes[0]);
  };

  return (
    <div className="flex items-center relative z-10 max-w-5xl w-full text-left font-mono text-sm lg:flex">
      <div
        className={`absolute w-12 h-12 -top-4 -left-12`}
        style={{ backgroundImage: "url(/quote.svg)" }}
      ></div>
      <blockquote className="text-4xl flex-grow">
        {quote.content}
        <span className="italic font-light text-base"> -- {quote.author}</span>
      </blockquote>
      <button
        onMouseOver={() => console.log(performance.now())}
        onClick={handleClick}
        className={`absolute w-6 h-6 -right-10`}
        style={{ backgroundImage: "url(/next.svg)" }}
      ></button>
    </div>
  );
};

export { Quote };
