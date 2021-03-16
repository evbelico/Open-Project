import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/register', component: () => import('pages/Register.vue') },
      { path: '/community', component: () => import('pages/Community.vue') },
      { path: '/services', component: () => import('pages/Services.vue') },
      { path: '/meeting', component: () => import('pages/Meeting.vue') },
      { path: '/forum', component: () => import('pages/Forum.vue') },
    ]
  },
  { 
    path: '/redirect-services',
    beforeEnter() { window.location.href = 'http://localhost:8081' }
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
