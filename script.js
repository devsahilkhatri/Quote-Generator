// Selecting Elements
const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector(".quote");
const authorText = document.querySelector(".author");
const twitterBtn = document.querySelector(".twitter");
const newQuoteBtn = document.querySelector(".new-quote");
const loader = document.querySelector(".loader");

// Loading Loader
const loading = function () {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

// Hide Loader + Active Content
const complete = function () {
  quoteContainer.hidden = false;
  loader.hidden = true;
};

let quoteData = [];
// Render random quotes from quoteData array
const newQuote = function () {
  loading();
  const quote = quoteData[Math.floor(Math.random() * quoteData.length) + 1];

  // If Author is Empty
  !quote.author
    ? (authorText.textContent = "Unknown")
    : (authorText.textContent = quote.author);

  // If quote is large, change styling
  quote.text.length > 120
    ? quoteText.classList.add("long-quote")
    : quoteText.classList.remove("long-quote");

  // Set quote text + Hide loader
  quoteText.textContent = quote.text;
  complete();
};

// Get Quote Generator API
const getQuote = async function () {
  loading();
  try {
    const response = await fetch("https://type.fit/api/quotes");
    quoteData = await response.json();

    // Rendering new quotes
    newQuote();
  } catch (error) {
    alert(`Woops! Something went wrong.. ${error.message}`);
  }
};

// Twitter Web intent url
const twitterQuote = function () {
  const twitterURl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterURl, "_blank");
};

// Event Listener's
twitterBtn.addEventListener("click", twitterQuote);
newQuoteBtn.addEventListener("click", newQuote);

// On Load
getQuote();
