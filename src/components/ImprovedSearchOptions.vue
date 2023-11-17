<template>
  <div>
    <Transition name="fade" mode="in-out">
      <div class="container legato" v-if="ready">
      </div>
    </Transition>
    <Transition name="fade" mode="in-out">
      <div class="container legato" v-if="ready2">
        <div class="search-bar">
          <input v-model="searchTerm" placeholder="Search users..." class="search-input" @input="updateUrl" @keydown.enter="searchUsers" />
          <button @click="searchUsers" class="search-button">Search</button>
        </div>
        <Transition name="fade" mode="in-out">
          <div v-if="users && users.length && ready3">
            <ul>
              <li v-for="user in users" :key="user.id">
                <h3>{{ user.name }}</h3>
                <p><strong>Email:</strong> {{ user.email }}</p>
                <p><strong>Address:</strong> {{ user.address.street }}, {{ user.address.city }}</p>
                <p><strong>Company:</strong> {{ user.company.name }}</p>
              </li>
            </ul>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchTerm: this.$route.params.term || '',
      users: [],
      ready: false,
      ready2: false,
      ready3: false
    };
  },
  methods: {
    async searchUsers() {
      if(!this.$route.path.endsWith('/results')) {
        this.$router.push(`/two/${this.searchTerm}/results`);
      }
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users?username=${this.searchTerm}`);
      this.users = response.data;
    },
    updateUrl() {
      this.users = [];
      this.$router.replace(`/two/${this.searchTerm}`);
    }
  },
  watch: {
    $route(to, from) {
      if (to.path.endsWith('/results')) {
        this.searchUsers();
      } else if (!to.path.endsWith('/results')) {
        this.users = [];
      }
    }
  },
  mounted() {
    if (this.$route.path.endsWith('/results')) {
      this.searchUsers();
    }
    setTimeout(() => {
      this.ready = true;
    }, 10)
    setTimeout(() => {
      this.ready2 = true;
    }, 400)
    setTimeout(() => {
      this.ready3 = true;
    }, 900)
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
