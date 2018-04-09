const state = {
  now: '',
  globalRealTimeSpeed: 0,
  speedCoordinate: []

};

const getters = {};

const actions = {
  _randomData(state) {
    let oneDay = 24 * 3600 * 1000;
    state.now = new Date(+state.now + oneDay);
    state.globalRealTimeSpeed = state.globalRealTimeSpeed + Math.random() * 21 - 10;
    return {
      name: state.now.toString(),
      value: [
        [state.now.getFullYear(), state.now.getMonth() + 1, state.now.getDate()].join('/'),
        Math.round(state.globalRealTimeSpeed)
      ]
    }
  },
  initSpeed(state) {
    let speedCoordinate = [];
    state.globalRealTimeSpeed = Math.random() * 1000;
    for (let i = 0; i < 500; i++) {
      speedCoordinate.push(_randomData());
    }
    return speedCoordinate;
  },
  fetchRealTimeSpeed(state, chartsObj) {
    for (let i = 0; i < 5; i++) {
      state.speedCoordinate.shift();
      state.speedCoordinate.push(_randomData());
    }

    chartsObj.setOption({
      series: [{
        data: state.speedCoordinate
      }]
    });
    console.log(state.globalRealTimeSpeed);
  }
};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations
}
