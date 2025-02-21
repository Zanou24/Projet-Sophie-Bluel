import * as api from "./api.service.js"
// La liste des éléments de la galerie
let liste = []
// Le conteneur de la galerie
const gallery = document.querySelector(".gallery")


/**
 * Formate un élément de la galerie
 * @param {Object} item - L'élément à formatter
 * @returns {string} Le code HTML de l'élément
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
 * @param {boolean} [json=false] - Si true, la liste est renvoyée en JSON
 * @returns {Promise<Array<HTMLElement>>} La liste des éléments de la galerie
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
