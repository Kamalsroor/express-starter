import http from "../http-common";

class AuthService {
  login(data) {
    return http.post("/user/login", data);
  }
 
}

export default new AuthService();