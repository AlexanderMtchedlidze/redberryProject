let counter = 0;

document.addEventListener("DOMContentLoaded", () => {
    let positionInput = document.getElementById("positionInput");
    let employerInput = document.getElementById("employerInput");
    let positionDescription = document.getElementById("positionDescription");

    positionInput.addEventListener("input", positionInputValidation);
    employerInput.addEventListener("input", employerInputValidation);
    positionDescription.addEventListener("input", positionDescriptionValidation);
    document.getElementById("addExperience").addEventListener("click", addExperienceForm);
    let next = document.getElementById("toEducationButton");
    next.addEventListener("click", preventEducationNav);

    window.onload = () => {
        retrieveFirstName();
        retrieveLastName();
        retrieveImage();
        retrieveAboutMe();
        retrieveTel();
        retrieveEmail();
        retrievePosition();
        retrieveEmployer();
        retrieveStartDate();
        retrieveEndDate();
        retrievePositionDescription();
        retrieveCreatedExperience();
        checkInputValidity();
        document.querySelectorAll(".positionInput").forEach(element => {
            element.addEventListener("input", positionInputValidation);
        })
        document.querySelectorAll(".employerInput").forEach(element => {
            element.addEventListener("input", employerInputValidation);
        })
        document.querySelectorAll(".positionDescription").forEach(element => {
            element.addEventListener("input", positionDescriptionValidation);
        })
    }
})

function preventEducationNav(e) {
    let positionInput = document.getElementById("positionInput");
    let positionVal = JSON.parse(localStorage.getItem("positionVal"));
    if (!positionVal) {
        e.preventDefault();
        positionInput.classList.add("is-invalid");
    }
    let employerInput = document.getElementById("employer");
    let employerVal = JSON.parse(localStorage.getItem("employerVal"));
    if (!employerVal) {
        e.preventDefault();
        employerInput.classList.add("is-invalid");
    }
    let startTimeInput = document.getElementById("startDate");
    let startTimeVal = localStorage.getItem("startDateValidation");
    if (!startTimeVal) {
        e.preventDefault();
        startTimeInput.style.borderColor = "#F93B1D"
        startTimeInput.style.outlineColor = "#F93B1D"
    }
    let endTimeInput = document.getElementById("endDate");
    let entTimeVal = localStorage.getItem("endDateValidation");
    if (!entTimeVal) {
        e.preventDefault();
        endTimeInput.style.borderColor = "#F93B1D"
        endTimeInput.style.outlineColor = "#F93B1D"
    }
    let positionDesInput = document.getElementById("positionDescription");
    let positionDesVal = JSON.parse(localStorage.getItem("positionDescriptoinResult"));
    if (!positionDesVal) {
        e.preventDefault();
        positionDesInput.style.borderColor = "#F93B1D"
        positionDesInput.style.outlineColor = "#F93B1D"
    }
}


function positionDescriptionValidation(e) {
    checkInputs()
    let positionDescription = e.target.value;
    let resumePositionDescription = document.getElementById("resumePositionDescription");
    resumePositionDescription.style.display = "unset";
    resumePositionDescription.innerHTML = positionDescription;

    let result = false;
    if (positionDescription.trim().length > 0) {
        result = true;
        document.getElementById("experienceTitle").style.display = "unset";
        e.target.style.outline = "0.5px solid #98E37E"
        e.target.style.border = "0.5px solid #98E37E"
    } else {
        e.target.style.outline = "0.5px solid #EF5050"
        e.target.style.border = "0.5px solid #EF5050"
    }

    localStorage.setItem("positionDescription", positionDescription);
    localStorage.setItem("positionDescriptoinResult", result);
}

function positionInputValidation(e) {
    checkInputs()
    let position = e.target.value;
    let resumePositon = document.getElementById("position");
    resumePositon.style.display = "unset";
    resumePositon.innerHTML = position;

    let result = inputValidation(e, position);
    localStorage.setItem("position", position);
    localStorage.setItem("positionVal", result);
}

