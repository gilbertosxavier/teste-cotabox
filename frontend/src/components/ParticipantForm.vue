<template>
  <header>
    <form @submit.prevent="submit">
      <input v-model="firstName" type="text" placeholder="First name" required>
      <input v-model="lastName" type="text" placeholder="Last name" required>
      <input v-model.number="participation" type="number" placeholder="Participation" required min="1" max="100">
      <button type="submit">SEND</button>
    </form>
  </header>

</template>

<script>
export default {
  props: ['onAdd'],
  data() {
    return {
      firstName: '',
      lastName: '',
      participation: null,
    }
  },
  methods: {
    submit() {
      this.onAdd({
        first_name: this.firstName,
        last_name: this.lastName,
        participation: this.participation,
      });
      this.firstName = '';
      this.lastName = '';
      this.participation = null;
    }
  }
}
</script>

<style scoped>

header {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #00b8e2;
  padding-block: 16px;
}

form {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

input{

  height: 40px;
  width: 100%;
  max-width: 250px;
  padding-inline: 10px;
  outline: none;
  border: 0;
}

button{
  height: 40px;
  padding-inline: 30px;
  cursor: pointer;
  border: 1px solid #fff;
  background-color: #00b8e2;
  color: #fff;
  font-weight: bold;
}

button:hover{
  background-color: #1fcbf1;
}

@media (max-width: 525px) {
  form{
    flex-direction: column;
  }

  input{
    max-width: 80%;
  }

  button {
    width: 80%;
  }
}

</style>
