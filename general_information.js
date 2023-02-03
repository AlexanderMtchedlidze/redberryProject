document.addEventListener("DOMContentLoaded", () => {
    let nameInput = document.getElementById("nameInput");
    let lastNameInput = document.getElementById("lastNameInput");
    nameInput.addEventListener("input", firstNameValidation);
    lastNameInput.addEventListener("input", lastNameValidation);
})

function firstNameValidation(e) {
    let text = e.target.value;
    let firstName = document.getElementById("firstName");

    let validation = nameValidation(text);

    if (validation) {
        firstName.innerHTML = text
    }
}

function lastNameValidation(e) {
    let text = e.target.value;

    nameValidation(text);

    let lastName = document.getElementById("lastName");

    let validation = nameValidation(text);

    if (validation) {
        lastName.innerHTML = text
    }
}

function nameValidation(text) {
    if (text.length > 2) {
        return true;
    }
    return false;
}