import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import ManageUser from '@/views/Admin/AboutView.vue'
import ManageDiv from '@/views/Admin/DivisionView.vue'
import ManageTicket from '@/views/User/TicketsView.vue'
import Login from '@/views/Auth/Login.vue'
import Register from '@/views/Auth/Register.vue'
import Forget from '@/views/Auth/Forget.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    //Guests
    {
      path: '/',
      name: 'login',
      component: Login,
      meta: { guest: true}
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { guest: true}
    },

    //Authenticated
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true}
    },
    {
      path: '/manage-tickets',
      name: 'manage-tickets',
      component: ManageTicket,
      meta: { requiresAuth: true}
    },
    {
      path: '/manage-users',
      name: 'manage-users',
      component: ManageUser,
      meta: { requiresAuth: true, adminOnly: true }
    },
    {
      path: '/manage-divisions',
      name: 'manage-divisions',
      component: ManageDiv,
      meta: { requiresAuth: true, adminOnly: true }
    },
    {
      path: '/forget',
      name: 'forget',
      component: Forget
    }
  ]
})

    router.beforeEach((to, from, next) => {
      const loggedIn = !!localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      
      if (to.meta.requiresAuth && !loggedIn) {
          next({ name: 'login' });
      } else if (to.meta.guest && loggedIn) {
          next({ name: 'Dashboard' });
      } else if (to.meta.adminOnly && user.acctype !== 'admin') {
          next({ name: 'Dashboard' });
      } else {
          next();
      }
    });

export default router
