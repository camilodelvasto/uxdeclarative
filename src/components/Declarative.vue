<template>
  <div class="container">
    <div class="button-bar">
      <button @click="handleCreatePolicy" class="fixie" :disabled="isCreatePolicyDisabled">Create Policy</button>
      <button @click="handleAddBeneficiary" class="fixie" :disabled="isAddBeneficiaryDisabled">Add Beneficiary</button>
      <button @click="handleFileClaim" class="fixie" :disabled="isFileClaimDisabled">File <br>Claim</button>
      <button @click="handleClearData" class="fixie" :disabled="isClearDataDisabled">Clear<br>Data</button>
    </div>
    <div class="results">
      <div class="seed">Policy ID: {{ isGenerating ? 'Generating...' : '' }}  {{ seed !== null ? seed : '--' }}</div>
      <transition name="fade">
        <div v-if="imageUrl">
          <div class="user" v-if="user && imageUrl">
            <h3>{{ user.name }}
              <span class="alignr">
                <span v-if="hasAdditionalBeneficiaries">[ b ]</span> <span v-if="hasClaim">[ c ]</span>
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
import { watch, ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();

// Reactive State
const seed = ref(null);
const user = ref(null);
const isAborted = ref(false);
const isGenerating = ref(false);

// Derived State from Query Params
const isCreatePolicyDisabled = computed(() => route.query.cpd === 'true');
const isAddBeneficiaryDisabled = computed(() => route.query.abd === 'true');
const isFileClaimDisabled = computed(() => route.query.fcd === 'true');
const isClearDataDisabled = computed(() => route.query.cld === 'true');
const hasAdditionalBeneficiaries = computed(() => route.query.hab === 'true');
const hasClaim = computed(() => route.query.hc === 'true');

// Update Query Params
const updateQueryParams = (params, newSeed = null) => {
  if (newSeed !== null) {
    seed.value = newSeed;
  }
  router.replace({ query: { ...route.query, ...params, seed: seed.value } });
};

// Event Handlers
const handleCreatePolicy = () => {
  updateQueryParams({ cpd: 'true', abd: 'false', fcd: 'false', cld: 'false' });
  isGenerating.value = true;
};

const handleAddBeneficiary = () => {
  updateQueryParams({ hab: 'true' });
};

const handleFileClaim = () => {
  updateQueryParams({ hc: 'true', abd: 'true', fcd: 'true' });
};

const handleClearData = () => {
  updateQueryParams({ cpd: 'false', abd: 'true', fcd: 'true', cld: 'true', hab: 'false', hc: 'false' });
  seed.value = null;
  user.value = null;
};

// Watchers
watch(isGenerating, async (newVal) => {
  if (newVal) {
    isAborted.value = false;
    const delay = Math.floor(Math.random() * 5000);
    await new Promise((resolve) => setTimeout(resolve, delay));

    if (!isAborted.value) {
      seed.value = Math.floor(Math.random() * 10) + 1;
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${seed.value}`);
      user.value = response.data;
    }
    isGenerating.value = false;
  }
});

onMounted(() => {
  if (route.query.seed) {
    seed.value = route.query.seed;
    fetchUserData(seed.value);
  }
});

const fetchUserData = async (userId) => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
    user.value = response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

// Image URL Computed Property
const imageUrl = computed(() => {
  if (seed.value !== null && !isNaN(seed.value)) {
    return `https://picsum.photos/id/1${seed.value}/400`;
  }
  return null;
});

// Image Error Handling
const handleImageError = () => {
  if (seed.value !== null) {
    handleCreatePolicy();
  }
};

</script>

<style scoped>
</style>
