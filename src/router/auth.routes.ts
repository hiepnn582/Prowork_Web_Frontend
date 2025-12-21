import { RouteName, RoutePath } from '@/constants/router.constants';
import { RegisterPage } from '@/features/index.views';
import type { RouteRecordRaw } from 'vue-router';

export const authRoutes: RouteRecordRaw[] = [
  {
    path: RoutePath.Register,
    name: RouteName.Register,
    component: RegisterPage,
    meta: {
      title: 'Register Page',
    },
  },
];
