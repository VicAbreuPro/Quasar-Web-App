const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", name: "loginPg", component: () => import("pages/LoginPg.vue")},
      { path: "RegisterPg", name: "registerPg", component: () => import("pages/RegisterPg.vue")},
      { path: "EmailConfPg", name: "emailConfimation", component: () => import("pages/EmailConfirmation.vue")},
      { path: "ResetPass", name: "resetPass", component: () => import("pages/ResetPassword.vue")},
      { path: "ResetPassConfirm", name: "resetConfirm", component: () => import("pages/ResetPasswordConfirm.vue")},
      { path: "ChangePassword", name: "reset-password", component: () => import("pages/ChangePassword.vue")},
      { path: "UpClient", name: "upCliPg", component: () => import("src/pages/UpClientPg.vue"), meta:{requiresAuth: true}},
      { path: "UpProduct", name: "upProductPg", component: () => import("src/pages/UpProductPg.vue"), meta:{requiresAuth: true}},
      { path: "UpSale", name: "upSalePg", component: () => import("src/pages/UpSalePg.vue"), meta:{requiresAuth: true}},
    ],
  },

  {
    path: "/",
    component: () => import("layouts/HomeLayout.vue"),
    children: [
      { path: "HomePg", name: "homePg", component: () => import("pages/HomePg.vue")},
      { path: "SalesPg", name: "salePg", component: () => import("pages/SalesPg.vue")},
      { path: "ClientPg", name: "cliPg", component: () => import("pages/ClientPg.vue")},
      { path: "ProductPg", name: "p_pg", component: () => import("pages/ProductPg.vue")},
      { path: "SalesPg", name: "salePg", component: () => import("pages/SalesPg.vue")},
    ],
    meta: {
      requiresAuth: true
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