function employerInputValidation(e) {
    checkInputs()
    let employer = e.target.value;
    let resumeEmployer = document.getElementById("employer");
    resumeEmployer.style.display = "unset";
    resumeEmployer.innerHTML = ", " + employer;

    let result = inputValidation(e, employer);
    localStorage.setItem("employer", employer)
    localStorage.setItem("employerVal", result);
}

function inputValidation(e, value) {
    if (value.trim().length > 1) {
        document.getElementById("experienceTitle").style.display = "unset";
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


function checkInputs() {
    let inputs = document.querySelectorAll("input");
    let positionDescription = document.getElementById("positionDescription");
    let isValid = true;
    for (let i = 0; i < inputs.length; i++) {
        if (!inputs[i].value.trim().length > 0 || !positionDescription.value.trim().length > 0) {
            isValid = false;
            document.getElementById("experience").classList.remove("light-bottom-border");
            break;
        }
    }
    if (isValid) {
        document.getElementById("experience").classList.add("light-bottom-border");
    }
}

function addExperienceForm() {
    const experienceDescription = document.getElementById("newExperienceDescription");

    // Create the position input
    const positionInput = document.createElement("input");
    positionInput.type = "text";
    positionInput.classList.add("form-control", "form-control-lg", "positionInput");
    positionInput.placeholder = "დეველოპერი, დიზაინერი, ა.შ.";
    positionInput.setAttribute("aria-label", "Position");

    // Create the label for the position input
    const positionLabel = document.createElement("label");
    positionLabel.htmlFor = "positionInput";
    positionLabel.classList.add("form-label");
    positionLabel.textContent = "თანამდებობა";

    // create help text
    const positionHelpText = document.createElement("div");
    positionHelpText.classList.add("form-text");
    positionHelpText.textContent = "მინიმუმ ორი სიმბოლო"

    // Create the div for the position input
    const positionDiv = document.createElement("div");
    positionDiv.classList.add("mb-4", "mt-4");
    positionDiv.appendChild(positionLabel);
    positionDiv.appendChild(positionInput);
    positionDiv.appendChild(positionHelpText);

    // Create the employer input
    const employerInput = document.createElement("input");
    employerInput.type = "text";
    employerInput.classList.add("form-control", "form-control-lg", "employerInput");
    employerInput.placeholder = "დამსაქმებელი";
    employerInput.setAttribute("aria-label", "Employer");

    // Create the label for the employer input
    const employerLabel = document.createElement("label");
    employerLabel.htmlFor = "employerInput";
    employerLabel.classList.add("form-label");
    employerLabel.textContent = "დამსაქმებელი";

    // create help text
    const employerHelpText = document.createElement("div");
    employerHelpText.classList.add("form-text");
    employerHelpText.textContent = "მინიმუმ ორი სიმბოლო"

    // Create the div for the employer input
    const employerDiv = document.createElement("div");
    employerDiv.classList.add("mb-4");
    employerDiv.appendChild(employerLabel);
    employerDiv.appendChild(employerInput);
    employerDiv.appendChild(employerHelpText)

    // Create the start date input
    const startDateInput = document.createElement("input");
    startDateInput.type = "text";
    startDateInput.classList.add("form-control", "form-control-lg", "startDate");
    startDateInput.placeholder = "mm / dd / yyyy";
    startDateInput.setAttribute("aria-label", "Start Date");

    // create col for the start date
    const startDateCol = document.createElement("div");
    startDateCol.classList.add("col")

    // Create the label for the start date input
    const startDateLabel = document.createElement("label");
    startDateLabel.htmlFor = "date";
    startDateLabel.classList.add("form-label");
    startDateLabel.textContent = "დაწყების რიცხვი";

    // Create the div for the start date input
    const startDateDiv = document.createElement("div");
    startDateDiv.classList.add("mb-4");
    startDateDiv.appendChild(startDateLabel);
    startDateDiv.appendChild(startDateInput);

    // create col for the end date
    const endDateCol = document.createElement("div");
    endDateCol.classList.add("col")

    const endDateInput = document.createElement("input");
    endDateInput.type = "text";
    endDateInput.classList.add("form-control", "form-control-lg", "date", "endDate");
    endDateInput.placeholder = "mm / dd / yyyy";

    const endDateLabel = document.createElement("label");
    endDateLabel.htmlFor = "date";
    endDateLabel.textContent = "დამთავრების რიცხვი";

    startDateCol.append(startDateLabel, startDateInput)
    endDateCol.append(endDateLabel, endDateInput);

    const dateDiv = document.createElement("div");
    dateDiv.classList.add("row", "mb-4");
    dateDiv.append(startDateCol, endDateCol);

    const descriptionLabel = document.createElement("label");
    descriptionLabel.htmlFor = "positionDescription";
    descriptionLabel.classList.add("form-label");
    descriptionLabel.textContent = "აღწერა";

    const descriptionInput = document.createElement("textarea");
    descriptionInput.classList.add("form-control", "form-control-lg", "positionDescription");
    descriptionInput.rows = 3;
    descriptionInput.placeholder = "როლი თანამდებობაზე და ზოგადი აღწერა";

    const descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("mb-4");
    descriptionDiv.appendChild(descriptionLabel);
    descriptionDiv.appendChild(descriptionInput)

    const createdExperienceDiv = document.createElement("div");
    const key = generateRandomString()
    createdExperienceDiv.classList.add(`createdExperienceDiv-${key}`);
    createdExperienceDiv.append(positionDiv, employerDiv, dateDiv, descriptionDiv);

    experienceDescription.append(createdExperienceDiv);
    
    positionInput.addEventListener("input", (e) => {
        document.querySelector(`.positionPlaceholder_${key}`).innerHTML = e.target.value;
    })

    employerInput.addEventListener(input)

    const divKey = `experienceDiv-${generateRandomString()}`;
    localStorage.setItem(divKey, createdExperienceDiv.outerHTML);
    createExperience(key)
}

// Function to generate a random string
const generateRandomString = () => {
    return Math.random().toString(36).substring(2, 15);
};

function retrieveCreatedExperience() {
    const keys = Object.keys(localStorage).filter(key => key.startsWith('experienceDiv-'));
    const keys2 = Object.keys(localStorage).filter(key => key.startsWith("createdExperience-"))
    // Iterate over the keys and retrieve the div elements from local storage
    keys.forEach(key => {
        const divString = localStorage.getItem(key);
        const experienceDescription = document.getElementById("newExperienceDescription");
        experienceDescription.innerHTML += divString;
    });

    keys2.forEach(key => {
        const divString = localStorage.getItem(key);
        const experienceDescription = document.getElementById("experience");
        experienceDescription.innerHTML += divString;
    });
}

function checkInputValidity() {
    let inputs = document.querySelectorAll("input");
    for (let i = 0; i < inputs.length; i++) {
        if (!inputs[i].value.trim().length > 0) {
            document.querySelector("#experience").classList.remove("light-bottom-border");
            break;
        }
    }
    document.querySelector("#experience").classList.add("light-bottom-border")
}


function retrieveFirstName() {
    let nameInput = document.getElementById("nameInput");
    let firstName = localStorage.getItem("resumeFirstName");
    let resumeFirstName = document.getElementById("resumeFirstName");
    if (nameInput) {
        nameInput.value = firstName;
    }
    resumeFirstName.innerHTML = firstName;
}

function retrieveLastName() {
    let lastNameInput = document.getElementById("lastNameInput");
    let lastName = localStorage.getItem("resumeLastName");
    let resumeLastName = document.getElementById("resumeLastName");
    if (lastNameInput) {
        lastNameInput.value = lastName;
    }
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
    if (aboutMeInput) {
        aboutMeInput.value = aboutMe;
    }
    resumeAboutMe.innerHTML = aboutMe;
    if (aboutMe != null && aboutMe.trim().length > 0) {
        resumeAboutMeTitle.style.display = "unset"
    }
}

function retrieveTel() {
    let telInput = document.getElementById("telInput");
    let tel = localStorage.getItem("resumeTel");
    let resumeTel = document.getElementById("resumeTel");
    let telIcon = document.getElementById("telIcon");
    if (telInput) {
        telInput.value = tel;
    }
    resumeTel.innerHTML = tel;
    if (tel && tel.trim().length > 0) {
        telIcon.style.display = "block";
    }
}

function retrieveEmail() {
    let emailInput = document.getElementById("emailInput");
    let email = localStorage.getItem("resumeEmail");
    let resumeEmail = document.getElementById("resumeEmail");
    let envelopeIcon = document.getElementById("envelopeIcon");
    if (emailInput) {
        emailInput.value = email;
    }
    resumeEmail.innerHTML = email;
    if (email && email.trim().length > 0) {
        envelopeIcon.style.display = "block";
    }
}
function retrievePosition() {
    let positionInput = document.getElementById("positionInput");
    let position = localStorage.getItem("position");
    let resumePosition = document.getElementById("position");
    if (position) {
        positionInput.value = position;
    }
    resumePosition.innerHTML = position;
}

function retrieveEmployer() {
    let employerInput = document.getElementById("employerInput");
    let employer = localStorage.getItem("employer");
    let resumeEmployer = document.getElementById("employer");
    if (employer) {
        employerInput.value = employer;
    }
    resumeEmployer.innerHTML = employer;
}

function retrieveStartDate() {
    let startDate = localStorage.getItem('startDate');
    let startDateInput = document.getElementById("startDate")
    let resumeStartDate = document.getElementById("startTime")
    if (startDate) {
        startDateInput.value = startDate;
    }
    resumeStartDate.innerHTML = startDate;
}


function retrieveEndDate() {
    let endDate = localStorage.getItem('endDate');
    let endDateInput = document.getElementById("endDate")
    let resumeEndDate = document.getElementById("endTime")
    if (endDate) {
        endDateInput.value = endDate;
    }
    resumeEndDate.innerHTML = endDate;
}

function retrievePositionDescription() {
    let positionDes = localStorage.getItem("positionDescription");
    let positionInput = document.getElementById("positionDescription");
    let resumePositionDes = document.getElementById("resumePositionDescription");
    if (positionDes) {
        positionInput.value = positionDes;
    }
    resumePositionDes.innerHTML = positionDes;
}


function createExperience(key) {
    let experience = document.createElement('div');
    experience.className = "pb-2";

    let experienceTitle = document.createElement('div');
    experienceTitle.className = "mt-3";

    let h5 = document.createElement('h5');
    h5.innerHTML = "გამოცდილება";

    experienceTitle.appendChild(h5);
    experience.appendChild(experienceTitle);

    let dFlex = document.createElement('div');
    dFlex.className = "d-flex";
    dFlex.style.fontWeight = "bold";

    let position = document.createElement('div');
    position.classList.add(`positionPlaceholder_${key}`)

    let employer = document.createElement('div');
    employer.classList.add(`employerPlaceholder_${key}`)

    dFlex.appendChild(position);
    dFlex.appendChild(employer);
    experience.appendChild(dFlex);

    let dFlexSecondary = document.createElement('div');
    dFlexSecondary.className = "d-flex text-secondary";

    let startTime = document.createElement('div');
    startTime.classList.add(`startTime_${key}`, "me-2");

    let endTime = document.createElement('div');
    startTime.classList.add(`endTime_${key}`);

    dFlexSecondary.appendChild(startTime);
    dFlexSecondary.appendChild(endTime);
    experience.appendChild(dFlexSecondary);

    let resumePositionDescription = document.createElement('div');
    resumePositionDescription.id = "resumePositionDescription";
    resumePositionDescription.classList.add(`$positionDescription_${key}`, "mt-2");

    experience.appendChild(resumePositionDescription);

    let experienceDiv = document.querySelector(".resumeInformation")

    experienceDiv.appendChild(experience);
    localStorage.setItem(`createdExperience-${key}`, experience.outerHTML);
}