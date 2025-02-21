
const loginLink = document.getElementById('log')
const loginHideSection = document.getElementById('login-hide')
const loginMenu = document.getElementById('login')
let isHidden = false

loginLink.addEventListener('click', function () {
    isHidden = !isHidden;
    if (isHidden) {
        loginHideSection.classList.add('login-hide')
        loginMenu.classList.add('login-pressed')
    } else {
        loginHideSection.classList.remove('login-hide')
        loginMenu.classList.remove('login-pressed')
    }
})