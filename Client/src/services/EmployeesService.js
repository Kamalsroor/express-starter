import http from "../http-common";

class EmployeesService {
  getAll(page) {
    return http.get("/employees", { params: { page: page } });
  }
  getAllWOP() {
    return http.get("/employees", { params: { perPage: 'all' } });
  }

  get(id) {
    return http.get(`/employees/${id}`);
  }

  create(data) {
    return http.post("/employees", data);
  }

  update(data) {
    return http.put(`/employees/${data._id}`, data);
  }

  delete(id) {
    return http.delete(`/employees/${id}`);
  }


}

export default new EmployeesService();