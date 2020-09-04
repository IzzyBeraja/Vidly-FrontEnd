import http from "./httpService";
import { apiEndpoint } from "./config.json";

const serviceUrl = `${apiEndpoint}/Auth`;

export async function login(email, password) {
    return http.post(serviceUrl, {email, password});
}