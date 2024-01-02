import { Quote } from "@/components/quote";
import localFont from "next/font/local";
import { getQuotes } from "@/components/getQuotes";

const myFont = localFont({ src: "./icodeit-Regular.woff2" });

export type QuoteType = {
  _id: string;
  author: string;
  content: string;
};

export default async function Home() {
  const quotes = await getQuotes();

  return (
    <main
      className={`flex min-h-screen justify-center items-center p-24 bg-slate-900 text-slate-100 ${myFont.className}`}
    >
      <Quote initQuotes={quotes} />
    </main>
  );
}
