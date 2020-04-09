<template>
	<div>
		<div class="header"><h1><center>Create an Account</center></h1></div>
        <div class="center">
            <form style="background-color: burlywood; padding: 20px; margin: 20px; width: 600px">
                <h2>Sign in to existing account</h2>
                <fieldset>
                    <label style="margin-top: 10px">Email address</label>
                    <input class="form-control" v-model="emailLogin" placeholder="Enter email">
                </fieldset>
                <fieldset>
                    <label>Password</label>
                    <input type="password" class="form-control" v-model="passwordLogin" placeholder="Password">
                </fieldset>
                <fieldset>
					<button type="submit" class="pure-button pure-button-primary" @click.prevent="login" style="margin-top: 10px">Login</button>
				</fieldset>
            </form>
			<p v-if="error" class="error">{{error}}</p>
            <form style="background-color: burlywood; padding: 20px; width: 600px; margin: 20px">
                <h2>Create a new Account</h2>
				<fieldset style="display: flex; flex-direction: row">
					<legend style="display: block">Name:</legend>
					<div style="display: flex; flex-direction: row; justify-content: space-between">
					<input placeholder="First Name" v-model="firstName" class="form-control" style="display: flex; width:48%">
					<input placeholder="Last Name" v-model="lastName" class="form-control" style="display: flex; width: 48%">
					</div>
				</fieldset>
				<fieldset>
					<label style="margin-top: 10px">Brief Description:</label>
                    <input class="form-control" v-model="description" placeholder="Collaborative">
				</fieldset>
                <fieldset>
                    <label style="margin-top: 10px">Email Address:</label>
                    <input class="form-control" v-model="email" placeholder="Enter email">
                    <p class="form-text text-muted">We'll never share your email with anyone else.</p>
                </fieldset>
                <fieldset>
                    <label>Password:</label>
                    <input type="password" class="form-control" v-model="password" placeholder="Password">
                </fieldset>
				<fieldset>
                    <label>Avatar URL(optional)</label>
                    <input class="form-control" v-model="avatar">
                </fieldset>
                <fieldset>
                    <label style="margin-top: 10px">Account Type</label>
                    <select class="form-control" v-model="accountType">
                        <option value="Collaborator" selected>Collaborator</option>
                        <option value="Corporate">Corporate</option>
                        <option value="Service">Humanitarian/Service</option>
                    </select>
                </fieldset>
                <fieldset>
					<button type="submit" class="pure-button pure-button-primary" @click.prevent="register" style="margin-top: 10px">Register</button>
				</fieldset>
            </form>
			<p v-if="errorLogin" class="error">{{errorLogin}}</p>
        </div>
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
  name: 'Join',
  data() {
    return {
      avatar: '',
      firstName: '',
      lastName: '',
      description: '',
      email: '',
      password: '',
      accountType: '',
      emailLogin: '',
      passwordLogin: '',
      error: '',
      errorLogin: '',
	}
  },
  methods: {
	async register() {
      this.error = '';
      this.errorLogin = '';
      if (!this.firstName || !this.lastName || !this.email || !this.password)
        return;
      try {
        let response = await axios.post('/api/users', {
          avatar: this.avatar,
          firstName: this.firstName,
          lastName: this.lastName,
          description: this.description,
          email: this.email,
          password: this.password,
          role: this.accountType
        });
        this.$root.$data.user = response.data.user;
		this.$router.push('current');
      } catch (error) {
        this.error = error.response.data.message;
        this.$root.$data.user = null;
      }
    },
	async login() {
      this.error = '';
      this.errorLogin = '';
      if (!this.emailLogin || !this.passwordLogin)
        return;
      try {
        let response = await axios.post('/api/users/login', {
          email: this.emailLogin,
          password: this.passwordLogin,
        });
        this.$root.$data.user = response.data.user;
		this.$router.push('current');
      } catch (error) {
        this.errorLogin = "Error: " + error.response.data.message;
        this.$root.$data.user = null;
      }
    }
 }
}
</script>


