const state = {
  now: '',
  globalRealTimeSpeed: 0,
  speedCoordinate: []

};

const getters = {};

const actions = {
  fetchRealTimeSpeed(state, chartsObj) {
    let now = new Date().getTime();
    let coordData = (state) => {
      state.globalRealTimeSpeed = state.globalRealTimeSpeed + Math.random() * 21 - 10;
      return {
        name: "实时速度",
        value: [now.toString(), state.globalRealTimeSpeed]
      }
    };

    chartsObj.setOption({
      title: {
        show: false
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          animation: false
        }
      },
      legend: {
        show: false
      },
      toolbox: {
        show: false
      },
      color: this.color,
      calculable: true,
      xAxis: [{
        name: '时间',
        type: 'time',
        axisLine: {
          show: true
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        nameTextStyle: {
          color: 'rgba(255, 255, 255, 0.69)'
        },
        axisLabel: {
          textStyle: {
            color: 'white'
          }
        }
      }],
      yAxis: [{
        axisLine: {
          show: false
        },
        nameLocation: 'end',
        nameGap: 20,
        nameRotate: 0,
        axisTick: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: ['rgba(230, 230, 230, 0.2)']
          },
          show: true
        },
        axisLabel: {
          textStyle: {
            color: 'white',
            fontSize: 14
          }
        },
        name: '速率',
        type: 'value',
        nameTextStyle: {
          color: 'rgba(255, 255, 255, 0.69)'
        }
      }],
      series: [{
        name: '实时速率',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: coordData
      }]
    });
    console.log(coordData);
  }
};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations
}
