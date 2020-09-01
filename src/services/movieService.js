import { getGenres } from "./genreService";
import http from './httpService'
import config from "./config.json"

const movieDefaultRoute = `${config.apiEndpoint}/Movies`;

export function getMovies() {
    return http.get(movieDefaultRoute);
}

export function getMovie(id) {
    return http.get(`${movieDefaultRoute}/${id}`);;
}

export function saveMovie(movie) {
    const payload = {
        'title': movie.title,
        'genre': getGenres().filter(g => g.id === movie.genreId),
        'numberInStock': movie.numberInStock,
        'dailyRentalRate': movie.dailyRentalRate
    }

    return http.post(movieDefaultRoute, payload)
}

export function deleteMovie(id) {
    return http.delete(`${movieDefaultRoute}/${id}`);
}
