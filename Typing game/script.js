const givenTextEl = document.getElementById("givenText");
const textInputEl = document.getElementById("textInput");
const randomQuote = "https://api.quotable.io/random";

textInputEl.addEventListener("input", () => {});

function getRandomQuote() {
  return fetch(randomQuote)
    .then((resp) => resp.json())
    .then((data) => data.content);
}

async function renderNewQuote() {
  const quote = await getRandomQuote();
  givenTextEl.innerText = "";
  quote.split("").forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    givenTextEl.appendChild(characterSpan);
  });
  textInputEl.value = null;
}

renderNewQuote();
