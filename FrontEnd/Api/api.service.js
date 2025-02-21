/**
 * Récupère la liste des éléments de la galerie
 * @returns {Promise<Array<Item>>} La liste des éléments de la galerie
 */
export function getAllItems() {
    const url = "http://localhost:5678/api/works"
    // On utilise la méthode fetch pour récupérer la liste des éléments
    // La méthode fetch retourne une promesse qui contient la réponse
    // On utilise la méthode then pour traiter la réponse
    return fetch(url)
        .then(response => {
            // On utilise la méthode json() pour parser le contenu de la réponse en JSON
            // La méthode json() retourne une promesse qui contient le résultat du parsing
            return response.json()
        })
}
