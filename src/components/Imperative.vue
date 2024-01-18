<template>
    <div class="container">
      <div class="button-bar">
        <button @click="generateSeed" class="fixie" disabled="isCreatePolicyDisabled">Create Policy</button>
        <button @click="addBeneficiary" class="fixie" disabled="isAddBeneficiaryDisabled">Add Beneficiary</button>
        <button @click="fileClaim" class="fixie" disabled="isFileClaimDisabled">File <br>Claim</button>
        <button @click="clearData" class="fixie" disabled="isClearDataDisabled">Clear<br>Data</button>
      </div>
      <div class="results">
        <div class="seed">Policy ID: {{ seed !== null ? seed : '--' }}</div>
        <transition name="fade">
          <div v-if="imageUrl">
            <div class="user" v-if="user && imageUrl">
              <h3>{{ user.name }}</h3>
              <p><span class="left">Email:</span><span class="right">{{ user.email }}</span></p>
              <p><span class="left">Address:</span><span class="right">{{ user.address.street }}, {{ user.address.city }}</span></p>
              <p><span class="left">Phone:</span><span class="right">{{ user.phone }}</span></p>
            </div>
            <div class="image">
              <img v-if="imageUrl" :src="imageUrl" @error="handleImageError" />
            </div>
          </div>
        </transition>
      </div>
    </div>
  </template>
  
<script setup>
import { computed, ref } from 'vue'
import axios from 'axios';

const seed = ref(null);
let isAborted = false;
let isGenerating = false;
let user = ref(null);

let isCreatePolicyDisabled = ref(false);
let isAddBeneficiaryDisabled = ref(false);
let isFileClaimDisabled = ref(false);
let isClearDataDisabled = ref(false);



const generateSeed = async () => {
  if (isGenerating) {
    return;
  }

  isAborted = false;
  isGenerating = true;
  seed.value = 'Generating...';
  const delay = Math.floor(Math.random() * 5000);
  await new Promise((resolve) => setTimeout(resolve, delay));

  if (!isAborted) {
    seed.value = Math.floor(Math.random() * 10) + 1;

    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${seed.value}`);
    user.value = response.data;

  }
  isGenerating = false;
};




const imageUrl = computed(() => {
  if (seed.value !== null && !isNaN(seed.value)) {
    return `https://picsum.photos/id/12${seed.value}/400`;
  }
  return null;
});

const handleImageError = ($event) => {
  if (seed.value !== null) {
    console.log('Image error', $event);
    generateSeed();
  }
};

</script>

<style scoped>
</style>
