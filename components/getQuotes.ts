import { QuoteType } from "@/app/page";

export async function getQuotes(): Promise<QuoteType[]> {
  const res = await fetch(
    "https://api.quotable.io/quotes/random?tags=happiness,famous-quotes&limit=3"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
