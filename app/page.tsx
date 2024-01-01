import { Quote } from "@/components/quote";
import localFont from 'next/font/local'

const myFont = localFont({ src: './icodeit-Regular.woff2' })

export type QuoteType = {
  _id: string;
  author: string;
  content: string;
};

async function getQuotes(): Promise<QuoteType[]> {
  const res = await fetch(
    "https://api.quotable.io/quotes/random?tags=happiness,famous-quotes&limit=1"
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const quotes = await getQuotes();

  return (
    <main className={`flex min-h-screen justify-center items-center p-24 bg-slate-900 text-slate-100 ${myFont.className}`}>
      <Quote initQuote={quotes[0]} />
    </main>
  );
}
