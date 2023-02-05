document.addEventListener("DOMContentLoaded", () => {
    let nameInput = document.getElementById("nameInput");
    let lastNameInput = document.getElementById("lastNameInput");
    let fileInput = document.getElementById("formFile");
    let emailInput = document.getElementById("emailInput");
    let aboutMeInput = document.getElementById("aboutMeInput");
    let telInput = document.getElementById("telInput");
    let next = document.getElementById("submit");
    nameInput.addEventListener("input", firstNameValidation);
    lastNameInput.addEventListener("input", lastNameValidation);
    fileInput.addEventListener("change", fileInputValidation);
    emailInput.addEventListener("input", emailValidation);
    telInput.addEventListener("input", telValidation);
    aboutMeInput.addEventListener("input", aboutMeValidation);
    next.disabled = true;
    window.onload = () => {
        retrieveFirstName(nameInput);
        retrieveLastName(lastNameInput);
        retrieveAboutMe(aboutMeInput);
    }
})

function retrieveFirstName(nameInput) {
    let firstName = localStorage.getItem("resumeFirstName");
    let resumeFirstName = document.getElementById("resumeFirstName");
    nameInput.value = firstName;
    resumeFirstName.innerHTML = firstName;
}

function retrieveLastName(lastNameInput) {
    let lastName = localStorage.getItem("resumeLastName");
    let resumeLastName = document.getElementById("resumeLastName");
    lastNameInput.value = lastName;
    resumeLastName.innerHTML = lastName;
}

function retrieveAboutMe(aboutMeInput) {
    let aboutMe = localStorage.getItem("resumeAboutMe");
    let aboutMeValidation = localStorage.getItem("resumeAboutMeLength");
    let resumeAboutMe = document.getElementById("resumeAboutMe");
    let resumeAboutMeTitle = document.getElementById("resumeAboutMeTitle");
    aboutMeInput.value = aboutMe;
    resumeAboutMe.innerHTML = aboutMe;
    if (aboutMeValidation) {
        resumeAboutMeTitle.style.display = "unset"
    }
}

function firstNameValidation(e) {
    let text = e.target.value;
    let firstName = document.getElementById("resumeFirstName");

    let validationResult = nameValidation(text);

    firstName.innerHTML = text;

    inputValidation(e, validationResult);

    localStorage.setItem("resumeFirstName", text);
}

function lastNameValidation(e) {
    let text = e.target.value;

    let validationResult = nameValidation(text);

    let lastName = document.getElementById("resumeLastName");

    lastName.innerHTML = text;

    inputValidation(e, validationResult);

    localStorage.setItem("resumeLastName", text);
}

function nameValidation(text) {
    let language = isGeorgianLanguage(text);

    if (text.length > 1 && language) {
        return true;
    }
    return false;
}

function fileInputValidation(e) {
    let resumeImage = document.getElementById("resumeImage");
    let imageFile = e.target.files[0];
    let imageUrl = URL.createObjectURL(imageFile);
    resumeImage.style.display = "unset";
    resumeImage.src = imageUrl;
}

function emailValidation(e) {
    let email = e.target.value;
    let resumeEmail = document.getElementById("resumeEmail");
    resumeEmail.innerHTML = email;

    let atIndex = email.indexOf("@");
    let domain = email.substring(atIndex + 1);
    let validationResult = domain === "redberry.ge";
    let envelopeIcon = document.getElementById("envelopeIcon");
    inputValidation(e, validationResult);
    localStorage.setItem("resumeEmail", email);

    if (email.length > 0) {
        envelopeIcon.style.display = "unset";
    } else {
        envelopeIcon.style.display = "none";
    }
}

function aboutMeValidation(e) {
    let aboutMe = e.target.value
    let resumeAboutMe = document.getElementById("resumeAboutMe");
    resumeAboutMe.innerHTML = aboutMe;
    let resumeAboutMeTitle = document.getElementById("resumeAboutMeTitle");
    let validationResult = aboutMe.trim().length > 0;
    localStorage.setItem("resumeAboutMe", aboutMe);
    localStorage.setItem("resumeAboutMeLength", validationResult);
    if (validationResult) {
        resumeAboutMeTitle.style.display = "unset";
    } else {
        resumeAboutMeTitle.style.display = "none";
    }
}

function telValidation(e) {
    let tel = e.target.value;
    let resumeTel = document.getElementById("resumeTel");
    resumeTel.innerHTML = tel;

    let telIcon = document.getElementById("telIcon");
    let validationResult = isGeorgianMobileNumber(tel);
    inputValidation(e, validationResult);
    localStorage.setItem("resumeTel", tel);

    if (tel.trim().length > 0) {
        telIcon.style.display = "block";
    } else {
        telIcon.style.display = "none";
    }
}

function isGeorgianLanguage(text) {
    var sample = /[ა-ჰ]+/;
    if (sample.test(text)) {
        return true;
    }
    return false;
}

function isGeorgianMobileNumber(number) {
    var extracted = number.replace(/\D/g, '');
    if (extracted.length !== 12) return false;
    if (number.charAt(0) !== '+' || number.charAt(1) !== '9' ||
        number.charAt(2) !== '9' || number.charAt(3) !== '5') return false;

    return true;
}

function inputValidation(e, validationResult) {
    if (validationResult) {
        removeValidationError(e);
    } else {
        addValidationError(e);
    }
}

function addValidationError(e) {
    e.target.classList.remove("is-valid");
    e.target.classList.add("is-invalid");
}

function removeValidationError(e) {
    e.target.classList.remove("is-invalid");
    e.target.classList.add("is-valid");
}