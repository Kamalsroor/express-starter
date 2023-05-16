import { createRouter, createWebHistory } from "vue-router";
import { authMiddleware } from '@/middleware/authMiddleware'


import SideMenu from "../layouts/side-menu/Main.vue";
import SimpleMenu from "../layouts/simple-menu/Main.vue";
import TopMenu from "../layouts/top-menu/Main.vue";
import login from "../views/login/Main.vue";
import Page1 from "../views/page-1/Main.vue";
import blankPage from "../views/blankPage.vue";
import CustomersIndex from "../views/Customers/index.vue";
import customersCreate from "../views/Customers/form.vue";
import customersEdit from "../views/Customers/form.vue";



const routes = [
  {
    path: "/login",
    name: 'login',
    component: login,

  },
  {
    path: "/",
    component: SideMenu,
    meta: {
        middleware: authMiddleware,
    },
    children: [
      {
        path: "/",
        name: "home",
        component: Page1,
      },
      
    
    ],
  },
  {
    path: "/customers",
    name: "customers",
    component: SideMenu,
    redirect:{name:"customersIndex"},
    meta: {
        middleware: authMiddleware,
    },
    children: [
 
      {
        path: "list",
        name: "customersIndex",
        component: CustomersIndex,
      },
      {
        path: "create",
        name: "customersCreate",
        component: customersCreate,
      },
      {
        path: ":id/edit",
        name: "customersEdit",
        component: customersEdit,
      },
    ],
  },
  // {
  //   path: "/simple-menu",
  //   component: SimpleMenu,
  //   children: [
  //     {
  //       path: "page-1",
  //       name: "simple-menu-page-1",
  //       component: Page1,
  //     },
  //     {
  //       path: "page-2",
  //       name: "simple-menu-page-2",
  //       component: Page2,
  //     },
  //   ],
  // },
  // {
  //   path: "/top-menu",
  //   component: TopMenu,
  //   children: [
  //     {
  //       path: "page-1",
  //       name: "top-menu-page-1",
  //       component: Page1,
  //     },
  //     {
  //       path: "page-2",
  //       name: "top-menu-page-2",
  //       component: Page2,
  //     },
  //   ],
  // },
];



const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 };
  },
});


// Creates a `nextMiddleware()` function which not only
// runs the default `next()` callback but also triggers
// the subsequent Middleware function.
function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters);
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});


export default router;
