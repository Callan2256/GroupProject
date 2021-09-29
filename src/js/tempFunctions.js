//This is a temporary javascript file before everything is rebuilt using MVC

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

//Model
const modelInst = model;

/*
Shows Login Variation of login panel
*/
loginBtn.addEventListener('click', event => {
    console.log("Login");
    loginPanel.classList.remove('hidden');
    loginForm.classList.remove('hidden');
    loginHeader.classList.remove('hidden');
});

/*
Shows Sign up Variation of login panel
*/
signupBtn.addEventListener('click', event => {
    console.log("Signup");
    loginPanel.classList.remove('hidden');
    signupForm.classList.remove('hidden');
    signupHeader.classList.remove('hidden');
});

/*
Listens for submit button press on login panel and handles user input
*/
loginSubmit.addEventListener('click', event => {
    event.preventDefault();
    let username = loginForm.username.value;
    let password = loginForm.password.value;

    console.log(username, password);
});


/*
Listens for submit button press on sign up panel and handles user input
*/
signupSubmit.addEventListener('click', event => {
    event.preventDefault();
    let username = signupForm.username.value;
    let password = signupForm.password.value;
    let confirmPassword = signupForm.confirmPassword.value;

    if (password !== confirmPassword) {
        console.log("Passwords dont match.");
    } else {
        makeUser(username, password);
        console.log("Creating user...")
    }
});

/* 
Creates new user and adds to array
*/
function makeUser(name, password) {
    //Generate Unique ID
    let id = (Math.random() * Date.now()).toString().substring(0, 7);
    //Create User
    let tempUser = new user(id, name, password);
    //Add user to list
    model.add(tempUser);
    console.log(tempUser);
    console.log("User Created.")
}