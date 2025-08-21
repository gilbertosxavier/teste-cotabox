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
      </tr>
    </thead>
    <tbody>
      <tr v-for="(participant, index) in participants" :key="participant._id">
        <td>{{ index + 1 }}</td>
        <td>{{ participant.first_name }}</td>
        <td>{{ participant.last_name }}</td>
        <td>{{ participant.participation }}%</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['participants']
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

td:first-child, th:first-child, td:last-child, th:last-child {
  text-align: center;
}

.number{
  width: 30px;
}

.first-name, .last-name {
  width: 200px;
}

.participation {
  width: 150px;
}

</style>