<template>
  <table class="data-table">
    <thead>
      <tr>
        <th>#</th>
        <th>First name</th>
        <th>Last name</th>
        <th>Participation</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(p, index) in participants" :key="p._id">
        <td>{{ index + 1 }}</td>
        <td>{{ p.first_name }}</td>
        <td>{{ p.last_name }}</td>
        <td>{{ p.participation }}%</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['participants']
}
</script>
