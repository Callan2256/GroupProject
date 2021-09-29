//Login
const loginPanel = document.getElementById('loginContainer');
const loginBtn = document.getElementById('loginBtn');
const loginForm = document.getElementById('loginForm');
const loginSubmit = document.getElementById('loginSubmitButton');
const loginHeader = document.getElementById('loginHeader');

//Sign up
const signupBtn = document.getElementById('signupBtn');
const signupSubmit = document.getElementById('signupSubmitButton');
const signupForm = document.getElementById('signupForm');
const signupHeader = document.getElementById('signupHeader');


loginBtn.addEventListener('click', event => {
    console.log("Login");
    loginPanel.classList.remove('hidden');
    loginForm.classList.remove('hidden');
    loginHeader.classList.remove('hidden');
});

signupBtn.addEventListener('click', event => {
    console.log("Signup");
    loginPanel.classList.remove('hidden');
    signupForm.classList.remove('hidden');
    signupHeader.classList.remove('hidden');
});



loginSubmit.addEventListener('click', event => {
    event.preventDefault();
    let username = signupForm.username.value;
    let password = signupForm.password.value;

    console.log(username, password);
});