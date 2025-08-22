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

    <div v-if="showModal" class="modal-backdrop" >
      <div class="modal">
        <h2>Edit participation</h2>
        <input type="number" v-model="editedParticipation">
        <div class="buttons">
          <button @click="saveChanges" >Save</button>
          <button @click="showModal = false">Cancel</button>
        </div>
      </div>
    </div>
    
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
      showModal: false,
      editedParticipation: 0,
      participantToEdit: null
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
            _id: 'remainder',
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
        alert(err.response?.data?.message || 'Error adding participant.');
      }
    },
    async handleEdit(participant) {
      this.participantToEdit = participant;
      this.editedParticipation = participant.participation;
      this.showModal = true;
    },
    async handleDelete(id) {

      const confirmed = confirm('Are you sure you want to delete this participant?');

      if (!confirmed) {
        return;
      }

      try {
        await api.delete(`/participants/${id}`);
        this.fetchParticipants();
      } catch (err) {
        alert(err.response?.data?.message || 'Error deleting participant.');
      }
    },

    async saveChanges(){
      try{

        const totalPercent = this.participants.reduce((acc, participant) => {
          if (participant._id === this.participantToEdit._id || participant._id === 'remainder' ) {return acc;}
            return acc + participant.participation;
          
        }, 0);

        const newTotal = totalPercent + Number(this.editedParticipation);

        if (newTotal > 100) {
          return alert('Total percentage cannot exceed 100%.');
        }

        await api.patch(`/participants/${this.participantToEdit._id}`, {
          participation: this.editedParticipation
        });
        this.fetchParticipants();
        this.showModal = false;
      }catch (error) {
        alert(error.response?.data?.message || 'Error editing participant.');
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

.modal-backdrop{
  position: fixed;
  inset: 0; 
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
}

.modal {
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center ;
  justify-content: center;
  gap: 16px;
  background: #fff;
  padding: 16px;
  border-radius: 6px;

}

@media (max-width: 1000px) {
  .chart {
    flex-direction: column;
  }
}


</style>