import { createRouter, createWebHistory } from 'vue-router'
import InicioView from "../views/InicioView.vue"
import SesionView from "../views/SesionView.vue"
import RegisterView from "../views/RegisterView.vue"
import ListaView from "../views/ListaView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'inicio',
      component: InicioView
    },
    {
      path: '/lista',
      name: 'lista',
      component: ListaView
    },
    {
      path: '/',
      name: 'Inicio de sesion',
      component: SesionView
    },
    {
      path: '/register',
      name: 'Registro',
      component: RegisterView
    }
  ]
})

export default router
