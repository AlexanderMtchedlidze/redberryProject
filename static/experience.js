document.addEventListener("DOMContentLoaded", () => {
    let positionInput = document.getElementById("positionInput");
    let employerInput = document.getElementById("employerInput");
    let positionDescription = document.getElementById("positionDescription");

    positionInput.addEventListener("input", positionInputValidation);
    employerInput.addEventListener("input", employerInputValidation);
    positionDescription.addEventListener("input", positionDescriptionValidation);
})

function positionDescriptionValidation(e) {
    let positionDescription = e.target.value;
    localStorage.setItem("positionDescription", positionDescription);
    localStorage.setItem("positionDescriptoinResult", inputValidation(e, positionDescription))
}

function positionInputValidation(e) {
    let position = e.target.value;

    let result = inputValidation(e, position);
    localStorage.setItem("position", position);
    localStorage.setItem("positionResult", result);
}

function employerInputValidation(e) {
    let employer = e.target.value;

    let result = inputValidation(e, employer);
    localStorage.setItem("employer", employer)
    localStorage.setItem("employerResult", result);
}

function inputValidation(e, value) {
    if (value.trim().length > 1) {
        removeValidationError(e);
        return true;
    } else {
        addValidationError(e);
        return false;
    }
}

function addValidationError(e) {
    e.target.classList.remove("is-valid");
    e.target.classList.add("is-invalid");
}

function removeValidationError(e) {
    e.target.classList.add("is-valid");
    e.target.classList.remove("is-invalid");
}
