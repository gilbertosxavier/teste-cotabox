<template>
  <section class="chart-wrapper" >
    
    <div class="chart-container">
      <canvas ref="chartCanvas"></canvas>
    </div>

  
    <div class="legend">
      <ul>
        <li v-for="(participant, index) in participants" :key="participant.id"
        :style="{color: colors[index % colors.length] }"
        
        >
          <span
            class="color-box"
            :style="{backgroundColor: colors[index % colors.length] }"
          ></span>

          {{ participant.first_name }} {{ participant.last_name }} - {{ participant.participation }} %
        </li>
      </ul>
    </div>

  </section>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  props: ['participants'],
  data(){
    return {
      chart: null,
      colors: ['#2d97de', '#16ba9a', '#e94a35', '#9c56b8', '#bdc3c7' ]
    };
  },
  watch: {
    participants: {
      handler: 'renderChart',
      deep: true
    } 
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      if (this.chart) this.chart.destroy();
      const context = this.$refs.chartCanvas.getContext('2d');
      const data = this.participants.map(percent => percent.participation);
      this.chart = new Chart(context, {
        type: 'doughnut',
        data: {
          datasets: [{ 
            data,
            backgroundColor: this.colors
          }]
        },
        options: {
           responsive: true, 
           maintainAspectRatio: false,
          }
      });
    }
  }
}
</script>

<style scoped> 
.chart-wrapper{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-block: 16px;
}

.chart-container {
  width: 200px;
  height: 200px;
}

.legend ul {
  list-style: none;
}

.legend li {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: bold;
}

.color-box {
  width: 26px;
  height: 26px;
  border-radius: 6px;
  margin-right: 8px;
}


@media (max-width: 900px) {
  .chart-container{
    width: 250px;
    height: 250px;
  }
}

@media (max-width: 525px) {
  .chart-wrapper{
    flex-direction: column-reverse;
  }

  .chart-container{
    width: 200px;
    height: 200px;
  }

  .legend ul {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  gap: 10px;
}

.legend li {
  font-size: 11px;
  flex-direction: column;
}
}
</style>
