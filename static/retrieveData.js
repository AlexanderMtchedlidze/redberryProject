document.addEventListener("DOMContentLoaded", () => {
    window.onload = () => {
        retrieveFirstName();
        retrieveLastName();
        retrieveImage();
        retrieveAboutMe();
        retrieveTel();
        retrieveEmail();
    }
})

function retrieveFirstName() {
    let nameInput = document.getElementById("nameInput");
    let firstName = localStorage.getItem("resumeFirstName");
    let resumeFirstName = document.getElementById("resumeFirstName");
    nameInput.value = firstName;
    resumeFirstName.innerHTML = firstName;
}

function retrieveLastName() {
    let lastNameInput = document.getElementById("lastNameInput");
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

function retrieveAboutMe() {
    let aboutMeInput = document.getElementById("aboutMeInput");
    let aboutMe = localStorage.getItem("resumeAboutMe");
    let resumeAboutMe = document.getElementById("resumeAboutMe");
    let resumeAboutMeTitle = document.getElementById("resumeAboutMeTitle");
    aboutMeInput.value = aboutMe;
    resumeAboutMe.innerHTML = aboutMe;
    if (aboutMe != null && aboutMe.trim().length > 0) {
        resumeAboutMeTitle.style.display = "unset"
    }
}

function retrieveTel() {
    let telInput = document.getElementById("telInput");
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

function retrieveEmail() {
    let emailInput = document.getElementById("emailInput");
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