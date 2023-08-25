<template>
    <div class="container">
      <div class="search-bar">
        <input v-model="searchTerm" placeholder="Search users..." class="search-input" @input="updateUrl" @keydown.enter="searchUsers" />
        <button @click="searchUsers" class="search-button">Search</button>
      </div>
      <div v-if="users?.length">
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
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();

let searchTerm = ref(route.params.term || '');
const users = ref([]);

const updateUrl = () => {
    users.value = []; 
    router.replace(`/two/${searchTerm.value}`);
};

const searchUsers = async () => {
    if(!route.path.endsWith('/results')) {
        router.push(`/two/${searchTerm.value}/results`);
    }
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users?username=${searchTerm.value}`);
    users.value = response.data;
}

onMounted(() => {
    if (route.path.endsWith('/results')) {
        searchUsers();
    }
});

watch(route, (to, from) => {
    if (to.path.endsWith('/results')) {
        searchUsers();
    } else if (!to.path.endsWith('/results')) {
        users.value = [];
    }
});
</script>

<style scoped>
</style>
