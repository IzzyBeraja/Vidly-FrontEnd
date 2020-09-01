import { getGenres } from "./genreService";
import httpService from './httpService'
import config from "./config.json"

const movieDefaultRoute = `${config.apiEndpoint}/Movies`;

export function getMovies() {
    return httpService.get(movieDefaultRoute);
}

export function getMovie(id) {
    return httpService.get(`${movieDefaultRoute}/${id}`);;
}

export function saveMovie(movie) {
    const payload = {
        'title': movie.title,
        'genre': getGenres().filter(g => g.id === movie.genreId),
        'numberInStock': movie.numberInStock,
        'dailyRentalRate': movie.dailyRentalRate
    }

    return httpService.post(movieDefaultRoute, payload)
}

export function deleteMovie(id) {
    return httpService.delete(`${movieDefaultRoute}/${id}`);
}
