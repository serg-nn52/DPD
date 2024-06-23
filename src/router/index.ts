import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import type { defineComponent } from 'vue';

declare module 'vue-router' {
  interface RouteMeta {
    layout: ReturnType<typeof defineComponent>;
  }
}

//предусмотрим расширение приложение, возможность добавления страниц
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/TableView/TableView.vue'),
      meta: {
        layout: MainLayout,
      },
    },
  ],
});

export default router;
