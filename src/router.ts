import { createRouter, createWebHistory } from 'vue-router';
import { useUsers } from './stores/users';
import Home from './views/Home.vue';
import NewPost from './views/NewPost.vue';
import ShowPost from './views/ShowPost.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/posts/new',
      component: NewPost,
      beforeEnter: () => {
        // If the user is authenticated -> continue
        const usersStore = useUsers();

        // If the user is NOT authenticated -> redirect to the Home page
        if (!usersStore.currentUserId) {
          return {
            path: '/',
          };
        }
      },
    },
    {
      path: '/posts/:id',
      component: ShowPost,
    },
  ],
});
