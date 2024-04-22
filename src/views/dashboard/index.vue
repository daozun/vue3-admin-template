<template>
  <div class="dashboard">
    <el-row :gutter="20" class="panel">
      <el-col :span="6">
        <el-card class="box-card">
          <div class="card-wrapper">
            <div class="card-icon people">
              <svg-icon icon-class="peoples" class-name="card-panel-icon" />
            </div>
            <div class="card-description">
              <p class="text">访问量</p>
              <p class="num">112113</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div class="card-wrapper">
            <div class="card-icon message">
              <svg-icon icon-class="message" class-name="card-panel-icon" />
            </div>
            <div class="card-description">
              <p class="text">消息数</p>
              <p class="num">223332</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div class="card-wrapper">
            <div class="card-icon money">
              <svg-icon icon-class="money" class-name="card-panel-icon" />
            </div>
            <div class="card-description">
              <p class="text">成交量</p>
              <p class="num">110120</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div class="card-wrapper">
            <div class="card-icon shopping">
              <svg-icon icon-class="shopping" class-name="card-panel-icon" />
            </div>
            <div class="card-description">
              <p class="text">销售额</p>
              <p class="num">119324</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="chart">
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>访问量</span>
            </div>
          </template>
          <div id="bar" class="map"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>排行占比</span>
            </div>
          </template>
          <div id="pie" class="map"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="chart">
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>折线图</span>
            </div>
          </template>
          <div id="line" class="map"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>仪表盘</span>
            </div>
          </template>
          <div id="gauge" class="map"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import * as echarts from 'echarts'
import { useEcharts } from '@/hooks/useEcharts'

onMounted(() => {
  // 柱状图
  const barChartDom = document.getElementById('bar')
  const barChart = echarts.init(barChartDom)

  const barOption = {
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ]
  }

  useEcharts(barChart, barOption)

  // 饼状图
  const pieChartDom = document.getElementById('pie')
  const pieChart = echarts.init(pieChartDom)

  const pieOption = {
    title: {
      text: '排行占比',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '来源：',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: '搜索引擎' },
          { value: 735, name: '视频网站' },
          { value: 580, name: '广告' },
          { value: 484, name: '邮件' },
          { value: 300, name: '电话' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }

  useEcharts(pieChart, pieOption)

  // 折线图
  const lineChartDom = document.getElementById('line')
  const lineChart = echarts.init(lineChartDom)

  const lineOption = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['邮件', '视频网站', '电话', '广告', '搜索引擎']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '邮件',
        type: 'line',
        stack: 'Total',
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: '视频网站',
        type: 'line',
        stack: 'Total',
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: '电话',
        type: 'line',
        stack: 'Total',
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: '广告',
        type: 'line',
        stack: 'Total',
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: '搜索引擎',
        type: 'line',
        stack: 'Total',
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      }
    ]
  }

  useEcharts(lineChart, lineOption)

  // 仪表盘
  const gaugeChartDom = document.getElementById('gauge')
  const gaugeChart = echarts.init(gaugeChartDom)

  const gaugeOption = {
    series: [
      {
        type: 'gauge',
        progress: {
          show: true,
          width: 18
        },
        axisLine: {
          lineStyle: {
            width: 18
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          length: 15,
          lineStyle: {
            width: 2,
            color: '#999'
          }
        },
        axisLabel: {
          distance: 25,
          color: '#999',
          fontSize: 16
        },
        anchor: {
          show: true,
          showAbove: true,
          size: 25,
          itemStyle: {
            borderWidth: 10
          }
        },
        title: {
          show: false
        },
        detail: {
          valueAnimation: true,
          fontSize: 40,
          offsetCenter: [0, '70%']
        },
        data: [
          {
            value: 70
          }
        ]
      }
    ]
  }

  useEcharts(gaugeChart, gaugeOption)
})
</script>

<style lang="scss" scoped>
.dashboard {
  .panel {
    margin-top: 20px;
    .box-card {
      cursor: pointer;
      .card-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .card-icon {
          font-size: 48px;
          padding: 16px;
          border-radius: 10px;
          transition: all 0.38s ease-out;
        }

        .card-description {
          .text {
            color: rgba(0, 0, 0, 0.45);
            font-size: 16px;
          }

          .num {
            font-size: 20px;
            color: #666;
            font-weight: bold;
          }
        }

        .people {
          color: #40c9c6;
        }

        .message {
          color: #36a3f7;
        }

        .money {
          color: #f4516c;
        }

        .shopping {
          color: #34bfa3;
        }
      }

      &:hover {
        .people {
          background-color: #40c9c6;
          color: #fff;
        }

        .message {
          background-color: #36a3f7;
          color: #fff;
        }

        .money {
          background-color: #f4516c;
          color: #fff;
        }

        .shopping {
          background-color: #34bfa3;
          color: #fff;
        }
      }
    }
  }

  .chart {
    margin-top: 35px;
  }
}
</style>

<style lang="scss">
.dashboard {
  .el-card__body {
    padding-right: 30px;
  }

  .map {
    height: 38vh;
  }
}
</style>
