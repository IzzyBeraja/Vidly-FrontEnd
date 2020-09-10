import http from "./httpService";

const serviceUrl = "/Users";

export async function register(user) {
  return await http.post(serviceUrl, {
    email: user.email,
    password: user.password,
    name: user.name,
  });
}
