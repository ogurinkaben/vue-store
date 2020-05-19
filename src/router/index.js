import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import NotFound from "../views/NotFound.vue";
import { fb } from '../firebase.js';
Vue.use(VueRouter);
const routes = [{
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: 'Airpods Store - Home',
    }
  },
  {
    path: "/auth",
    name: "Auth",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/Auth.vue"),
    meta: {
      title: 'Airpods Store - Auth',
    }
  },
  {
    path: "/cart",
    name: "Cart",
    component: () =>
      import("../components/Cart.vue"),
    meta: {
      title: 'Airpods Store - Cart',
    },
  },
  {
    path: "/product/:id",
    name: "Product",
    props: true,
    component: () =>
      import("../components/Product.vue"),
    meta: {
      title: 'Airpods Store - Product',
    },
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFound,
    meta: {
      title: 'Airpods Store | Page Not Found',
    }
  },
  {
    path: "/dashboard/",
    name: "Dashboard",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/dashboard/Dashboard.vue"),
    meta: { requiresAuth: true, title: 'Airpods Store | Dashboard' },
    children: [{
        path: "/dashboard/",
        name: "Overview",
        component: () =>
          import("../components/dashboard/Overview.vue"),
        meta: {
          title: 'Dashboard - Overview',
        }
      },
      {
        path: "account",
        name: "Account",
        component: () =>
          import("../components/dashboard/Account.vue"),
        meta: {
          title: 'Dashboard - Account',
        }
      }, {
        path: "manage-products",
        name: "ManageProducts",
        component: () =>
          import("../components/dashboard/ManageProducts.vue"),
        meta: {
          title: 'Dashboard - Manage Products',
        }
      },
    ]
  }
];
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition;
  } else {
    return { x: 0, y: 0 }
  }
};
const router = new VueRouter({
  scrollBehavior,
  routes,
  mode: 'history'
});
router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start()
  }
  next()
})
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const currentUser = fb.auth().currentUser;
  if (requiresAuth && !currentUser) {
    Toast.fire({
      icon: 'error',
      title: 'You need to sign in first'
    });
    next({
      path: '/auth',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));
  if (!nearestWithMeta) return next();
  nearestWithMeta.meta.metaTags.map(tagDef => {
      const tag = document.createElement('meta');
      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key]);
      });
      tag.setAttribute('data-vue-router-controlled', '');
      return tag;
    })
    .forEach(tag => document.head.appendChild(tag));
  next();
})
router.afterEach((to, from) => {
  NProgress.done()
})
export default router;
