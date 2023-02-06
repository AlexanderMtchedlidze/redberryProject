document.addEventListener("DOMContentLoaded", () => {
    let goBack = document.getElementById("goBack");
    goBack.addEventListener("click", clearLocalStorage);
})

function clearLocalStorage() {
    localStorage.clear();
}