const textInputEl = document.getElementById("textInput");
const countBtn = document.querySelector(".count");
const clrBtn = document.querySelector(".clear");
const counterEl = document.querySelector(".counter");

countBtn.addEventListener("click", () => {
  const wordArr = textInputEl.value.split(" ");
  counterEl.textContent = wordArr.length;
});

clrBtn.addEventListener("click", () => {
  textInputEl.value = "";
  counterEl.textContent = 0;
});
