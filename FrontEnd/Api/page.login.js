import * as index from "./index.js"
const loginLink = document.getElementById('log')
const loginHide = document.querySelector('main')
const loginMenu = document.getElementById('login')
const form = document.querySelector('form')
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#mdp');
let token = null;

loginLink.addEventListener('click', function () {
    console.log(index.isLogged())
    if (index.isLogged()) {
        localStorage.removeItem("token")
        index.whenUnlogged()
        index.refreshLoginLink()
    } else {
        loginHide.classList.toggle('login-hide')
        loginMenu.classList.toggle('login-pressed')
    }
})
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
        const response = await fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        const data = await response.json();
        console.log(data)
        if (data.token != undefined) {
            localStorage.setItem("token", data.token)
            loginHide.classList.remove('login-hide')
            loginMenu.classList.remove('login-pressed')
            index.refreshLoginLink()
            index.whenLogged()
        }
        console.log(token);
    } catch (error) {
        console.log(error);
    }


});
