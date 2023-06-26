<template>
  <common-card title="累计用户数" :value="usersTotal|numberFormat">
    <template>
      <v-chart :option="getOption()" autoresize/>
    </template>
    <template v-slot:bottom>
      <div class="total-users-bottom">
        <div>日同比</div>
        <div class="emphasis">{{userGrowthLastDay}}%</div>
        <div class="increment"></div>
        <div class="right">月同比</div>
        <div class="emphasis">{{userGrowthLastMonth}}%</div>
        <div class="decrement"></div>
      </div>
    </template>
  </common-card>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'TotalUsers',

  computed: {
    ...mapState({
      "usersTotal": state => state.data.reportData.usersTotal,
      "usersLastDay": state => state.data.reportData.usersLastDay,
      "usersLastMonth": state => state.data.reportData.usersLastMonth,
      "userGrowthLastDay": state => state.data.reportData.userGrowthLastDay,
      "userGrowthLastMonth": state => state.data.reportData.userGrowthLastMonth,
    })
  },

  methods: {
    getOption () {
      return {
        xAxis: {
          // 去掉两边留白
          boundaryGap: false,
          // 不显示
          show: false,

          min: 0, // x轴最小值
          max: this.usersTotal // x轴最大值
        },
        yAxis: {
          type: 'category', // y轴为类目轴 => 水平柱状图
          show: false // 不显示y轴
        },
        series: {
          name: '用户增长量',
          type: 'bar',
          data: [this.usersTotal - this.usersLastMonth],
          // 柱条的宽度
          barWidth: 10,

          // 展示背景
          showBackground: true,
          // 背景样式
          backgroundStyle: {
            // 背景色
            color: '#eee'
          },
          
          // 柱条样式
          itemStyle: {
            color: 'yellowgreen'
          },

          // 柱条显示的内容
          label: {
            show: true, // 显示
            formatter: '|', // 显示的具体内容
            position: 'right', // 内容的位置
            color: 'yellowgreen' // 颜色
          }
        },
        grid: {
          left: 0,
          top: 0,
          bottom: 0,
          right: 0
        },
        // 显示提示
        tooltip: {
          formatter (params) {
            // console.log(params)
            const {seriesName, marker, value} = params
            return `${seriesName}<br>${marker}${value}`
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .total-users-bottom {
    display: flex;
    align-items: center;
    .right {
      margin-left: 10px;
    }
  }
</style>
