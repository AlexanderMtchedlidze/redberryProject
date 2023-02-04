document.addEventListener("DOMContentLoaded", () => {
    let nameInput = document.getElementById("nameInput");
    let lastNameInput = document.getElementById("lastNameInput");
    let emailInput = document.getElementById("emailInput");
    nameInput.addEventListener("input", firstNameValidation);
    lastNameInput.addEventListener("input", lastNameValidation);
    emailInput.addEventListener("input", emailValidation);
})

function firstNameValidation(e) {
    let text = e.target.value;
    let firstName = document.getElementById("firstName");

    let validation = nameValidation(text);

    firstName.innerHTML = text;

    if (validation) {

    }
}

function lastNameValidation(e) {
    let text = e.target.value;

    nameValidation(text);

    let lastName = document.getElementById("lastName");

    let validation = nameValidation(text);

    lastName.innerHTML = text;

    if (validation) {

    } 
}

function nameValidation(text) {
    let language = detectLanguage(text);
    console.log(language)

    if (text.length > 2 && language == "ka") {
        return true;
    }
    return false;
}

function emailValidation(e) {
    let email = e.target.value;
    let atIndex = email.indexOf("@");
    let domain = email.substring(atIndex + 1);

    if (domain !== "redberry.ge") {

    }
}

function detectLanguage(text) {
    var sample = /[ა-ჰ]+/;
    if (sample.test(text)) {
      return "ka";
    }
    return "unknown";
  }