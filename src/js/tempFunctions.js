//Login Form
const loginPanel = document.getElementById('loginContainer');
const loginBtn = document.getElementById('loginBtn');
const loginForm = document.getElementById('loginForm');
const loginSubmit = document.getElementById('submitButton');


loginBtn.addEventListener('click', event => {
    console.log("test");
    loginPanel.classList.remove('hidden');
});

loginSubmit.addEventListener('click', event => {
    event.preventDefault();
    let username = loginForm.username.value;
    let password = loginForm.password.value;

    console.log(username, password);
});