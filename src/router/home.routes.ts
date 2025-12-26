import { RouteName, RoutePath } from '@/constants/router.constants';
import { HomePage } from '@/features/index.views';
import type { RouteRecordRaw } from 'vue-router';

export const homeRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: '',
    component: HomePage,
    meta: {
      title: 'Home Page',
      auth: true,
    },
  },
  {
    path: RoutePath.Home,
    name: RouteName.Home,
    component: HomePage,
    meta: {
      title: 'Home Page',
      auth: true,
    },
  },
];
