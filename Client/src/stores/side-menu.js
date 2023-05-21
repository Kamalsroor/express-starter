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
      {
        icon: "HomeIcon",
        pageName: "DeliveryInvoicesIndex",
        title: "أستلامات",
      },
      {
        icon: "HomeIcon",
        pageName: "employeesIndex",
        title: "الموظفين",
      },
      {
        icon: "HomeIcon",
        pageName: "ExpensesIndex",
        pageParams:{ type:"general"},
        title: "الحسابات",
        subMenu: [
          {
            icon: "",
            pageName: "ExpensesIndex",
            pageParams:{ type:"general"},
            title: "المصاريف العامة",
          },
        
        ],
      },
    ],
  }),
});
