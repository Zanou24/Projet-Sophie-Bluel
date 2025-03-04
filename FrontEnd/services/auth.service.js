export function login(email, password) {
    return fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    }).then(response => response.json())
}
export function getToken() {
    return localStorage.getItem('token')
}