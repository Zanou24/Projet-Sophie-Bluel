
const loginLink = document.getElementById('log');
const loginHideSection = document.getElementById('login-hide');
let isHidden = false;

loginLink.addEventListener('click', function () {
    isHidden = !isHidden;
    if (isHidden) {
        loginHideSection.classList.add('login-hide');
    } else {
        loginHideSection.classList.remove('login-hide');
    }
});