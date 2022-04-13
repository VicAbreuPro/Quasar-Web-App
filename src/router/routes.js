const routes = [{
        path: "/",
        component: () =>
            import ("layouts/MainLayout.vue"),
        children: [{
                path: "",
                name: "loginPg",
                component: () =>
                    import ("pages/LoginPg.vue")
            },
            {
                path: "RegisterPg",
                name: "registerPg",
                component: () =>
                    import ("pages/RegisterPg.vue")
            },
            {
                path: "EmailConfPg",
                name: "emailConfimation",
                component: () =>
                    import ("pages/EmailConfirmation.vue")
            },
            {
                path: "ResetPass",
                name: "resetPass",
                component: () =>
                    import ("pages/ResetPassword.vue")
            },
            {
                path: "ResetPassConfirm",
                name: "resetConfirm",
                component: () =>
                    import ("pages/ResetPasswordConfirm.vue")
            },
            {
                path: "ChangePassword",
                name: "reset-password",
                component: () =>
                    import ("pages/ChangePassword.vue")
            },
            {
                path: "UpClient",
                name: "upCliPg",
                component: () =>
                    import ("src/pages/UpClientPg.vue"),
                meta: { requiresAuth: true }
            },
            {
                path: "UpProduct",
                name: "upProductPg",
                component: () =>
                    import ("src/pages/UpProductPg.vue"),
                meta: { requiresAuth: true }
            },
            {
                path: "UpSale",
                name: "upSalePg",
                component: () =>
                    import ("src/pages/UpSalePg.vue"),
                meta: { requiresAuth: true }
            },
        ],
    },

    {
        path: "/",
        component: () =>
            import ("layouts/HomeLayout.vue"),
        children: [{
                path: "Home",
                name: "homePg",
                component: () =>
                    import ("pages/HomePg.vue")
            },
            {
                path: "Staff",
                name: "StaffPg",
                component: () =>
                    import ("src/pages/StaffPg.vue")
            },
            {
                path: "Client",
                name: "cliPg",
                component: () =>
                    import ("pages/ClientPg.vue")
            },
            {
                path: "Service",
                name: "servicePg",
                component: () =>
                    import ("src/pages/ServicePg.vue")
            },
            {
                path: "Supplier",
                name: "supplierPg",
                component: () =>
                    import ("src/pages/SupplierPg.vue")
            },
        ],
        meta: {
            requiresAuth: true
        }
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: "/:catchAll(.*)*",
        component: () =>
            import ("pages/Error404.vue"),
    },
];

export default routes;