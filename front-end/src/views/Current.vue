<template>
	<div style="width: 95%">
		<h1><br/>Accepted Collaborations</h1>
		<AcceptList :accepts="accepts" />
		<p v-if="accepts.length == 0">It looks like you haven't accepted any projects!</p>
		<button type=button class="btn btn-primary" v-on:click="exit()">Sign Out</button>
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
import AcceptList from "../components/AcceptList.vue"
export default {
  name: 'Current',
  components: {
	AcceptList
  },
  methods: {
      exit() {
      this.$root.$data.signIn = false;
      this.$router.push('/');
    }
  },
  computed: {
	accepts() {
		return (this.$root.$data.projects.filter(project => project.description.toLowerCase().search(this.searchText) >= 0)).filter(project => project.status == 1);
	}
  },
}
</script>


