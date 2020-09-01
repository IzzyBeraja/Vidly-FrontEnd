import { getGenres } from "./genreService";
import http from "./httpService";
import { apiEndpoint } from "./config.json";

const serviceUrl = `${apiEndpoint}/Movies`;

function movieUrl(id) {
  return `${serviceUrl}/${id}`;
}

export function getMovies() {
  return http.get(serviceUrl);
}

export function getMovie(id) {
  return http.get(movieUrl(id));
}

export async function saveMovie(movie) {
  const { data: genres } = await getGenres();

  const body = { ...movie };
  delete body.id;
  body.genre = genres.find(g => g.id === movie.genreId);

  return movie.id
    ? http.put(movieUrl(movie.id), body)
    : http.post(serviceUrl, body);
}

export function deleteMovie(id) {
  return http.delete(movieUrl(id));
}
