import http from "../http-common";

class CustomersService {
  getAll(page) {
    return http.get("/customers/get/receipts", { params: { page: page } });
  }
  getAllWOP() {
    return http.get("/customers", { params: { perPage: 'all' } });
  }

  get(id) {
    return http.get(`/customers/${id}`);
  }

  getOneWithColors(id) {
    return http.get(`/customers/get/${id}/receipts`);
  }

  create(data) {
    return http.post("/customers", data);
  }

  update(data) {
    return http.put(`/customers/${data._id}`, data);
  }

  delete(id) {
    return http.delete(`/customers/${id}`);
  }


}

export default new CustomersService();