import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/annual2019/movie",
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/annual2019/:kind",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const { params } = to;
  const { kind } = params;
  const kinds: object = {
    movie: "电影",
    book: "读书",
    music: "音乐",
  };
  if (typeof kind == "string" && Reflect.get(kinds, kind)) {
    next({
      path: `/annual2019/${kind}`,
    });
    document.title = "豆瓣2019 - " + kinds[kind];
  }
});

export default router;
