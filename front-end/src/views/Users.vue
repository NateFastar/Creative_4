<template>
	<div>
		<div class="wrapper">
			<div class="search">
				<form class="pure-form">
					<i class="fas fa-search"></i><input v-model="searchText" />
				</form>
			</div>
		</div>
		<UserList :users="users" />
		<p v-if="users.length==0">There's noone here yet</p>
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
import UserList from "../components/UserList.vue"
export default {
  name: 'Users',
  components: {
    UserList
  },
  data() {
    return {
      searchText: '',
    }
  },
  created() {
    this.getUsers();
  },
  computed: {
	users() {
		if(this.$root.$data.users != null)return this.$root.$data.users.filter(user => (user.firstName.toLowerCase().search(this.searchText) >= 0 || user.lastName.toLowerCase().search(this.searchText) >= 0 || user.description.toLowerCase().search(this.searchText) >= 0));
		else return this.$root.$data.users;
	}
  },
  methods: {
    async getUsers() {
      try {
        let response = await axios.get("/api/users/users");
        this.$root.$data.users = response.data.users;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>