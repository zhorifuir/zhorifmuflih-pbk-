import { createRouter, createWebHistory } from "vue-router";
import Todos from "../views/Todos.vue";
import Post from "../views/Post.vue";
import Album from "../views/Album.vue";
import AlbumDetail from "../views/AlbumDetail.vue";

const routes = [
  { path: "/", component: Todos },
  { path: "/post", component: Post },
  { path: "/album", component: Album },
  { path: "/albums/:id", component: AlbumDetail, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
