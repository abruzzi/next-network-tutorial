"use client";

import { QuoteType } from "@/app/page";

import React, { useState } from "react";
import useSWR, { preload, useSWRConfig } from "swr";

async function fetchNewQuotes(): Promise<QuoteType[]> {
  const res = await fetch(
    "https://api.quotable.io/quotes/random?tags=famous-quotes&limit=3"
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Quote = ({ initQuote }: { initQuote: QuoteType }) => {
  const { mutate } = useSWRConfig();
  const [index, setIndex] = useState(0);
  const {
    data: quotes,
    isLoading,
    isValidating,
    error = [],
  } = useSWR("quotes", fetchNewQuotes, {
    fallbackData: [initQuote],
  });

  const handleHover = async () => {
    preload("quotes", fetchNewQuotes);
  };

  const handleClick = () => {
    if (index < quotes.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
      mutate("quotes");
    }
  };

  const quoteToDisplay = quotes[index];

  if (isLoading || isValidating) {
    return (
      <div
        className={`absolute w-16 h-16 animate-spin`}
        style={{ backgroundImage: "url(/circle.svg)" }}
      >
      </div>
    );
  }

  return (
    <div className="flex items-center relative z-10 max-w-5xl w-full text-left font-mono text-sm lg:flex">
      <div
        className={`absolute w-12 h-12 -top-4 -left-12`}
        style={{ backgroundImage: "url(/quote.svg)" }}
      ></div>
      <blockquote className="text-4xl flex-grow">
        {quoteToDisplay.content}
        <span className="italic font-light text-base">
          {" "}
          -- {quoteToDisplay.author}
        </span>
      </blockquote>
      <button
        onMouseEnter={handleHover}
        onClick={handleClick}
        className={`absolute w-6 h-6 -right-10`}
        style={{ backgroundImage: "url(/next.svg)" }}
      ></button>
    </div>
  );
};

export { Quote };
