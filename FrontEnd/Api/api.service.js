/**
 * Récupère la liste des éléments de la galerie
 */
export function getAllItems() {
    const url = "http://localhost:5678/api/works"
    return fetch(url).then(response => { return response.json() })
}

