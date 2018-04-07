<!-- 计数器 -->
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
  <div class="counter">
    <v-header :name="name" :legendArr="legendArr" :myChart="myChart"></v-header>
    <div class="main">
      <div class="iCountUp">
        <ICountUp
          :startVal="startVal"
          :endVal="endVal"
          :decimals="decimals"
          :duration="duration"
          :options="options"
          @ready="onReady"
        />
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  import ICountUp from 'vue-countup-v2';
  import header from 'components/header/header'

  export default {
    name: 'SpeedCounter',
    components: {
      ICountUp,
      'v-header': header
    },
    data() {
      return {
        startVal: 0,
        endVal: 120500,
        decimals: 0,
        duration: 300,
        options: {
          useEasing: true,
          useGrouping: true,
          separator: ',',
          decimal: '.',
          prefix: '',
          suffix: ''
        }
      };
    },
    methods: {
      onReady: function (instance, CountUp) {
        const that = this;
        instance.update(that.endVal + 100);
      }
    }
  }

</script>

<style scoped>
  .iCountUp {
    font-size: 12em;
    margin: 0;
    color: #4d63bc;
    /*color: #bc242a;*/
  }
</style>
