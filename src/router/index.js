import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Jobs from '@/components/Jobs'
import Details from '@/components/Details'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/jobs',
      name: 'jobs',
      component: Jobs
    },
    {
      path: '/job_details',
      name: 'job_details',
      component: Details
    }
  ]
})
