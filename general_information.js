document.addEventListener("DOMContentLoaded", () => {
    let nameInput = document.getElementById("nameInput");
    let lastNameInput = document.getElementById("lastNameInput");
    let fileInput = document.getElementById("formFile");
    let emailInput = document.getElementById("emailInput");
    let aboutMeInput = document.getElementById("aboutMeInput");
    let telInput = document.getElementById("telInput");
    let submit = document.getElementById("submit");
    nameInput.addEventListener("input", firstNameValidation);
    lastNameInput.addEventListener("input", lastNameValidation);
    fileInput.addEventListener("change", fileInputValidation);
    emailInput.addEventListener("input", emailValidation);
    telInput.addEventListener("input", telValidation);
    aboutMeInput.addEventListener("input", aboutMeValidation);
        
    submit.disabled = true;
})

function firstNameValidation(e) {
    let text = e.target.value;
    let firstName = document.getElementById("resumeFirstName");

    let validation = nameValidation(text);

    firstName.innerHTML = text;

    if (validation) {
        e.target.classList.remove("error");
    } else {
        e.target.classList.add("error");
    }
}

function lastNameValidation(e) {
    let text = e.target.value;

    nameValidation(text);

    let lastName = document.getElementById("resumeLastName");

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
    if (domain !== "redberry.ge") {

    }

    let envelopeIcon = document.getElementById("envelopeIcon");

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

    if (aboutMe.trim().length > 0) {
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
    if (tel.trim().length > 0) {
        telIcon.style.display = "block";
    } else {
        telIcon.style.display = "none";
    }

    let validation = isGeorgianMobileNumber(tel);
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