document.addEventListener("DOMContentLoaded", () => {
    let goBack = document.getElementById("goBack");
    let nameInput = document.getElementById("nameInput");
    let lastNameInput = document.getElementById("lastNameInput");
    let fileInput = document.getElementById("formFile");
    let emailInput = document.getElementById("emailInput");
    let aboutMeInput = document.getElementById("aboutMeInput");
    let telInput = document.getElementById("telInput");
    let next = document.getElementById("toExperienceButton");
    nameInput.addEventListener("input", firstNameValidation);
    lastNameInput.addEventListener("input", lastNameValidation);
    fileInput.addEventListener("change", fileInputValidation);
    emailInput.addEventListener("input", emailValidation);
    telInput.addEventListener("input", telValidation);
    aboutMeInput.addEventListener("input", aboutMeValidation);
    goBack.addEventListener("click", clearLocalStorage);
    window.onload = () => {
        retrieveFirstName(nameInput);
        retrieveLastName(lastNameInput);
        retrieveImage();
        retrieveAboutMe(aboutMeInput);
        retrieveTel(telInput);
        retrieveEmail(emailInput);
    }
    next.addEventListener("click", preventExperienceNav);
})

function clearLocalStorage() {
    localStorage.clear();
}

function preventExperienceNav(e) {
    condition = true;
    if (!condition) {
        e.preventDefault();
    }
}

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

function retrieveImage() {
    let base64Image = localStorage.getItem('base64Image');
    if (base64Image) {
        resumeImage = document.getElementById('resumeImage');
        resumeImage.style.display = "unset";
        resumeImage.src = base64Image
    }
}

function retrieveAboutMe(aboutMeInput) {
    let aboutMe = localStorage.getItem("resumeAboutMe");
    let resumeAboutMe = document.getElementById("resumeAboutMe");
    let resumeAboutMeTitle = document.getElementById("resumeAboutMeTitle");
    aboutMeInput.value = aboutMe;
    resumeAboutMe.innerHTML = aboutMe;
    if (aboutMe.trim().length > 0) {
        resumeAboutMeTitle.style.display = "unset"
    }
}

function retrieveTel(telInput) {
    let tel = localStorage.getItem("resumeTel");
    let telValidation = localStorage.getItem("resumeTelValidation");
    let resumeTel = document.getElementById("resumeTel");
    let telIcon = document.getElementById("telIcon");
    telInput.value = tel;
    resumeTel.innerHTML = tel;
    if (telValidation) {
        telIcon.style.display = "block";
    }
}

function retrieveEmail(emailInput) {
    let email = localStorage.getItem("resumeEmail");
    let emailValidation = localStorage.getItem("resumeEmailValidation");
    let resumeEmail = document.getElementById("resumeEmail");
    let envelopeIcon = document.getElementById("envelopeIcon");
    emailInput.value = email;
    resumeEmail.innerHTML = email;
    if (emailValidation) {
        envelopeIcon.style.display = "block";
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

    var fileReader = new FileReader();
    fileReader.onload = function (fileLoadedEvent) {
        var srcData = fileLoadedEvent.target.result;
        localStorage.setItem("base64Image", srcData);
    };
    fileReader.readAsDataURL(imageFile);
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
    let lengthValidation = email.length > 0;
    localStorage.setItem("resumeEmail", email);
    localStorage.setItem("resumeEmailValidation", lengthValidation);

    if (lengthValidation) {
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
    let lengthValidation = aboutMe.trim().length > 0;
    localStorage.setItem("resumeAboutMe", aboutMe);
    if (lengthValidation) {
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
    let lengthValidation = tel.trim().length > 0;

    if (lengthValidation) {
        telIcon.style.display = "block";
    } else {
        telIcon.style.display = "none";
    }

    localStorage.setItem("resumeTelValidation", lengthValidation);
    localStorage.setItem("resumeTel", tel);
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