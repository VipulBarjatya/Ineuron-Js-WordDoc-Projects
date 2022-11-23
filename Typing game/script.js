const givenTextEl = document.getElementById("givenText");
const textInputEl = document.getElementById("textInput");
const randomQuote = "https://api.quotable.io/random";

textInputEl.addEventListener("input", () => {
  const arrayText = givenTextEl.querySelectorAll("span");
  const arrayValue = textInputEl.value.split("");
  arrayText.forEach((characterSpan, index) => {
    const character = arrayValue[index];
    if (character === characterSpan.innerText) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else {
      characterSpan.classList.remove("correct");
      characterSpan.classList.add("incorrect");
    }
  });
});

async function getRandomQuote() {
  const resp = await fetch(randomQuote);
  const data = await resp.json();
  return data.content;
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
