<template>
  <div class="container">
    <div class="button-bar">
      <button @click="generateSeed" class="fixie" :disabled="isCreatePolicyDisabled">Create Policy</button>
      <button @click="addBeneficiary" class="fixie" :disabled="isAddBeneficiaryDisabled">Add Beneficiary</button>
      <button @click="fileClaim" class="fixie" :disabled="isFileClaimDisabled">File <br>Claim</button>
      <button @click="clearData" class="fixie" :disabled="isClearDataDisabled">Clear<br>Data</button>
    </div>
    <div class="results">
      <div class="seed">Policy ID: {{ isGenerating ? 'Generating...' : '' }}  {{ seed !== null ? seed : '' }}</div>
      <transition name="fade">
        <div v-if="imageUrl">
          <div class="user" v-if="user && imageUrl">
            <h3>{{ user.name }}
              <span class="alignr">
                <span v-if="beneficiaryCount === 1">[ b ]</span>
                <span v-if="beneficiaryCount > 1">[ {{ beneficiaryCount }}*b ]</span>
                <span v-if="hasClaim">[ c ]</span>
              </span>
            </h3>
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

const isCreatePolicyDisabled = ref(false);
const isAddBeneficiaryDisabled = ref(true);
const isFileClaimDisabled = ref(true);
const isClearDataDisabled = ref(true);
const beneficiaryCount = ref(false);
const hasClaim = ref(false);

const generateSeed = async () => {
  if (isGenerating) {
    return;
  }

  isAborted = false;
  isGenerating = true;
  seed.value = null;
  const delay = Math.floor(Math.random() * 2000);
  await new Promise((resolve) => setTimeout(resolve, delay));

  if (!isAborted) {
    seed.value = Math.floor(Math.random() * 10) + 1;

    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${seed.value}`);
    isCreatePolicyDisabled.value = true;
    isAddBeneficiaryDisabled.value = false;
    isFileClaimDisabled.value = false;
    isClearDataDisabled.value = false;
    user.value = response.data;
  }
  isGenerating = false;
};

const addBeneficiary = () => {
  beneficiaryCount.value = beneficiaryCount.value < 4 ? beneficiaryCount.value + 1 : 5;
  isAddBeneficiaryDisabled.value = beneficiaryCount.value > 4;
};
const fileClaim = () => {
  hasClaim.value = true;
  isAddBeneficiaryDisabled.value = true;
  isFileClaimDisabled.value = true;
};
const clearData = () => {
  seed.value = null;
  user.value = null;
  isCreatePolicyDisabled.value = false;
  isAddBeneficiaryDisabled.value = true;
  isFileClaimDisabled.value = true;
  isClearDataDisabled.value = true;
  beneficiaryCount.value = false;
  hasClaim.value = false;
};

const imageUrl = computed(() => {
  if (seed.value !== null && !isNaN(seed.value)) {
    return `https://picsum.photos/id/1${seed.value}/400`;
  }
  return null;
});

const handleImageError = ($event) => {
  if (seed.value !== null) {
    generateSeed();
  }
};

</script>

<style scoped>
</style>
