export const getAllMovies = () => fetch('https://api.nomoreparties.co/beatfilm-movies').then(res => res.json())
