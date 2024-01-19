<template>
  <div class="container">
    <div class="button-bar">
      <button @click="generateSeedHandler" class="fixie" :disabled="isCreatePolicyDisabled">Create Policy</button>
      <button @click="addBeneficiaryHandler" class="fixie" :disabled="isAddBeneficiaryDisabled">Add Beneficiary</button>
      <button @click="fileClaimHandler" class="fixie" :disabled="isFileClaimDisabled">File <br>Claim</button>
      <button @click="clearDataHandler" class="fixie" :disabled="isClearDataDisabled">Clear<br>Data</button>
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
  
<script>
import axios from 'axios';

export default {
  data() {
    return {
      seed: null,
      isAborted: false,
      isGenerating: false,
      user: null,
      isCreatePolicyDisabled: false,
      isAddBeneficiaryDisabled: true,
      isFileClaimDisabled: true,
      isClearDataDisabled: true,
      beneficiaryCount: 0,
      hasClaim: false,
    };
  },
  computed: {
    imageUrl() {
      if (this.seed !== null && !isNaN(this.seed)) {
        return `https://picsum.photos/id/1${this.seed}/400`;
      }
      return null;
    }
  },
  methods: {
    async generateSeedHandler() {
      if (this.isGenerating) {
        return;
      }

      this.isAborted = false;
      this.isGenerating = true;
      this.seed = null;
      const delay = Math.floor(Math.random() * 2000);
      await new Promise((resolve) => setTimeout(resolve, delay));

      if (!this.isAborted) {
        this.seed = Math.floor(Math.random() * 10) + 1;
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${this.seed}`);
        this.user = response.data;
        this.isCreatePolicyDisabled = true;
        this.isAddBeneficiaryDisabled = false;
        this.isFileClaimDisabled = false;
        this.isClearDataDisabled = false;
      }
      this.isGenerating = false;
    },
    addBeneficiaryHandler() {
      this.beneficiaryCount = this.beneficiaryCount < 4 ? this.beneficiaryCount + 1 : 5;
      this.isAddBeneficiaryDisabled = this.beneficiaryCount > 4;
    },
    fileClaimHandler() {
      this.hasClaim = true;
      this.isAddBeneficiaryDisabled = true;
      this.isFileClaimDisabled = true;
    },
    clearDataHandler() {
      this.seed = null;
      this.user = null;
      this.isCreatePolicyDisabled = false;
      this.isAddBeneficiaryDisabled = true;
      this.isFileClaimDisabled = true;
      this.isClearDataDisabled = true;
      this.beneficiaryCount = 0;
      this.hasClaim = false;
    },
    handleImageError($event) {
      if (this.seed !== null) {
        this.generateSeedHandler();
      }
    }
  }
};
</script>

<style scoped>
</style>
