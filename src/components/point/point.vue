<!-- 散点图 -->
<style lang="stylus" scoped>
  .point
    background url('../../assets/bg.jpg') no-repeat
    background-size 100% 100%
    .main
      height calc(100% - 120px)
      width 100%
      transition all 0.5s linear
</style>

<template lang="html">
  <div class="point">
    <v-header :name="name" :legendArr="legendArr" :myChart="myChart"></v-header>
    <div class="main"></div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import china from 'echarts/map/js/china'
  import header from 'components/header/header'

  const USER_NAME = 'elastic';
  const PSW = 'elasticl@ethical.cn';
  const AUTH_TOKEN = "Basic " + btoa(USER_NAME + ":" + PSW);


  export default {
    mounted() {
      this.myChart = echarts.init(document.querySelector('.point .main'));
      let showLoadingDefault = {
        text: '加载中...',
        color: '#23531',
        textColor: '#fff',
        // 地图背景色
        // maskColor: '#272D3A',
        zlevel: 0
      };
      this.myChart.setOption({
        // backgroundColor: '#272D3A',
        // 标题
        title: {
          text: '5G',
          left: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        // 地图上圆点的提示
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            return params.name + ' : ' + params.value[2]
          }
        },
        // 图例按钮 点击可选择哪些不显示
        legend: {
          orient: 'vertical',
          left: 'left',
          top: 'bottom',
          data: ['地区热度', 'top5'],
          textStyle: {
            color: '#fff'
          }
        },
        // 地理坐标系组件
        geo: {
          map: 'china',
          label: {
            // true会显示城市名
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            // 地图背景色
            normal: {
              areaColor: '#465471',
              borderColor: '#282F3C'
            },
            // 悬浮时
            emphasis: {
              areaColor: '#8796B4'
            }
          }
        },
        // 系列列表
        series: [
          {
            name: '地区热度',
            // 表的类型 这里是散点
            type: 'scatter',
            // 使用地理坐标系，通过 geoIndex 指定相应的地理坐标系组件
            coordinateSystem: 'geo',
            data: [],
            // 标记的大小
            symbolSize: 12,
            // 鼠标悬浮的时候在圆点上显示数值
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: '#ddb926'
              },
              // 鼠标悬浮的时候圆点样式变化
              emphasis: {
                borderColor: '#fff',
                borderWidth: 1
              }
            }
          },
          {
            name: 'top5',
            // 表的类型 这里是散点
            type: 'effectScatter',
            // 使用地理坐标系，通过 geoIndex 指定相应的地理坐标系组件
            coordinateSystem: 'geo',
            data: [],
            // 标记的大小
            symbolSize: 12,
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: '#f4e925',
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            zlevel: 1
          }
        ]
      });
      this.myChart.showLoading(showLoadingDefault);
      this.$store.commit('openLoading');
      this.$store.dispatch('fetchHeatChinaRealData', this.myChart);
      setInterval(() => {
        this.$store.dispatch('fetchHeatChinaRealData', this.myChart)
      }, 100)
    },
    components: {
      'v-header': header
    }
  }

</script>
