<template>
  <div class="d-flex flex-column justify-space-between h-100">
    <div>
      <h1>Finishing up</h1>
      <h3 class="description">Double-check everything looks OK before confirming</h3>
      <v-card class="summary-container mt-8 pa-4 d-flex flex-column" elevation="0">
        <div class="d-flex justify-space-between align-center">
          <div>
            <p class="font-weight-bold">{{ planDetails }}</p>
            <span
              class="text-decoration-underline font-weight-medium change-plan"
              @click="formStore.setStep(1)"
              >Change</span
            >
          </div>
          <span class="font-weight-bold">{{ planPrice }}</span>
        </div>
        <v-divider></v-divider>
        <div
          class="d-flex justify-space-between align-center px-1 font-14"
          v-for="addon in formStore.formData.addons"
          :key="addon.title"
        >
          <p class="addon-title font-weight-medium">{{ addon.title }}</p>
          <span class="font-weight-medium">+${{ addon.price }}/mo</span>
        </div>
      </v-card>
      <div class="mt-4 d-flex justify-space-between align-center mx-4">
        <p class="addon-title font-weight-medium">Total (per month)</p>
        <p class="total-price">+${{ totalPrice }}/mo</p>
      </div>
    </div>
    <div class="d-flex justify-space-between mx-3 mb-8">
      <v-btn
        flat
        color="white"
        class="text-none back-button"
        :disabled="isRequestLoading"
        @click="decrementStep"
        >Go Back</v-btn
      >
      <v-btn class="text-none" flat color="#02295a" @click="confirm" :loading="isRequestLoading"
        >Confirm</v-btn
      >
    </div>

    <v-snackbar
      color="error"
      :multi-line="true"
      :timeout="3000"
      class="mt-8"
      shaped
      transition="slide-y-transition"
      v-model="snackbarState"
    >
      <span>Confirming game plan failed please try again</span>
      <v-btn density="compact" icon="mdi-close" color="grey" class="ml-2"></v-btn>
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { confirmService } from '@/services'
import { ref, computed } from 'vue'
import { useFormStore } from '@/stores/formStore'
const formStore = useFormStore()

const planDetails = computed(() => {
  const planPeriod = formStore.formData.plan.isMonthlyPeriod ? 'Monthly' : 'Yearly'
  return `${formStore.formData.plan.name} (${planPeriod})`
})

//Plan pricing
const planPrice = computed(() => {
  const planPrice = formStore.formData.plan.isMonthlyPeriod
    ? formStore.formData.plan.monthly
    : formStore.formData.plan.yearly
  const planPeriod = formStore.formData.plan.isMonthlyPeriod ? 'mo' : 'yr'
  return `$${planPrice}/${planPeriod}`
})
const totalPrice = computed(() => {
  const planPrice = formStore.formData.plan.isMonthlyPeriod
    ? formStore.formData.plan.monthly
    : formStore.formData.plan.yearly / 12

  return planPrice + formStore.addonsTotalPrice
})

//snackbar
const snackbarState = ref(false)
const setSnackbar = (val: boolean) => {
  snackbarState.value = val
}
const showSnackbar = () => {
  setSnackbar(true)
  setTimeout(() => {
    setSnackbar(false)
  }, 3000)
}

//steps functionality
const setStep = () => {
  formStore.setStep(1)
}
const decrementStep = () => {
  formStore.decrementStep()
}

//Send final plan details to api
const isRequestLoading = ref(false)
const confirm = async () => {
  try {
    isRequestLoading.value = true
    await confirmService.confirmPlan(formStore.formData)
    formStore.incrementStep()
  } catch {
    showSnackbar()
  } finally {
    isRequestLoading.value = false
  }
}
</script>

<style lang="scss" scoped>
.summary-container {
  background-color: #fafbff;
  row-gap: 20px;
  .change-plan {
    cursor: pointer;
    color: #9699ab;
    font-size: 14px;
  }
}
.addon-title {
  color: #9699ab;
}
.total-price {
  font-size: 20px;
  font-weight: bold;
  color: #473dff;
}
</style>
