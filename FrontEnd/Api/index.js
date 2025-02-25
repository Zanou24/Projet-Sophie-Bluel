import * as api from "./api.service.js"
const loginLink = document.getElementById('log')
const loginMenu = document.getElementById('login')
const loginHide = document.querySelector('main')
function getToken() {
    return localStorage.getItem('token')
}

export function isLogged() { return !!getToken() }
export function refreshLoginLink() {
    loginLink.innerText = isLogged() ? "logout" : "login"
}
refreshLoginLink()
// La liste des éléments de la galerie
let liste = []
// Le conteneur de la galerie
const gallery = document.querySelector(".gallery")


/**
 * Formate un élément de la galerie
 */
function formatOneItem(item) {
    // Retourne le code HTML d'un élément de la galerie
    return `<figure>
				<img src="${item.imageUrl}" alt="${item.title}">
				<figcaption>${item.title}</figcaption>
			</figure>`
}


/**
 * Récupère la liste des éléments de la galerie
 */
function getAll(json = false) {
    // Récupère la liste des éléments de la galerie via l'API
    return api.getAllItems()
        .then((res) => {
            // Vide la liste
            liste = []
            if (json) {
                // Si on veut la liste en JSON, on la renvoie
                return res
            }
            // Sinon, on la met à jour dans le conteneur de la galerie
            for (const item of res) {
                liste.push(formatOneItem(item))

            }
            // Mets à jour le conteneur de la galerie
            gallery.innerHTML = liste.join(" ")
        })
}

/**
 * Filtre la liste des éléments de la galerie en fonction de la catégorie
 * @param {number} categorie - L'ID de la catégorie
 * @returns {Promise<void>}
 */
function getWithFilter(categorie) {
    // Récupère la liste des éléments de la galerie via l'API
    getAll(true).then((res) => {
        // Filtre la liste en fonction de la catégorie
        const newList = res.filter((item) => item.categoryId == categorie);
        // Vide la liste
        liste = []
        for (const item of newList) {
            liste.push(formatOneItem(item))

        }
        // Mets à jour le conteneur de la galerie
        gallery.innerHTML = liste.join(" ")

    })
}

// Appel la fonction pour afficher la galerie
getAll()

// Ajoute un événement sur le bouton "Tous"
const filterElementAll = document.getElementById("tous")
filterElementAll.addEventListener("click", () => {
    // Affiche la galerie complète
    getAll()
})
// Ajoute un événement sur le bouton "Objets"
const filterElement1 = document.getElementById("obj")
filterElement1.addEventListener("click", () => {
    // Filtre la liste en fonction de la catégorie 1
    getWithFilter(1)
})
// Ajoute un événement sur le bouton "Appartements"
const filterElement2 = document.getElementById("appart")
filterElement2.addEventListener("click", () => {
    // Filtre la liste en fonction de la catégorie 2
    getWithFilter(2)
})
// Ajoute un événement sur le bouton "Hotels & Restaurants"
const filterElement3 = document.getElementById("H&R")
filterElement3.addEventListener("click", () => {
    // Filtre la liste en fonction de la catégorie 3
    getWithFilter(3)
})

function displayBtnFilters(display) {
    const btnFilters = document.getElementById("btn-filters")
    btnFilters.style.display = display ? "flex" : "none"
}
export function whenLogged() {
    displayBtnFilters(false)
}
export function whenUnlogged() {
    displayBtnFilters(true)
}
const btnCloseModale = document.getElementById('close-modale')
const modale = document.getElementById('background-modale')
const contentModale = document.getElementById('modale')

function displayModale(display) {
    modale.style.display = display ? "flex" : "none"
}
btnCloseModale.addEventListener("click", () => { displayModale(false) })
modale.addEventListener("click", () => {
    displayModale(false)
})
contentModale.addEventListener("click", (event) => {
    event.stopPropagation()
})
const galleryModale = document.getElementById('gallery-modale')
function getImage() {
    getAll(true).then(
        (res) => {
            console.log(res)
            let liste = []
            for (const item of res) {
                liste.push(`<div class="img-modale" style="background-image: url('${item.imageUrl}');">
                    <button data-id="${item.id}" class="delete-button"><i class="fa-solid fa-trash-can"></i></button>
                    </div>`)
            }
            galleryModale.innerHTML = liste.join(" ")
            const listDeleteBTN = document.querySelectorAll(".img-modale .delete-button")
            for (const button of listDeleteBTN) {
                button.addEventListener("click", () => {
                    const id = button.getAttribute("data-id")
                    supprimer(id)
                })
            }
        })

}
getImage()

function supprimer(id) {
    fetch('http://localhost:5678/api/works/' + id, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
        .then(data => {
            console.log(`Client ${id} supprimé`)
            getImage()
        })
        .catch(error => {
            console.error(error)
        })

}
const modifyGallery = document.getElementById('gallery-modale-modify')
modifyGallery.addEventListener("click", () => { displayModale(true) })