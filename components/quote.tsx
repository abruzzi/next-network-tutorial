"use client";

import { QuoteType } from "@/app/page";

import React, { useState } from "react";
import useSWR, { preload, useSWRConfig } from "swr";

import { Spinner } from "@/components/spinner";
import { Skeleton } from "@/components/skeleton";

async function fetchNewQuotes(): Promise<QuoteType[]> {
  const res = await fetch(
    "https://api.quotable.io/quotes/random?tags=famous-quotes&limit=3"
  );

  if (!res.ok) {
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

  if (isLoading) {
    return <Skeleton />;
  }

  if (isValidating) {
    return <Spinner />;
  }

  return (
    <div className="flex items-center relative z-10 max-w-5xl w-full text-left text-sm lg:flex">
      <span
        className={`absolute w-12 h-12 -top-4 -left-16`}
        style={{ backgroundImage: "url(/quote.svg)" }}
      ></span>
      <blockquote className="text-4xl flex-grow">
        {quoteToDisplay.content}
        <div>
          <span className="italic font-light text-base inline-block">
            {" "}
            -- {quoteToDisplay.author}
          </span>
        </div>
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
