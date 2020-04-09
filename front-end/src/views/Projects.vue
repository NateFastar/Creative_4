<template>
	<div style="width: 95%">
		<h1><br/>Current Collaborations</h1>
		<center><div class="alert alert-danger" role="alert" v-if="this.$root.$data.user==null" style="width: 50%">
                You're not signed in! You can't collaborate without first signing in or creating a collaboration account!
            </div>
			<div class="alert alert-danger" role="alert" v-else style="width: 50%">
                Accepting projects temporarily disabled, contact the project sponsor to participate!
            </div></center>
		<div class="wrapper">
			<div class="search">
				<form class="pure-form">
					<i class="fas fa-search"></i><input v-model="searchText" />
				</form>
			</div>
		</div>
		<ProjectList :projects="projects" />
		<p v-if="projects.length==0">Nothing here, sorry!</p>
		<div v-show="this.$root.$data.user!=null">
          <p>Add your own project
          <button @click="setCreating" class="pure-button button-xsmall">
            <i class="fas fa-plus" />
          </button></p>
        </div>
        <form class="pure-form" v-if="creating" @submit.prevent="addProject">
          <legend>Describe your project for the community.</legend>
          <fieldset>
			<label style="margin-top: 10px">Project Title:</label>
            <textarea v-model="title"></textarea>
			<label style="margin-top: 10px">Project Description:</label>
            <textarea v-model="problem"></textarea>
			<label style="margin-top: 10px">Reward:</label>
			<textarea v-model="reward"></textarea>
            <br />
            <button @click="cancelCreating" class="pure-button space-right">Cancel</button>
            <button class="pure-button pure-button-primary" type="submit">Submit</button>
          </fieldset>
        </form>
        
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
textarea {
  width: 100%;
  max-width: 500px;
}

h3 {
  font-size: 12px;
  font-weight: normal;
  background-color: #ccc;
  padding: 10px 20px;
}

label {
  background-color: #000;
  color: white;
  padding: 5px;
  border-radius: 30px;
  font-size: 12px;
  margin-right: 10px;
}


</style>

<script>
import axios from 'axios';
import moment from 'moment';
import ProjectList from "../components/ProjectList.vue"
export default {
  name: 'Projects',
  components: {
    ProjectList
  },
  data() {
    return {
      searchText: '',
      creating: false,
      problem: '',
      title: '',
      reward: '',
    }
  },
  created() {
    this.getProjects();
  },
  computed: {
    projects() {
		if(this.$root.$data.projects!=null)return (this.$root.$data.projects.filter(project => project.problem.toLowerCase().search(this.searchText) >= 0));
		else return this.$root.$data.projects;
	},
  },
  methods: {
    async getProjects() {
      try {
        let response = await axios.get("/api/projects");
        this.$root.$data.projects = response.data.projects;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    time(d) {
      return moment(d).format('D MMMM YYYY, h:mm:ss a');
    },
	setCreating() {
      this.creating = true;
    },
    cancelCreating() {
      this.creating = false;
    },
    async addProject() {
      try {
        await axios.post("/api/projects", {
          problem: this.problem,
          title: this.title,
          reward: this.reward
        });
        this.problem = "";
		this.title = "";
		this.reward = "";
        this.creating = false;
        this.getProjects();
        return true;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>


