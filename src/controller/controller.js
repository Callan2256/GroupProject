window.addEventListener("load", getProducts);

//Login / Logout
const loginPanel = document.getElementById("loginContainer");
const loginBtn = document.getElementById("loginBtn");
const loginForm = document.getElementById("loginForm");
const loginSubmit = document.getElementById("loginSubmitButton");
const loginCancel = document.getElementById("loginCancelButton");
const loginHeader = document.getElementById("loginHeader");
const logoutBtn = document.getElementById("logoutBtn");

//Sign up
const signupBtn = document.getElementById("signupBtn");
const signupSubmit = document.getElementById("signupSubmitButton");
const signupCancel = document.getElementById("signupCancelButton");
const signupForm = document.getElementById("signupForm");
const signupHeader = document.getElementById("signupHeader");

//Model
const modelInst = model;

//Add Product
let productForm = document.getElementById("productForm");
let addProductSubmit = document.getElementById("addProductSubmit");

//Encryption

/*
Resets Panel
*/
function hidePanel() {
    loginPanel.classList.add("hidden");
    loginForm.classList.add("hidden");
    loginHeader.classList.add("hidden");
    signupForm.classList.add("hidden");
    signupHeader.classList.add("hidden");
}

/*
Shows Login Variation of login panel
*/
loginBtn.addEventListener("click", (event) => {
    console.log("Login");
    loginPanel.classList.remove("hidden");
    loginForm.classList.remove("hidden");
    loginHeader.classList.remove("hidden");
});

logoutBtn.addEventListener("click", (event) => {
    logout();
});

/*
Shows Sign up Variation of login panel
*/
signupBtn.addEventListener("click", (event) => {
    console.log("Signup");
    loginPanel.classList.remove("hidden");
    signupForm.classList.remove("hidden");
    signupHeader.classList.remove("hidden");
});

/*
Listens for submit button press on login panel and handles user input
*/
loginSubmit.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("Attempting Login");
    login(loginForm.username.value, loginForm.password.value);
});

/*
Listens for submit button press on sign up panel and handles user input
*/
signupSubmit.addEventListener("click", (event) => {
    event.preventDefault();
    let username = signupForm.username.value;
    let password = signupForm.password.value;
    let confirmPassword = signupForm.confirmPassword.value;

    if (password !== confirmPassword) {
        console.log("Passwords dont match.");
    } else {
        console.log("Creating user...");
        let id = (Math.random() * Date.now()).toString().substring(0, 7);

        //POST Request
        let xhr = new XMLHttpRequest();
        xhr.open("POST", '/api/users', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            "id": id,
            "username": username,
            "password": password
        }));

        clearFields();
        hidePanel();
    }
});

loginCancel.addEventListener("click", (event) => {
    event.preventDefault();
    hidePanel();
});

signupCancel.addEventListener("click", (event) => {
    event.preventDefault();
    hidePanel();
});

function login(username, password) {
    let inputName = username;
    let inputPass = password;

    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open("POST", "/login", FontFaceSetLoadEvent);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        "username": inputName,
        "password": inputPass
    }));

    xhr.onload = () => {
        if (xhr.readyState === 4) {

            if (xhr.status == 200) {
                let res = xhr.response;
                console.log(res)
                console.log("Login Successful.");
                displayLogin(new user(res.id, res.username, "", res.admin));
                hidePanel();
                clearFields();
            } else if (xhr.status == 400) {
                console.log("Error Logging In, Please Check Username And Password");
            }
        }
    }
}

/* */
function logout() {
    let accountDisplay = document.getElementById("accountDiv");
    let loginDiv = document.getElementById("loginDiv");
    let nameSpan = document.getElementById("displayName");

    loginDiv.classList.remove("hidden");
    accountDisplay.classList.add("hidden");
    nameSpan.innerText = "";
    clearFields();
}

/*
Displays the logged in users name 
*/
function displayLogin(user) {
    let accountDisplay = document.getElementById("accountDiv");
    let loginDiv = document.getElementById("loginDiv");
    let nameSpan = document.getElementById("displayName");

    loginDiv.classList.add("hidden");
    accountDisplay.classList.remove("hidden");
    nameSpan.innerText = user.name;
}

function getProducts() {
    console.log("test");

    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open("GET", "/api/products", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();

    xhr.onload = () => {
        if (xhr.readyState === 4) {

            if (xhr.status == 200) {
                let res = xhr.response;
                //console.log(res)
                console.log("Fetched Products");
                saveProducts(res);

            } else if (xhr.status == 400) {
                console.log("Could Not Fetch Products");
            }
        }
    }
}


function saveProducts(res) {
    let obj = JSON.parse(res);

    for (let i in obj) {
        let product = {
            "name": i.name,
            "price": i.price,
            "description": i.description
        }

        model.items.push(product);
    }
}
/*
Clearing the form fields for login / logout
*/
function clearFields() {
    loginForm.username.value = "";
    loginForm.password.value = "";

    signupForm.username.value = "";
    signupForm.password.value = "";
    signupForm.confirmPassword.value = "";
}