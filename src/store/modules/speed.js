import axios from 'axios'

const GET_REAL_TIME_SPEED = 'GET_REAL_TIME_SPEED';

const state = {
  speedCoordinate: []
};

const getters = {
  getSpeedCoordinate: state => state.speedCoordinate
};

const actions = {
  // 注意必须用{}把commit括起来
  fetchRealTimeSpeedCoord({commit}) {
    commit(GET_REAL_TIME_SPEED)
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
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
