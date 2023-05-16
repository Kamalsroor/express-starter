import http from "../http-common";

class ReceiptInvoicesService {
  getAll(page) {
    return http.get("/receipt-invoices/get/with-customer", { params: { page: page } });
  }

  get(id) {
    return http.get(`/receipt-invoices/${id}`);
  }

  create(data) {
    return http.post("/receipt-invoices", data);
  }

  update(data) {
    return http.put(`/receipt-invoices/${data.id}`, data);
  }

  delete(id) {
    return http.delete(`/receipt-invoices/${id}`);
  }

}

export default new ReceiptInvoicesService();