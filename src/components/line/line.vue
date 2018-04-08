<!-- 折线图 -->
<style lang="stylus" scoped>
  .line
    height 1000px
    background url('../../assets/bg.jpg') no-repeat
    background-size 100% 100%
    .main
      width 100%
      height calc(100% - 100px)
      margin-top -15px
</style>

<template>
  <div class="line">
    <v-header :name="name" :legendArr="legendArr" :myChart="myChart"></v-header>
    <div class="main"></div>
  </div>

</template>

<script>
  import echarts from 'echarts'
  import header from 'components/header/header'

  export default {
    props: ['speedCoordinate'],
    data() {
      return {
        legendArr: [],
        color: this.$store.state.color,
        myChart: {},
        name: '5G速度'
      }
    },
    methods: {
      initChart() {
        this.legendArr = this.myChart.getOption().series;
        this.legendArr.forEach((data) => {
          data.selected = true;
        });
        this.$root.charts.push(this.myChart);
        window.addEventListener('resize', function () {
          this.myChart.resize()
        }.bind(this))
      }
    },
    components: {
      'v-header': header
    },
    watch: {
      speedCoordinate: {
        handler(val, oldVal) {
          this.myChart.setOption({
            series: [{
              data: this.speedCoordinate
            }]
          });
        },
        deep: true
      }
    },
    mounted() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(document.querySelector('.line .main'));
      this.myChart.setOption({
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
          data: this.speedCoordinate
        }]
      });
      this.initChart();
    }
  }

</script>
