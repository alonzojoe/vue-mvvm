import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../layouts/AppLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("../pages/Home.vue"),
      },
      {
        path: "/todos",
        name: "todos",
        component: () => import("../pages/Todos.vue"),
      },
    ],
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
