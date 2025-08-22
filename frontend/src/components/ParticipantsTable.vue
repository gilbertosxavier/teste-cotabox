<template>
  <section class="table-wrapper">
      <table class="data-table">
    <colgroup>
      <col class="number">
      <col class="first-name">
      <col class="last-name">
      <col class="participation">
    </colgroup>
    <thead>
      <tr>
        <th></th>
        <th>First name</th>
        <th>Last name</th>
        <th>Participation</th>
        <th> Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(participant, index) in participants" :key="participant._id">
        <td>{{ index + 1 }}</td>
        <td>{{ participant.first_name }}</td>
        <td>{{ participant.last_name }}</td>
        <td>{{ participant.participation }}%</td>
        <td class="actions">
          <button @click="$emit('edit', participant)"><PencilIcon class="icon icon-edit"/></button>
          <button @click="$emit('delete', participant._id)"><TrashIcon class="icon icon-delete"/></button>
        </td>
      </tr>
    </tbody>
  </table>

    <div class="legend">
      <p v-if="totalParticipation < 100">
        * Total share is distributed between total participant share: <strong>{{ totalParticipation }}%</strong> + total unllocated: <strong>{{ 100 - totalParticipation }}%</strong>
      </p>

      <p v-else>
        All participation allocated: <strong>{{ totalParticipation }}%</strong>
      </p>
    </div>
  </section>

</template>

<script>
  import { TrashIcon, PencilIcon } from  '@heroicons/vue/24/outline'

export default {
  props: ['participants','totalParticipation'],
  components: {
    TrashIcon,
    PencilIcon
  }
}

</script>


<style scoped>

.table-wrapper{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

table, th, td {
  border: 1px solid #444;
  border-collapse: collapse;
  padding: 8px;
}

thead > tr {
  text-align:left;
  font-size: 14px;
}

tbody{
  font-size: 12px;
}

tbody tr {
  height: 30px;
}

td:first-child, th:first-child, td:last-child, th:last-child {
  text-align: center;
}
.actions {
  display: flex;
  gap: 6px;
  justify-content: center; 
  align-items: center;
  padding: 0px;
}

.actions button {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center; 
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
  height: 100%;
}

.data-table th:last-child, .data-table td:last-child {
  border-right: none;
  border-left: none;
}



.first-name, .last-name {
  width: 200px;
}

.participation {
  width: 150px;
}

.legend {
  font-size: 12px;
  font-style: italic;  
}

.legend strong {
  font-size: 14px;
}

.legend p {
  text-align: center;
}

.icon{
  width: 20px;
  height: 20px;
}

.icon-edit{
color: #444;
}

.icon-delete{
  color: #ff0606; 
}
</style>