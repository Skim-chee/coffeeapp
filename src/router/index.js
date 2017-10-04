import Vue from 'vue'
import Router from 'vue-router'
import Options from '@/components/Options'
import Results from '@/components/Results'
import store from '../store/index'

Vue.use(Router)

// Checks to make sure location is updated ("problem with ")
const checkStateUpdated = (to, from, next) => {
  function proceed () {
    if (store.state.location) {
      next();
    }
  }
  if (!store.state.location) {
    store.watch(
      (state) => state.location,
      (value) => {
        if (value.length > 0) {
          console.log("Your location is: " + value);
          proceed();
        }
      }
    )
  } else {
    proceed();
  }
}

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
      beforeEnter: checkStateUpdated,
      component: Results
    }
  ]
})
