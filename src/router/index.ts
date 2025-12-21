import { RouteName, RoutePath } from '@/constants/router.constants';
import { HomePage } from '@/features/index.views';
import { createRouter, createWebHistory } from 'vue-router';
import { authRoutes } from './auth.routes';
import { useAuthStore } from '@/stores/auth.stores';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: HomePage,
      meta: {
        title: 'Home Page',
        auth: true,
      },
    },
    ...authRoutes,
    {
      path: RoutePath.Home,
      name: RouteName.Home,
      component: HomePage,
      meta: {
        title: 'Home Page',
        auth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (from.path === to.path) next();

  document.title = to.meta?.title
    ? (to.meta.title as string) + ' | Prowork - hiepnn'
    : 'Prowork - hiepnn';

  const authStore = useAuthStore();
  const isAuthenticated = !!(authStore.accessToken && authStore.user);

  if (to.meta.auth && !isAuthenticated) {
    return next({ name: RouteName.Register });
  }

  next();
});

export default router;
