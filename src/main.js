import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import VueRouer from 'vue-router'
import column from 'components/column/column'
import funnel from 'components/funnel/funnel'
import heat from 'components/heat/heat'
import point from 'components/point/point'
import line from 'components/line/line'
import dashboard from 'components/dashboard/dashboard'
import multipleColumn from 'components/multipleColumn/multipleColumn'
import counter from 'components/counter/counter'
import gauge from 'components/gauge/gauge'
import store from 'store'
import {DatePicker} from 'element-ui'

Vue.component(DatePicker.name, DatePicker);

Vue.use(VueRouer);
Vue.use(Vuex);

require('./mock/mock');

const router = new VueRouer({
  routes: [{
    path: '/column',
    component: column
  }, {
    path: '/funnel',
    component: funnel
  }, {
    path: '/heat',
    component: heat
  }, {
    path: '/point',
    component: point
  }, {
    path: '/dashboard',
    component: dashboard
  }, {
    path: '/multipleColumn',
    component: multipleColumn
  }, {
    path: '/line',
    component: line
  }, {
    path: '/counter',
    component: counter
  }, {
    path: '/gauge',
    component: gauge
  }],
  linkActiveClass: 'active'
});
new Vue({
  router,
  store,
  template: '<App>',
  components: {
    App
  },
  data: {
    eventHub: new Vue(),
    charts: []
  }
}).$mount('#app');

router.push('dashboard');
