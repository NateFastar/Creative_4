<template>
<div class="wrapper">
  <div class="products">
    <div class="product" v-for="user in users" :key="user.id">
      <div class="image">
        <img :src="user.avatar">
      </div>
      <div class="info">
        <h1>{{user.first_name}} {{user.last_name}}</h1>
        <p>{{user.description}}</p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'UserList',
  props: {
    users: Array
  },
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.products {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.product {
  margin: 10px;
  margin-top: 50px;
  width: 200px;
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
  height: 100px;
}

.info h1 {
  font-size: 20px;
}

.info h2 {
  font-size: 14px;
}

.info p {
  margin: 0px;
  font-size: 18px;
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
</style>