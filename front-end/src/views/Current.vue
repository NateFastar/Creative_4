<template>
	<div style="width: 95%">
		<h1><br/>Accepted Collaborations</h1>
		<p>Functionality coming soon!</p>
		<button @click="logout" class="pure-button pure-button-primary">Logout</button>
	</div>
</template>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.search {
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 50%;
}

form {
  display: table;
  width: 100%;
}

i {
  display: table-cell;
  padding-left: 10px;
  width: 1px;
}

input {
  display: table-cell;
  font-size: 20px;
  border: none !important;
  box-shadow: none !important;
  width: 100%;
  height: 40px;
}
</style>

<script>
import axios from 'axios';
export default {
  name: 'Current',
  components: {
	
  },
  methods: {
      exit() {
      this.$root.$data.signIn = false;
      this.$router.push('/');
    },
	async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
      this.$router.push('/');
    },
  },
}
</script>


