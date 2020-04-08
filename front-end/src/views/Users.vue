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
  computed: {
	users() {
		return this.$root.$data.users.filter(user => (user.first_name.toLowerCase().search(this.searchText) >= 0 || user.last_name.toLowerCase().search(this.searchText) >= 0 || user.description.toLowerCase().search(this.searchText) >= 0));
	}
  },
}
</script>