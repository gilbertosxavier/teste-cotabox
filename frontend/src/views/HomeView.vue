<template>


      <ParticipantForm :onAdd="addParticipant"/>


    <main>
      <section class="description">    
        <h1>DATA</h1>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
      </section>
      
      <section class="chart">
        <div  v-if="loading" class="spinner-container">
          <img src="../assets/spinner.svg" alt="Loading...">
          <p>Loading...</p>
        </div>
        
        <div v-else-if="participants.length === 0">
          <p class="no-data">You do not have any registered data yet.</p>
        </div>
        <template v-else>
          <ParticipantsTable :participants="participants"
            @edit="handleEdit"
            @delete="handleDelete"/>
          <ParticipationChart :participants="participants"/>
        </template>
      </section>
    </main>
    
</template>

<script>
import api from '../services/api';

import ParticipantForm from '../components/ParticipantForm.vue';
import ParticipantsTable from '../components/ParticipantsTable.vue';
import ParticipationChart from '../components/ParticipationChart.vue';
import spinner from '../assets/spinner.svg';

export default {
  components: { ParticipantForm, ParticipantsTable, ParticipationChart },
  data() {
    return {
      participants: [],
      loading: true,
    }
  },
  mounted() {
    this.fetchParticipants();
  },
  methods: {
    async fetchParticipants() {
      this.loading = true;
      try {
        const res = await api.get('/participants');
        let participants = res.data;

        const totalParticipation = participants.reduce((sum, p) => sum + p.participation, 0);

        const remainder = 100 - totalParticipation;

        if (remainder > 0){
          participants.push({
            id: 'remainder',
            first_name: 'Remaining',
            last_name: 'Percentage',
            participation: remainder
          })
        }

        this.participants = res.data.sort((a, b) => b.participation - a.participation);
      } catch (err) {
        console.error(err);
      } finally{
        this.loading = false;
      }
    },
    async addParticipant(participant) {
      try {
        await api.post('/participants', participant);
        this.fetchParticipants();
      } catch (err) {
        alert(err.response?.data?.message || 'Erro ao adicionar participante.');
      }
    },
    async handleEdit(participant) {
      console.log('Edit participant:', participant);
    },
    async handleDelete(id) {
      try {
        await api.delete(`/participants/${id}`);
        this.fetchParticipants();
      } catch (err) {
        alert(err.response?.data?.message || 'Erro ao deletar participante.');
      }
    }, 
    async handleDelete(id) {
      console.log('Delete participant:', id);
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
  padding: 30px;
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
  max-width: 1280px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 16px;
  padding: 18px;
  gap: 50px;
}

.spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.spinner-container img {
  width: 70px;
  height: 70px;
}

.spinner-container p {
  font-weight: bold;
  font-size: 26px;
}

.no-data {
  font-weight: bold;
  font-size: 18px;
}

@media (max-width: 1000px) {
  .chart {
    flex-direction: column;
  }
}


</style>