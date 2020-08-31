import httpService from "./httpService";
import config from "./config.json"

export function getGenres() {
  return httpService.get(`${config.apiEndpoint}/Genre`)
}
