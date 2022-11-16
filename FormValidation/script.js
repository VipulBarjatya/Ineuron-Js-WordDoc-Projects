const form = document.getElementById("form");
const password1El = document.getElementById("password1");
const password2El = document.getElementById("password2");
const messageContainer = document.querySelector(".message-container");
const message = document.getElementById("message");

let isValid = false;
let passwordsMatch = false;

function validateForm() {
  // Using Constraint API

  isValid = form.checkValidity();
  if (!isValid) {
    message.innerText = "Please Fill out all fields";
    message.style.color = "rgba(250,0,0,0.75)";
  }

  //   Check to see if passwords match
  if (password1El.value === password2El.value) {
    passwordsMatch = true;
    password1El.style.boxShadow = "inset 0px 0px 10px rgb(0, 251, 0, 0.5)";
    password1El.style.borderColor = "rgb(0, 251, 0, 0.5)";
    password2El.style.boxShadow = "inset 0px 0px 10px rgb(0, 251, 0, 0.5)";
    password2El.style.borderColor = "rgb(0, 251, 0, 0.5)";
    message.innerText = "Form Submitted";
    message.style.color = "rgba(0, 250,0,0.75)";
    return;
  } else {
    passwordsMatch = false;
    message.innerText = "Make Sure passwords match";
    message.style.color = "rgba(250,0,0,0.75)";
    password1El.style.boxShadow = "inset 0px 0px 10px rgb(251, 0, 0, 0.5)";
    password1El.style.borderColor = "rgb(251, 0, 0, 0.5)";
    password2El.style.boxShadow = "inset 0px 0px 10px rgb(251, 0, 0, 0.5)";
    password2El.style.borderColor = "rgb(251, 0, 0, 0.5)";
  }

  //   If form is valid and passwords match
  if (isValid && passwordsMatch) {
    message.innerText = "Form Submitted Succesfully";
    message.style.color = "rgba(0, 250,0,0.75)";
  }
}

function storeFormData() {
  const user = {
    name: form.name.value,
    phone: form.phone.value,
    email: form.email.value,
    website: form.website.value,
    password: form.password.value,
  };

  console.log(user);
}

function processFormData(e) {
  e.preventDefault();
  console.log(e);
  // ValidateForm()
  validateForm();
  //   Submit Data if valid
  if (isValid && passwordsMatch) {
    storeFormData();
  }
}

// Event Listener
form.addEventListener("submit", processFormData);
