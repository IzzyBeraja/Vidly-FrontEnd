import { getGenres } from "./genreService";
import http from "./httpService";
import { apiEndpoint } from "./config.json";

const movieUrl = `${apiEndpoint}/Movies`;

export function getMovies() {
  return http.get(movieUrl);
}

export function getMovie(id) {
  return http.get(`${movieUrl}/${id}`);
}

export function saveMovie(movie) {
  const payload = {
    title: movie.title,
    genre: getGenres().filter(g => g.id === movie.genreId),
    numberInStock: movie.numberInStock,
    dailyRentalRate: movie.dailyRentalRate,
  };

  return http.post(movieUrl, payload);
}

export function deleteMovie(id) {
  return http.delete(`${movieUrl}/${id}`);
}
