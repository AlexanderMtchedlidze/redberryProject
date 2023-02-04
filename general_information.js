document.addEventListener("DOMContentLoaded", () => {
    let nameInput = document.getElementById("nameInput");
    let lastNameInput = document.getElementById("lastNameInput");
    let emailInput = document.getElementById("emailInput");
    let telInput = document.getElementById("telInput");
    nameInput.addEventListener("input", firstNameValidation);
    lastNameInput.addEventListener("input", lastNameValidation);
    emailInput.addEventListener("input", emailValidation);
    telInput.addEventListener("input", telValidation);
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
    let language = isGeorgianLanguage(text);

    if (text.length > 1 && language == "ka") {
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

function telValidation(e) {
    let tel = e.target.value;
    let validation = isGeorgianMobileNumber(tel);
    console.log(validation);
}

function isGeorgianLanguage(text) {
    var sample = /[ა-ჰ]+/;
    if (sample.test(text)) {
        return "ka";
    }
    return "unknown";
}

function isGeorgianMobileNumber(number) {
    var extracted = number.replace(/\D/g, '');
    if (extracted.length !== 12) return false;
    if (number.charAt(0) !== '+' || number.charAt(1) !== '9' ||
        number.charAt(2) !== '9' || number.charAt(3) !== '5') return false;

    return true;
}