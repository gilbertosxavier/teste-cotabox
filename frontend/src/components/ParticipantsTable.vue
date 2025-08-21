<template>
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
          <button @click="$emit('edit', participant)"><PencilIcon class="icon"/></button>
          <button @click="$emit('delete', participant._id)"><TrashIcon class="icon"/></button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import { TrashIcon, PencilIcon } from  '@heroicons/vue/24/outline'

export default {
  props: ['participants'],
  components: {
    TrashIcon,
    PencilIcon
  }
}

</script>


<style scoped>

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
  padding: 4px;
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

</style>