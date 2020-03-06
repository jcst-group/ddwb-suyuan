import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Home from '@/components/Home'
import Report from '@/components/Report'
import Introduce from '@/components/Introduce'
import factOrFiction from '@/components/factOrFiction'
import mapDetail from '@/components/mapDetail'
import Chart from '@/components/Chart'
import Provenances from '@/components/Provenances'
import Recovrey from '@/components/Recovrey'
import FirstWork from '@/components/FirstWork'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Index',
      name: 'Index',
      component: Index
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/Report',
      name: 'Report',
      component: Report
    },
    {
      path: '/Introduce',
      name: 'Introduce',
      component: Introduce
    },
    {
      path: '/factOrFiction',
      name: 'factOrFiction',
      component: factOrFiction
    },
    {
      path: '/mapDetail',
      name: 'mapDetail',
      component: mapDetail
    },
    {
      path: '/Provenances',
      name: 'Provenances',
      component: Provenances
    },
    {
      path: '/Recovrey',
      name: 'Recovrey',
      component: Recovrey
    },
    {
      path: '/FirstWork',
      name: 'FirstWork',
      component: FirstWork
    },
    {
      path: '/Chart',
      name: 'Chart',
      component: Chart
    },
    {
      path: '/',
      redirect: '/Index'
    }
  ]
})
