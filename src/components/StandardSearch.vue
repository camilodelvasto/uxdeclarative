<template>
    <div class="container">
      <div class="search-bar">
        <input v-model="searchTerm" placeholder="Search users..." class="search-input" @keyup.enter="searchUsers" />
        <button @click="searchUsers" class="search-button">Search</button>
      </div>
      <div v-if="users.length">
        <ul>
          <li v-for="user in users" :key="user.id">
            <h3>{{ user.name }}</h3>
            <p><strong>Email:</strong> {{ user.email }}</p>
            <p><strong>Address:</strong> {{ user.address.street }}, {{ user.address.city }}</p>
            <p><strong>Company:</strong> {{ user.company.name }}</p>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  
  const searchTerm = ref('')
  const users = ref([])
  
  const searchUsers = async () => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users?username=${searchTerm.value}`)
    users.value = response.data
  }
  </script>
  
  <style scoped>
  </style>
