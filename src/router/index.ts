import { RouteName } from '@/constants/router.constants';
import { createRouter, createWebHistory } from 'vue-router';
import { authRoutes } from './auth.routes';
import { useAuthStore } from '@/stores/auth.stores';
import { homeRoutes } from './home.routes';
import { errorRoutes } from './error.routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...authRoutes, ...homeRoutes, ...errorRoutes],
});

router.beforeEach((to, from, next) => {
  if (from.path === to.path && to.path !== '/') next();

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
