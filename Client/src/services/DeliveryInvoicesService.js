import http from "../http-common";

class DeliveryInvoicesService {
  getAll(page) {
    return http.get("/delivery-invoices/get/with-customer", { params: { page: page } });
  }

  get(id) {
    return http.get(`/delivery-invoices/${id}`);
  }

  create(data) {
    return http.post("/delivery-invoices", data);
  }

  update(data) {
    return http.put(`/delivery-invoices/${data._id}`, data);
  }

  delete(id) {
    return http.delete(`/delivery-invoices/${id}`);
  }

}

export default new DeliveryInvoicesService();