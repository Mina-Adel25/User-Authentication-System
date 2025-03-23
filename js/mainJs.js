var signupName = document.querySelector("#signupName");
var signupEmail = document.querySelector("#signupEmail");
var signupPassword = document.querySelector("#signupPassword");

var signinEmail = document.querySelector("#signinEmail");
var signinPassword = document.querySelector("#signinPassword");

var maseg = document.querySelector(".maseg");

var userData = JSON.parse(localStorage.getItem("userData")) || [];

var baseURL = location.pathname.split('/').slice(0, -1).join('/') || "/";

var userName = localStorage.getItem("userName");
if (userName && location.pathname.includes("home.html")) {
    document.querySelector("#h1-home").innerHTML = "Welcome " + userName;
}

function isEmpty(...fields) {
    return fields.every(field => field.value.trim() !== "");
}

function isEmailExist(email) {
    return userData.some(user => user.email.toLowerCase() === email.toLowerCase());
}

if (!userName && location.pathname.includes("home.html")) {
    location.replace(baseURL + "/index.html");
}

function isValidPassword(password) {
    return password.length >= 4; 
}
function signUP() {
    maseg.classList.add("d-none");

    if (!isEmpty(signupName, signupEmail, signupPassword)) {
        maseg.innerHTML = "All fields are required";
        maseg.classList.remove("d-none", "text-success");
        maseg.classList.add("text-danger");
        return;
    }

    if (isEmailExist(signupEmail.value)) {
        maseg.innerHTML = "Email already exists";
        maseg.classList.remove("d-none", "text-success");
        maseg.classList.add("text-danger");
        return;
    }

    if (!isValidPassword(signupPassword.value)) {
        maseg.innerHTML = "Password must be at least 4 characters";
        maseg.classList.remove("d-none", "text-success");
        maseg.classList.add("text-danger");
        return;
    }

    var user = {
        name: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value,
    };

    userData.push(user);
    localStorage.setItem("userData", JSON.stringify(userData));
    clear();

    maseg.innerHTML = "Registration successful. Redirecting...";
    maseg.classList.remove("d-none", "text-danger");
    maseg.classList.add("text-success");

    setTimeout(() => {
        location.replace(baseURL + '/index.html');
    }, 2000);
}

function clear() {
    signupName.value = "";
    signupEmail.value = "";
    signupPassword.value = "";
}

function login() {
    if (!isEmpty(signinEmail, signinPassword)) {
        maseg.innerHTML = "All fields are required";
        maseg.classList.remove("d-none", "text-success");
        maseg.classList.add("text-danger");
        return;
    }

    var user = userData.find((x) =>
        x.email.toLowerCase() === signinEmail.value.toLowerCase() && x.password === signinPassword.value
    );

    if (user) {
        maseg.innerHTML = "Login successful. Redirecting...";
        maseg.classList.remove("d-none", "text-danger");
        maseg.classList.add("text-success");

        setTimeout(() => {
            localStorage.setItem("userName", user.name);
            location.replace(baseURL + "/home.html");
        }, 2000);
    } else {
        maseg.innerHTML = "Incorrect email or password";
        maseg.classList.remove("d-none", "text-success");
        maseg.classList.add("text-danger");
    }
}

function logout() {
    localStorage.removeItem('userName');
    location.replace(baseURL + '/index.html');
}
