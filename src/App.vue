<style lang="stylus" rel="stylesheet/stylus">
  .mainApp
    position absolute
    height 100%
    width 100%
</style>

<template>
  <div class="mainApp">
    <router-view class="router-view"></router-view>
  </div>

</template>

<script>

  export default {
    data() {
      return {
        seller: {},
        speedCoordinate: [],
        realTimeSpeed: 0,
        now: ''
      }
    },
    methods: {
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
    },
    created() {
    },
    mounted() {
      let that = this;
      this.realTimeSpeed = Math.random() * 1000;
      for (let i = 0; i < 500; i++) {
        this.speedCoordinate.push(this.randomData());
      }
      setInterval(function () {
        for (let i = 0; i < 5; i++) {
          that.speedCoordinate.shift();
          that.speedCoordinate.push(that.randomData());
        }
      })
    }
  }

</script>
