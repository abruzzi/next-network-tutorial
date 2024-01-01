type QuoteType = {
  _id: string;
  author: string;
  content: string;
}

type QuoteResponseType = {
  results: QuoteType[]
}

async function getQuote(): Promise<QuoteType[]> {
  const res = await fetch('https://api.quotable.io/quotes/random?tags=happiness,famous-quotes&limit=1')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Home() {
  const quote = await getQuote();


  return (
    <main className="flex min-h-screen justify-center items-center p-24 bg-slate-900 text-slate-100">
      <div className="flex items-center relative z-10 max-w-5xl w-full text-left font-mono text-sm lg:flex">
        <div className={`absolute w-12 h-12 -top-4 -left-12`} style={{ backgroundImage: "url(/quote.svg)" }}></div>
        <blockquote className="text-4xl flex-grow">
          {quote[0].content}<span className="italic font-light text-base"> -- {quote[0].author}</span>
        </blockquote>
        <button className={`absolute w-6 h-6 -right-10`} style={{ backgroundImage: "url(/next.svg)" }}></button>
      </div>
    </main>

  )
}
