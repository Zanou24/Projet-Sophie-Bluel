import * as auth from "./auth.service.js"

const url = "http://localhost:5678/api"
export function getAllItems() {
    return fetch(`${url}/works`).then(response => { return response.json() })
}

export function Delete(id) {
    return fetch(`${url}/works/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${auth.getToken()}`
        }
    })
}
export function getCategories() {
    return fetch(`${url}/categories`).then(response => { return response.json() })
}
export function createWork(title, categoryId, image) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', categoryId);
    formData.append('image', image);
    return fetch(`${url}/works`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${auth.getToken()}`,
        },
        body: formData
    })
}   