import { RouteName, RoutePath } from '@/constants/router.constants';
import { NotFoundPage } from '@/features/index.views';
import type { RouteRecordRaw } from 'vue-router';

export const errorRoutes: RouteRecordRaw[] = [
  {
    path: RoutePath.NotFound,
    name: RouteName.NotFound,
    component: NotFoundPage,
    meta: {
      title: 'Not Found Page',
    },
  },
];
