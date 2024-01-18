<template>
    <div class="container">
      <div class="button-bar">
        <button @click="generateSeed" class="fixie">Rand</button>
        <button @click="decrementSeed" class="fixie">-1</button>
        <button @click="incrementSeed" class="fixie">+1</button>
        <button @click="abort" class="fixie">Abort</button>
      </div>
      <div class="results">
        <div class="seed">Seed: {{ seed !== null ? seed : '--' }}</div>
        <div class="image">
          <img v-if="imageUrl" :src="imageUrl" @error="handleImageError" />
          <div v-else class="placeholder">No image</div>
        </div>
      </div>
    </div>
  </template>
  
<script setup>
import { computed, ref } from 'vue'

const seed = ref(null);
let isAborted = false;
let isGenerating = false;

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
    seed.value = Math.floor(Math.random() * 1000) + 1;
  }
  isGenerating = false;
};

const incrementSeed = () => {
  if (seed.value === null) {
    generateSeed();
  } else {
    seed.value = (seed.value + 1) % 1001;
  }
};
const decrementSeed = () => {
  if (seed.value === null) {
    generateSeed();
  } else {
    seed.value = seed.value - 1;
    if (seed.value < 0) {
      seed.value = 1000;
    }
  }
};
const abort = () => {
  isAborted = true;
  isGenerating = false;
  seed.value = null;
};

const imageUrl = computed(() => {
  if (seed.value !== null && !isNaN(seed.value)) {
    return `https://picsum.photos/id/${seed.value}/400`;
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
