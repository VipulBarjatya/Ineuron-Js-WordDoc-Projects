const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");

const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownElbtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");

const completeEl = document.getElementById("complete");
const completeElInfo = document.getElementById("complete-info");
const completeBtn = document.getElementById("complete-button");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;
let countdownActive;
let savedCountDown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

//  Set Date Input Min with Today's Date
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

// Populate Countdown
function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const diffrence = countdownValue - now;

    const days = Math.floor(diffrence / day);
    const hours = Math.floor((diffrence % day) / hour);
    const minutes = Math.floor((diffrence % hour) / minute);
    const seconds = Math.floor((diffrence % minute) / second);

    //  Hide input
    inputContainer.hidden = true;

    // If countdown has ended, show complete
    if (diffrence < 0) {
      countdownEl.hidden = true;
      clearInterval(countdownActive);
      completeElInfo.innerText = `${countdownTitle} finished on ${countdownDate}`;
      completeEl.hidden = false;
    } else {
      // show the countdown in progress

      //   Populating Countdown
      countdownElTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;
      completeEl.hidden = true;
      countdownEl.hidden = false;
    }

    // Show Countdown
    countdownEl.hidden = false;
  }, second);
}

// Take Values from Form inputs
function updateCoundown(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  savedCountDown = {
    title: countdownTitle,
    date: countdownDate,
  };
  console.log(savedCountDown);
  localStorage.setItem("countdown", JSON.stringify(savedCountDown));

  if (countdownDate === "") {
    alert("Please select a date for the countdown");
  } else {
    //   Get the number version of current date
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

// Reset
function reset() {
  // Hide Countdowns, show Input
  countdownEl.hidden = true;
  completeEl.hidden = true;
  inputContainer.hidden = false;

  // Stop the countdown
  clearInterval(countdownActive);

  //   Reset values
  countdownTitle = "";
  countdownDate = "";
  localStorage.removeItem("countdown");
}

function restorePreviousCountdown() {
  // Get countdown from local storage if available
  if (localStorage.getItem("countdown")) {
    inputContainer.hidden = true;
    savedCountDown = JSON.parse(localStorage.getItem("countdown"));
    countdownTitle = savedCountDown.title;
    countdownDate = savedCountDown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

// Event Listeners
countdownForm.addEventListener("submit", updateCoundown);
countdownElbtn.addEventListener("click", reset);
completeBtn.addEventListener("click", reset);

// onLoad

restorePreviousCountdown();
