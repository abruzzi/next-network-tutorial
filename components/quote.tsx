"use client";

import { QuoteType } from "@/app/page";

const Quote = ({ quote }: { quote: QuoteType }) => {
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
        onClick={() => console.log(performance.now())}
        className={`absolute w-6 h-6 -right-10`}
        style={{ backgroundImage: "url(/next.svg)" }}
      ></button>
    </div>
  );
};

export { Quote };
