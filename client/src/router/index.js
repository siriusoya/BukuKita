import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignUpView.vue'
import AddBookView from '../views/AddBookView.vue'
import BookDetailView from '../views/BookDetailView.vue'
import MyBookDetailView from '../views/MyBookDetailView.vue'
import MyBooksView from '../views/MyBooksView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/myBooks',
      name: 'myBooks',
      component: MyBooksView
    },
    {
      path: '/myBooks/:id',
      name: 'myBookDetail',
      component: MyBookDetailView
    },
    {
      path: '/books/:id',
      name: 'bookDetail',
      component: BookDetailView
    },
    {
      path: '/addBook',
      name: 'addBook',
      component: AddBookView
    }
  ]
})

router.beforeEach((to, from, next) => {
  let isAuthenticated = localStorage.getItem('access_token')
  if (!isAuthenticated && to.name == 'myBooks') next({ name: 'login' })
  if (!isAuthenticated && to.name == 'addBook') next({ name: 'login' })
  if (!isAuthenticated && to.name == 'bookDetail') next({ name: 'login' })
  if (!isAuthenticated && to.name == 'myBookDetail') next({ name: 'login' })
  if (isAuthenticated && to.name == 'login') next({ name: 'home' })
  if (isAuthenticated && to.name == 'signup') next({ name: 'home' })
  else next()
})

export default router
