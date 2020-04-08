<template>
<div class="wrapper">
  <div class="products">
    <div class="product" v-for="accept in accepts" :key="accept.id" >
      <div class="card">
        <h5 class="card-header" v-bind:class="projectType(accept.type)">{{projectType(accept.type)}} Project</h5>
        <div class="card-body">
          <h5 class="card-title" style="font-style:italic">{{accept.company}}</h5>
          <p class="card-text">{{accept.description}}.<br/> Reward:${{accept.reward}}
          <button type="button" class="btn btn-secondary" style="display:block; float:right" v-on:click="withdraw(accept)" v-if="$root.$data.signIn"><span>&#9240;</span></button>
          <button type="button" class="btn btn-secondary" style="display:block; float:right" v-else disabled><span>&#9240;</span></button>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'AcceptList',
  props: {
    accepts: Array
  },
  methods: {
	withdraw(item) {
      item.status = 0;
      this.$root.$data.accepted -= 1;
    },
	projectType(type) {
      if(type == 1) return "Community";
      if(type == 2) return "Personal";
      if(type == 3) return "Service";
      if(type == 4) return "Funded";
      else return "Funded";
	}
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.products {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width:95%;
}

.product {
  margin: 10px;
  width: 31%;
  text-align:left;
}

.product img {
  border: 2px solid #333;
  height: 250px;
  width: 200px;
  object-fit: cover;
}

.product .image {
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}

.info {
  background: #F2921D;
  color: #000;
  padding: 10px 30px;
  height: 80px;
}

.info h1 {
  font-size: 16px;
}

.info h2 {
  font-size: 14px;
}

.info p {
  margin: 0px;
  font-size: 10px;
}


.price {
  display: flex;
}

button {
  height: 50px;
  background: #000;
  color: white;
  border: none;
}

.auto {
  margin-left: auto;
}

.Community {
  background-color: burlywood;
  font-weight: bold;
}

.Personal {
  background-color: chocolate;
  font-weight: bold;
}

.Service {
  background-color: darkgoldenrod;
  font-weight: bold;
}

.Funded {
  background-color: darkolivegreen; 
  font-weight: bold;
}

</style>