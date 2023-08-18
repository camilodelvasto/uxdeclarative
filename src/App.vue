<script setup>
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
body, button, input, textarea {
  font-family: 'Avenir', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  padding: 2rem;
}

.search-bar {
  display: flex;
  align-items: center;
}

.search-input {
  flex: 1;
  padding: 0.5rem;
  height: 36px; /* Making it same height as button */
  border: 1px solid #ccc;
  margin-right: 1rem; /* Margin between search box and button */
  border-radius: 5px; /* Slightly rounded corners */
}

.search-button {
  padding: 0.5rem 1rem;
  background-color: #4CAF75; /* Green color */
  border: none;
  cursor: pointer;
  color: white;
  height: 36px; /* Making it same height as input */
  border-radius: 5px; /* Slightly rounded corners */
}

.search-button:hover {
  background-color: #45a049;
}

</style>
