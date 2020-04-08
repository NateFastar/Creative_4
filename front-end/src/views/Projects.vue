<template>
	<div style="width: 95%">
		<h1><br/>Current Collaborations</h1>
		<center><div class="alert alert-danger" role="alert" v-show="!this.$root.$data.signIn" style="width: 50%">
                You're not signed in! You can't collaborate without first signing in or creating a collaboration account!
            </div></center>
		<div class="wrapper">
			<div class="search">
				<form class="pure-form">
					<i class="fas fa-search"></i><input v-model="searchText" />
				</form>
			</div>
		</div>
		<ProjectList :projects="projects" />
		<h2 v-if="accepts.length > 0"><br/>Accepted Collaborations</h2>
		<AcceptList :accepts="accepts" />
		<h2 v-if="rejects.length > 0"><br/>Ignored Collaborations</h2>
		<RejectList :rejects="rejects" />
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
import ProjectList from "../components/ProjectList.vue"
import RejectList from "../components/RejectList.vue"
import AcceptList from "../components/AcceptList.vue"
export default {
  name: 'Projects',
  components: {
    ProjectList,
	RejectList,
	AcceptList
  },
  data() {
    return {
      searchText: '',
    }
  },
  computed: {
	projects() {
		return (this.$root.$data.projects.filter(project => project.description.toLowerCase().search(this.searchText) >= 0)).filter(project => project.status ==0);
	},
	rejects() {
		return (this.$root.$data.projects.filter(project => project.description.toLowerCase().search(this.searchText) >= 0)).filter(project => project.status == 2);
	},
	accepts() {
		return (this.$root.$data.projects.filter(project => project.description.toLowerCase().search(this.searchText) >= 0)).filter(project => project.status == 1);
	}
  },
}
</script>


