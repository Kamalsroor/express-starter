import http from "../http-common";

class ExpensesService {
  getAll(page) {
    return http.get("/expenses", { params: { page: page } });
  }
  getAllWOP() {
    return http.get("/expenses", { params: { perPage: 'all' } });
  }

  get(id) {
    return http.get(`/expenses/${id}`);
  }

  create(data) {
    return http.post("/expenses", data);
  }

  update(data) {
    return http.put(`/expenses/${data._id}`, data);
  }

  delete(id) {
    return http.delete(`/expenses/${id}`);
  }


}

export default new ExpensesService();
