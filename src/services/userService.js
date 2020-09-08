import http from "./httpService";
import { apiEndpoint } from "./config.json";

const serviceUrl = `${apiEndpoint}/users`;

export async function register(user) {
  return http.post(serviceUrl, {
    email: user.email,
    password: user.password,
    name: user.name,
  });
}
