<template>
  <common-card title="今日交易用户数" :value="orderUser|numberFormat">
    <template>
      <v-chart :option="getOption()" autoresize/>
    </template>
    <template v-slot:bottom>
      <span>退货率</span>
      <span class="emphasis">{{returnRate + '%'}}</span>
    </template>
  </common-card>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'TodayUsers',

  computed: {
    ...mapState({
      "orderUser": state => state.data.reportData.orderUser,
      "returnRate": state => state.data.reportData.returnRate,
      "orderUserTrend": state => state.data.reportData.orderUserTrend || [],
      "orderUserTrendAxis": state => state.data.reportData.orderUserTrendAxis || [],
    })
  },

  methods: {
    getOption () {
      return {
        xAxis: {
          data: this.orderUserTrendAxis // x轴数据
        },
        yAxis: {
          show: false
        },
        series: [
          {
            name: '实时交易量', // 名称
            type: 'bar',
            // 列表数据
            data: this.orderUserTrend,
            barWidth: '60%' // 宽度占用比例
          }
        ],
        // 图表在坐标中显示的位置
        grid: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0
        },
        color: ['#3398DB'], // 柱的颜色
        // 显示提示
        tooltip: {
          trigger: 'axis'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
