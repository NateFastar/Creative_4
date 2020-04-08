<template>
	<div>
		<div class="header"><h1><center>Create an Account</center></h1></div>
        <div class="center">
            <form style="background-color: burlywood; padding: 20px; margin: 20px; width: 600px">
                <h2>Sign in to existing account</h2>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                </div>
                <button type=button class="btn btn-primary" v-on:click="confirm()">Sign in</button>
            </form>
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
                    <label style="margin-top: 10px">Email Address:</label>
                    <input class="form-control" v-model="email" placeholder="Enter email">
                    <p class="form-text text-muted">We'll never share your email with anyone else.</p>
                </fieldset>
                <fieldset>
                    <label>Password:</label>
                    <input type="password" class="form-control" v-model="password" placeholder="Password">
                </fieldset>
                <fieldset>
                    <label style="margin-top: 10px">Account Type</label>
                    <select class="form-control" v-model="accountType">
                        <option>Collaborator</option>
                        <option>Corporate</option>
                        <option>Humanitarian/Service</option>
                    </select>
                </fieldset>
                <button type=button class="btn btn-primary" v-on:click="confirm()">Submit</button>
            </form>
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
export default {
  name: 'Join',
  data() {
    return {
      firstName: '',
      lastName: '',
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
	confirm() {
      this.$root.$data.signIn = true;
      this.$router.push('current');
    }
 }
}
</script>


