import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'start-game',
      component: require('@/components/StartGame').default
    },
    {
      path: '/play',
      name: 'minefield',
      component: require('@/components/Minefield').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
