const givenTextEl = document.getElementById("givenText");
const textInputEl = document.getElementById("textInput");
const timerEl = document.getElementById("timer");
const randomQuote = "https://api.quotable.io/random";

textInputEl.addEventListener("input", () => {
  const arrayText = givenTextEl.querySelectorAll("span");
  const arrayValue = textInputEl.value.split("");
  let correct = true;
  arrayText.forEach((characterSpan, index) => {
    const character = arrayValue[index];
    if (character == null) {
      // characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
      correct = false;
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else {
      characterSpan.classList.remove("correct");
      characterSpan.classList.add("incorrect");
      correct = false;
    }
  });

  if (correct) renderNewQuote();
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

function startTimer() {
  timerEl.innerText = 0;
}

renderNewQuote();
