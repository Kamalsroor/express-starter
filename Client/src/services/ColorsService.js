import http from "../http-common";

class ColorsService {
  getAll() {
    return http.get("/receipt-invoices/get/colors");
  }




}

export default new ColorsService();