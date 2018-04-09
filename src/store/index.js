import Vue from 'vue'
import Vuex from 'vuex'
import ChinaMap from './modules/ChinaMap'
import speed from './modules/speed'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    color: ['#325B69', '#698570', '#AE5548', '#6D9EA8', '#9CC2B0', '#C98769']
  },
  modules: {
    ChinaMap,
    speed
  }
})
