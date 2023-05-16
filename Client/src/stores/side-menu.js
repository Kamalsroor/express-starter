import { defineStore } from "pinia";

export const useSideMenuStore = defineStore("sideMenu", {
  state: () => ({
    menu: [
      {
        icon: "HomeIcon",
        pageName: "home",
        title: "الرئيسية",
      },
      {
        icon: "HomeIcon",
        pageName: "customersIndex",
        title: "العملاء",
      },
      {
        icon: "HomeIcon",
        pageName: "ReceiptInvoicesIndex",
        title: "أستلامات",
      },
    ],
  }),
});
