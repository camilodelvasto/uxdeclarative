<template>
  <div class="container">
    <div class="button-bar">
      <button @click="handleCreatePolicy" class="fixie" :disabled="isCreatePolicyDisabled">Create Policy</button>
      <button @click="handleAddBeneficiary" class="fixie" :disabled="isAddBeneficiaryDisabled">Add Beneficiary</button>
      <button @click="handleFileClaim" class="fixie" :disabled="isFileClaimDisabled">File <br>Claim</button>
      <button @click="handleClearData" class="fixie" :disabled="isClearDataDisabled">Clear<br>Data</button>
    </div>
    <div class="results">
      <div class="seed">Policy ID: {{ isGenerating ? 'Generating...' : '' }}  {{ seed !== null ? seed : '' }}</div>
      <transition name="fade">
        <div v-if="imageUrl || true">
          <div class="user" v-if="user && imageUrl">
            <h3>{{ user.name }}
              <span class="alignr">
                <span v-if="beneficiaryCount === 1">[ b ]</span>
                <span v-if="beneficiaryCount > 1">[ {{ beneficiaryCount }}*b ]</span>
                <span v-if="hasClaimFiled">[ c ]</span>
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
import { watch, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();

// Reactive State
const user = ref(null);
const isGenerating = ref(false);

// Derived State from Route Params
const seed = computed(() => route.params.seed || null);
const beneficiaryCount = computed(() => parseInt(route.params.ben) || 0);
const hasClaimFiled = computed(() => route.params.claim === '1');

// Computed properties based on route parameters
const isCreatePolicyDisabled = computed(() => seed.value !== null);
const isAddBeneficiaryDisabled = computed(() => seed.value === null || beneficiaryCount.value > 4 || hasClaimFiled.value);
const isFileClaimDisabled = computed(() => seed.value === null || hasClaimFiled.value);
const isClearDataDisabled = computed(() => seed.value === null);

// Navigate to new path
const navigate = (updates) => {
  const newRoute = {
    ...route.params,
    ...updates
  };
  if (newRoute.seed === null) {
    return router.push('/two');
  }
  router.push(`/two/id/${newRoute.seed}/ben/${newRoute.ben}/claim/${newRoute.claim}`);
};

// Event Handlers
const handleCreatePolicy = async () => {
  isGenerating.value = true;
  const delay = Math.floor(Math.random() * 2000);
  await new Promise((resolve) => setTimeout(resolve, delay));

  const newSeed = Math.floor(Math.random() * 10) + 1;
  navigate({ seed: newSeed, ben: '0', claim: '0' });
  isGenerating.value = false;
};

const handleAddBeneficiary = () => {
  navigate({ ben: (beneficiaryCount.value + 1).toString() });
};

const handleFileClaim = () => {
  navigate({ claim: '1' });
};

const handleClearData = () => {
  navigate({ seed: null, ben: '0', claim: '0' });
};

const fetchUserData = async (userId) => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
    user.value = response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

// Watcher for seed
watch(seed, (newSeed) => {
  if (newSeed) {
    fetchUserData(newSeed);
  } else {
    user.value = null;
  }
}, { immediate: true });

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
