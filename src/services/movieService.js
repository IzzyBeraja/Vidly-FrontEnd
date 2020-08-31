import { getGenres } from "./genreService";
import httpService from './httpService'
import config from "./config.json"

export function getMovies() {
  return httpService.get(`${config.apiEndpoint}/Movie`);
}

export function getMovie(id) {
  return httpService.get(`${config.apiEndpoint}/Movie/${id}`);;
}

export function saveMovie(movie) {
    const payload = {
        'title': movie.title,
        'genre': getGenres().filter(g => g.id === movie.genreId),
        'numberInStock': movie.numberInStock,
        'dailyRentalRate': movie.dailyRentalRate
    }

    return httpService.post(`${config.apiEndpoint}/Movie`, payload)
}

export function deleteMovie(id) {
  return httpService.delete(`${config.apiEndpoint}/Movie/${id}`);
}
