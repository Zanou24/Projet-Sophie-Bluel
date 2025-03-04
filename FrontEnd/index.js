import * as api from "./services/api.service.js"
import * as auth from "./services/auth.service.js"

const filterElementAll = document.getElementById("tous")
const loginLink = document.getElementById('log')
const loginHide = document.querySelector('main')
const loginMenu = document.getElementById('login')
const form = document.querySelector('form')
const emailInput = document.querySelector('#email');
const gallery = document.querySelector(".gallery")
const passwordInput = document.querySelector('#mdp');
const filters = document.getElementById('filters')
const galleryModale = document.getElementById('gallery-modale')
const btnCloseModale = document.getElementById('close-modale')
const addImage = document.getElementById('add-image')
const body = document.querySelector('body')
const modale = document.getElementById('background-modale')
const contentModale = document.getElementById('modale')
const modifyGallery = document.getElementById('gallery-modale-modify')
let token = null;

function whenLogged() {
    displayBtnFilters(false)
}
function whenUnlogged() {
    displayBtnFilters(true)
}
function isLogged() { return !!auth.getToken() }
function refreshLoginLink() {
    loginLink.innerText = isLogged() ? "logout" : "login"
}
function formatOneItem(item) {
    // Retourne le code HTML d'un élément de la galerie
    return `<figure>
                <img src="${item.imageUrl}" alt="${item.title}">
                <figcaption>${item.title}</figcaption>
            </figure>`
}
function refreshListHTML(data) {
    let liste = []
    for (const item of data) {
        liste.push(formatOneItem(item))
    }
    // Mets à jour le conteneur de la galerie
    gallery.innerHTML = liste.join(" ")
}
function displayBtnFilters(display) {
    const btnFilters = document.getElementById("btn-filters")
    btnFilters.style.display = display ? "flex" : "none"
}

function getImageModale() {
    api.getAllItems().then(
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
                    api.Delete(id).then(data => { console.log(`Client ${id} supprimé`); getImageModale() })
                })
            }
        })

}
function deleteWork(id) {
    api.Delete(id).then(data => { console.log(`Client ${id} supprimé`); getImageModale() })
}
function displayModale(display) {
    modale.style.display = display ? "flex" : "none"
}
function refreshList() {
    api.getAllItems().then((res) => {
        refreshListHTML(res)
    })
}

loginLink.addEventListener('click', function () {
    console.log(isLogged())
    if (isLogged()) {
        localStorage.removeItem("token")
        whenUnlogged()
        refreshLoginLink()
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
        auth.login(email, password)
        const data = await auth.login(email, password);
        console.log(data)
        if (data.token != undefined) {
            localStorage.setItem("token", data.token)
            loginHide.classList.remove('login-hide')
            loginMenu.classList.remove('login-pressed')
            refreshLoginLink()
            whenLogged()
        }
    } catch (error) {
        console.log(error);
    }
});
filterElementAll.addEventListener("click", () => {
    refreshList()
})

btnCloseModale.addEventListener("click", () => { displayModale(false) })
modale.addEventListener("click", () => {
    displayModale(false)
})
contentModale.addEventListener("click", (event) => {
    event.stopPropagation()
})
modifyGallery.addEventListener("click", () => { displayModale(true) })
addImage.addEventListener("click", () => {
    displayModale(false)
    const ModaleDivContent = document.createElement("div")
    ModaleDivContent.id = "background-modale"
    ModaleDivContent.style.display = "flex";
    const ModaleDiv = document.createElement("div")
    ModaleDiv.id = "modale"


    // boutons de gestion de la modale
    const topActions = document.createElement("div")
    topActions.classList.add("top-actions")
    const backButton = document.createElement("button")
    backButton.innerText = "←"
    backButton.addEventListener("click", () => {
        displayModale(true)
        body.removeChild(ModaleDivContent)
    })
    const closeButton = document.createElement("button")
    closeButton.innerText = "✖"
    closeButton.addEventListener("click", () => {
        body.removeChild(ModaleDivContent)
    })
    topActions.appendChild(backButton)
    topActions.appendChild(closeButton)

    const ModaleForm = document.createElement("form")
    ModaleForm.classList.add("content-modale")
    const ModaleInput = `
    <input type="file" accept="image/*" id="input-image">
    <label for="titre">Titre</label>
	<input type="text" name="titre" id="titre">
    <label for="categorie">Catégorie</label>
    <select name="categorie" id="categorie">
    </select>
    <input type="submit" id="submit-new-work" value="Valider">
    `

    ModaleForm.classList.add("logPage")
    ModaleForm.innerHTML += ModaleInput
    ModaleDiv.appendChild(topActions)
    ModaleDiv.appendChild(ModaleForm)
    ModaleDiv.addEventListener("click", (event) => {
        event.stopPropagation()
    })
    ModaleDivContent.appendChild(ModaleDiv)
    ModaleDivContent.addEventListener("click", () => {
        body.removeChild(ModaleDivContent);
    });
    body.appendChild(ModaleDivContent)
    api.getCategories().then((res) => {
        const selectCategory = document.getElementById("categorie")
        for (const category of res) {
            const option = document.createElement("option")
            option.value = category.id
            option.innerText = category.name
            console.log(option)
            selectCategory.appendChild(option)
        }
    })
    const submitNewWork = document.getElementById("submit-new-work")
    submitNewWork.addEventListener("click", (event) => {
        event.preventDefault()
        const title = document.getElementById("titre").value
        const category = document.getElementById("categorie").value
        const image = document.getElementById("input-image").files[0]
        console.log(title, category, image)
        api.createWork(title, category, image).then((res) => {
            getImageModale()
            refreshList()
        })
    })
})
refreshLoginLink()
getImageModale()

refreshList()
api.getCategories().then((res) => {
    for (const category of res) {
        const filterElement = document.createElement("li")
        const buttonFilterElement = document.createElement("button")
        buttonFilterElement.innerText = category.name
        buttonFilterElement.addEventListener("click", () => {
            api.getAllItems().then((res) => {
                const newList = res.filter((item) => item.categoryId === category.id);
                refreshListHTML(newList)
            })
        })
        filterElement.appendChild(buttonFilterElement)
        filters.appendChild(filterElement)
    }
})