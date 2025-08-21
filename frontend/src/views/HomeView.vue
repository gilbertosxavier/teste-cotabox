<template>

    <header>
      <ParticipantForm :onAdd="addParticipant"/>
    </header>

    <main>
      <section class="description">    
        <h1>DATA</h1>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
      </section>

      <section class="chart">
        <ParticipantsTable :participants="participants"/>
        <ParticipationChart :participants="participants"/>
      </section>
    </main>
    
</template>

<script>
import api from '../services/api';

import ParticipantForm from '../components/ParticipantForm.vue';
import ParticipantsTable from '../components/ParticipantsTable.vue';
import ParticipationChart from '../components/ParticipationChart.vue';

export default {
  components: { ParticipantForm, ParticipantsTable, ParticipationChart },
  data() {
    return {
      participants: []
    }
  },
  mounted() {
    this.fetchParticipants();
  },
  methods: {
    async fetchParticipants() {
      try {
        const res = await api.get('/participants');
        this.participants = res.data;
      } catch (err) {
        console.error(err);
      }
    },
    async addParticipant(participant) {
      try {
        await api.post('/participants', participant);
        this.fetchParticipants();
      } catch (err) {
        alert(err.response?.data?.message || 'Erro ao adicionar participante.');
      }
    }
  }
}
</script>

<style>

main{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 18px;
  margin-block: 16px;
  color: #4e4e4e;
}

.description{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap:18px;
  text-align: center;
}

.chart {
  width: 100%;
  max-width: 1080px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 16px;
  padding: 18px;
  gap: 18px;
}

@media (max-width: 890px) {
  .chart {
    flex-direction: column;
  }
}


</style>