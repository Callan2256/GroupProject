const loginPanel = document.getElementById('loginContainer');
const loginBtn = document.getElementById('loginBtn');

loginBtn.addEventListener('click', event => {
    console.log("test");
    loginPanel.classList.remove('hidden');
})