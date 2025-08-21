<template>
  <section class="chart-wrapper" >
    
    <div class="chart-container">
      <canvas ref="chartCanvas"></canvas>
    </div>

  
    <div class="legend">
      <ul>
        <li v-for="(participant, index) in participants" :key="participant.id"
        :style="{color: getColor(index)}"
        
        >
          <span
            class="color-box"
            :style="{backgroundColor: getColor(index)}"
          ></span>

          {{ participant.participation }}% - {{ participant.first_name }} {{ participant.last_name }} 
        </li>

        <li v-if="totalParticipation < 100">
          <span
            class="color-box"
            :style="{backgroundColor: '#d8d8d8'}"
          ></span>
          {{ 100 - totalParticipation }}% - Empty
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
    };
  },
  computed: {
    totalParticipation() {
      return this.participants.reduce((total, participant) => total + participant.participation, 0);
    }
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
    generateColorHSL(index) {
      const hue = (index * 137.508) % 360;
      return `hsl(${hue}, 100%, 50%)`;
    },
    getColor(index) {
     const baseColors = ['#2d97de', '#16ba9a', '#e94a35', '#9c56b8', '#bdc3c7'];
     if (index < baseColors.length) {
       return baseColors[index];
     }
       return this.generateColorHSL(index); 
    },
    renderChart() {
      if (this.chart) this.chart.destroy();
      const context = this.$refs.chartCanvas.getContext('2d');
      const data = this.participants.map(participant => participant.participation);

      if (this.totalParticipation < 100) {
        data.push(100 - this.totalParticipation);
      }

      const colors = this.participants.map((_, index) => this.getColor(index));

      if (this.totalParticipation < 100) {
        colors.push('#d8d8d8');
      }

      this.chart = new Chart(context, {
        type: 'doughnut',
        data: {
          datasets: [{ 
            data,
            backgroundColor: colors
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
  gap: 16px;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: bold;
}

.color-box {
  width: 26px;
  height: 26px;
  flex: 0 0 26px;
  border-radius: 6px;
  display: inline-block;
}


@media (max-width: 1000px) {
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

}
</style>
