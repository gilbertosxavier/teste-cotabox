<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  props: ['participants'],
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
      const ctx = this.$refs.chartCanvas.getContext('2d');
      const labels = this.participants.map(participant => `${participant.first_name} ${participant.last_name}`);
      const data = this.participants.map(p => p.participation);
      this.chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels,
          datasets: [{ 
            data,
            backgroundColor: ['#36A2EB','#00C853','#9C27B0','#9E9E9E','#FF5252']
          }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      });
    }
  }
}
</script>

<style>
.chart-container {
  width: 400px;
  height: 400px;
  max-width: 100%;
  margin: 0 auto;
}

</style>
