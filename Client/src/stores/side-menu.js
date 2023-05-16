import { defineStore } from "pinia";

export const useSideMenuStore = defineStore("sideMenu", {
  state: () => ({
    menu: [
      {
        icon: "HomeIcon",
        pageName: "home",
        title: "Home",
      },
      {
        icon: "HomeIcon",
        pageName: "customersIndex",
        title: "Customers",
      },
    ],
  }),
});
