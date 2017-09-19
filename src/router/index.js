import Vue from 'vue'
import Router from 'vue-router'
import Options from '@/components/Options'
import Results from '@/components/Results'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Options',
      component: Options
    },
    {
      path: '/results',
      name: 'Results',
      component: Results
    }
  ]
})
