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
    data() {
      return {
        legendArr: [],
        color: this.$store.state.color,
        myChart: {},
        name: '5G速度',
        speedCoordinate: [],
        realTimeSpeed: 0,
        now: ''
      }
    },
    methods: {
      initChart() {
        this.$root.charts.push(this.myChart);
        window.addEventListener('resize', function () {
          this.myChart.resize()
        }.bind(this))
      }
      /*
      randomData() {
        let oneDay = 24 * 3600 * 1000;
        this.now = new Date(+this.now + oneDay);
        this.realTimeSpeed = this.realTimeSpeed + Math.random() * 21 - 10;
        return {
          name: this.now.toString(),
          value: [
            [this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate()].join('/'),
            Math.round(this.realTimeSpeed)
          ]
        }
      }
      */
    },
    components: {
      'v-header': header
    },
    mounted() {
      // 基于准备好的dom，初始化echarts实例
      let that = this;
      /*
      this.realTimeSpeed = Math.random() * 1000;
      for (let i = 0; i < 500; i++) {
        this.speedCoordinate.push(this.randomData());
      }
      */
      this.myChart = echarts.init(document.querySelector('.line .main'));
      this.initChart();
      setInterval(function () {
        that.$store.dispatch('fetchRealTimeSpeed', that.myChart);
      }, 500);
    }
  }

</script>
