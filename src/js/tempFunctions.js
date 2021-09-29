//This is a temporary javascript file before everything is rebuilt using MVC

//Login
const loginPanel = document.getElementById('loginContainer');
const loginBtn = document.getElementById('loginBtn');
const loginForm = document.getElementById('loginForm');
const loginSubmit = document.getElementById('loginSubmitButton');
const loginCancel = document.getElementById('loginCancelButton');
const loginHeader = document.getElementById('loginHeader');

//Sign up
const signupBtn = document.getElementById('signupBtn');
const signupSubmit = document.getElementById('signupSubmitButton');
const signupCancel = document.getElementById('signupCancelButton');
const signupForm = document.getElementById('signupForm');
const signupHeader = document.getElementById('signupHeader');

//Model
const modelInst = model;

/*
Resets Panel
*/
function hidePanel() {
    loginPanel.classList.add("hidden");
    loginForm.classList.add('hidden');
    loginHeader.classList.add('hidden');
    signupForm.classList.add('hidden');
    signupHeader.classList.add('hidden');
}

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
    console.log("Attempting Login")
    login(loginForm.username.value, loginForm.password.value);
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
        console.log("Creating user...")
        makeUser(username, password);
        hidePanel();
    }
});

loginCancel.addEventListener('click', event => {
    event.preventDefault();
    hidePanel();
});

signupCancel.addEventListener('click', event => {
    event.preventDefault();
    hidePanel();
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

function login(username, password) {
    let inputName = username;
    let inputPass = password;

    let user = null;

    try {
        user = modelInst.users.find(user => user.name === inputName);
    } catch (error) {
        console.log(error);
    }

    if (user == null) {
        console.log("User not found");
        return;
    }

    if (user.password !== inputPass) {
        console.log("Incorrect Password");
        return;
    }

    if (user.password === inputPass && user.name === inputName) {
        console.log("Login Successful.")
        displayLogin(user);
        hidePanel();
    }
}

function displayLogin(user) {
    let accountDisplay = document.getElementById("accountDiv");
    let loginDiv = document.getElementById("loginDiv");
    let nameSpan = document.getElementById("displayName");

    loginDiv.classList.add("hidden");
    accountDisplay.classList.remove("hidden");
    nameSpan.innerText = user.name;
}