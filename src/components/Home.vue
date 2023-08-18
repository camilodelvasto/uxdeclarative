<template>
  <div class="home">
    <h1>Thoughts on UX + declarative approach</h1>
    <div class="flexr">
      <router-link to="/one">Standard</router-link>
      <router-link to="/two">Improved</router-link>
    </div>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh;
}
.flexr {
  display: flex;
  justify-content: space-between;
  width: 200px;
}
</style>
