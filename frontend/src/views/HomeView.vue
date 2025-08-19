<template>

    <header>
      <ParticipantForm :onAdd="addParticipant"/>
    </header>

    <main>
      <section>    
        <h1>DATA</h1>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
      </section>

      <section>
        <ParticipantsTable :participants="participants"/>
        <ParticipationChart :participants="participants"/>
      </section>
    </main>
    
</template>

<script>
import axios from 'axios';

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
        const res = await axios.get('http://localhost:3000/api/participants');
        this.participants = res.data;
      } catch (err) {
        console.error(err);
      }
    },
    async addParticipant(participant) {
      try {
        await axios.post('http://localhost:3000/api/participants', participant);
        this.fetchParticipants();
      } catch (err) {
        alert(err.response?.data?.message || 'Erro ao adicionar participante.');
      }
    }
  }
}
</script>
