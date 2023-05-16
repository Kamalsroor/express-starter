import http from "../http-common";

class CustomersService {
  getAll(page) {
    return http.get("/customers", { params: { page: page } });
  }

  get(id) {
    return http.get(`/customers/${id}`);
  }

  create(data) {
    return http.post("/customers", data);
  }

  update(data) {
    return http.put(`/customers/${data.id}`, data);
  }

  delete(id) {
    return http.delete(`/customers/${id}`);
  }


}

export default new CustomersService();