import axios from 'axios'

const TEST = 'test';
const GET_REAL_TIME_SPEED = 'GET_REAL_TIME_SPEED';

const state = {
  speedCoordinate: [],
  testData: 0
};

const getters = {
  getSpeedCoordinate: state => state.speedCoordinate,
  getTestData: state => state.testData
};

const actions = {
  // 注意必须用{}把commit括起来
  fetchRealTimeSpeedCoord({commit}) {
    commit(GET_REAL_TIME_SPEED)
  },
  fetchTestData({commit}) {
    let coordData = [];
    axios.get('/speed/now')
      .then(
        (res) => {
          let data = res.data;
          coordData = data;
        }
      );
    commit('setTestData');
  }
};

const mutations = {
  [GET_REAL_TIME_SPEED](state) {
    let coordData = [];
    axios.get('/speed/now')
      .then(
        (res) => {
          let data = res.data;
          let globalRealTimeSpeed = 0.0;
          let now = new Date().getTime();
          coordData = ((state, data) => {
            globalRealTimeSpeed = data.speedValue;
            return {
              name: "实时速度",
              value: [now.toString(), globalRealTimeSpeed]
            }
          })(state, data);
        });
    state.speedCoordinate = coordData;
  },
  setTestData(state, testData) {
    state.testData = testData
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
