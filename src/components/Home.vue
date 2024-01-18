<template>
  <div class="home">
    <h1>Imperative vs declarative</h1>
    <div class="flexr">
      <button class="search-button large" @click="goTo('/one', 50)">Imperative</button>
      <button class="search-button large" @click="goTo('/two', 50)">Declarative</button>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goTo = (path, delay = 0) => {
  setTimeout(() => {
    router.push(path)
  }, delay)
}
</script>

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
}
button {
  margin: 0 0.5rem;
}

</style>
