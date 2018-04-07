<!-- 仪表盘 -->
<style lang="stylus" scoped>
  .counter
    height 1000px
    background url('../../assets/bg.jpg') no-repeat
    background-size 100% 100%
    .main
      width 100%
      height calc(100% - 100px)
      margin-top -15px
</style>

<template>
  <div class="gauge">
    <v-header :name="name" :legendArr="legendArr" :myChart="myChart"></v-header>
    <div class="main"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import echarts from 'echarts'
  import header from 'components/header/header'

  export default {
    data() {
      return {
        legendArr: [],
        color: this.$store.state.color,
        myChart: {},
        geoCoordMap: {},
        name: '速度仪表盘',
        option: ''
      }
    },
    components: {
      'v-header': header
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
    mounted() {
      let that = this;
      this.myChart = echarts.init(document.querySelector('.gauge .main'));
      this.option = {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: '实时速度',
            type: 'gauge',
            detail: {formatter: '{value}%'},
            data: [{value: 0, name: 'Gbps'}]
          }
        ]
      };
      this.myChart.setOption(this.option);
      this.initChart();
      setInterval(function () {
        that.option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
        that.myChart.setOption(that.option, true);
      }, 1000)
    }
  }
</script>
