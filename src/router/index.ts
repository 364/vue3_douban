import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/annual/2020/movie",
  },
  {
    path: "/annual/2020/:kind",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const { params, path } = to;
  const { kind } = params;
  const kinds: object = {
    movie: "电影",
    book: "读书",
    music: "音乐",
  };
  if (typeof kind == "string" && Reflect.get(kinds, kind)) {
    const arr = path.match(/[0-9]+/g);
    document.title = `豆瓣${(arr && arr[0]) || "2020"}年度榜单 - ${kinds[kind]}`;
    next();
  } else {
    next("/");
  }
});

export default router;
