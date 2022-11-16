const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");

let apiQuotes = [];

// Show newQuote
function newQuote() {
  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  quoteText.textContent = quote.text;
  authorText.textContent = quote.author;
}

// Fetching Quotes from API
async function getQuotes() {
  const api = "https://type.fit/api/quotes";
  try {
    const response = await fetch(api);
    apiQuotes = await response.json();
    newQuote();
  } catch (err) {
    //Catch Error Here
  }
}

// On Load
getQuotes();

newQuoteBtn.addEventListener("click", getQuotes);
