<template>
  <div id="app" style="backgroundColor: rgba(173,216,230)" class="content">
    <center><router-link to="/">
      <img src="/images/homeLogo.png">
	</router-link></center>
    <nav class="navbar navbar-expand-lg navbar-light" style="background-image: url('/images/homeBar.png'); background-size: 100% 100%">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
			<strong>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/projects" class="nav-link">Current Collaborations: {{$root.$data.projects.length}}</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/users" class="nav-link">Get Help</router-link>
                    </li>
                    <li v-if="$root.$data.signIn" class="nav-item">
                        <router-link to="/current" class="nav-link">Accepted Projects: {{$root.$data.accepted}}</router-link>
                    </li>
					<li v-else class="nav-item">
                        <router-link to="/new" class="nav-link">Join</router-link>
                    </li>
                </ul>
				</strong>
            </div>
        </nav>
		<div class="center">
			<router-view/>
		</div>
		<div class="footer">
            <p>Copyright 2020 Nathan Fastabend. <a href="https://github.com/NateFastar/Creative3">To the GitHub Repository</a></p>
        </div>
  </div>
  
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  min-height: 100%;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.content {
    min-height: 100%;
    position: relative;
}

.center {
    display: flex;
    justify-content: space-around;
    padding-bottom: 60px;
}

.footer {
    display: block;
    text-align: center;
    padding-top: 15px;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 60px;
    background-image: url('/images/homeBar.png');
    background-size: 100% 100%;
    color: #000000;
}
</style>
