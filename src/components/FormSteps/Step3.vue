<template>
  <div class="d-flex flex-column justify-space-between h-100">
    <div>
      <h1>Pick add-ons</h1>
      <h3 class="description">Add-ons help enhance your gaming experience</h3>
      <div class="d-flex flex-column addons-container mt-8">
        <v-card
          width="100%"
          height="80"
          elevation="0"
          v-for="addOn in addOns"
          :key="addOn.title"
          class="d-flex align-center pa-4 addon-card"
          :class="{ 'selected-addon-card': isSelectedAddon(addOn) }"
        >
          <v-checkbox
            v-model="selectedAddOns"
            :value="addOn"
            color="primary"
            hide-details
            multiple
          ></v-checkbox>
          <div class="d-flex justify-space-between align-center w-100 ml-4">
            <div class="d-flex flex-column">
              <span class="addon-title"> {{ addOn.title }} </span>
              <span class="addon-description"> {{ addOn.description }} </span>
            </div>
            <span class="addon-price">+${{ addOn.price }}/mo</span>
          </div>
        </v-card>
      </div>
    </div>
    <div class="d-flex justify-space-between mx-3 mb-8">
      <v-btn flat color="white" class="text-none back-button" @click="decrementStep">Go Back</v-btn>
      <v-btn class="text-none" flat color="#02295a" @click="nextStep">Next Step</v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useFormStore } from '@/stores/formStore'
import type { addon } from '@/types/formStepsTypes'
import { reactive } from 'vue'
const formStore = useFormStore()

const addOns = [
  { title: 'Online ', description: 'Access to multiplayer games', price: 1 },
  { title: 'Large storage', description: 'Extra 1TB of cloud save', price: 2 },
  { title: 'Customizable profile', description: 'Custom theme on your profile', price: 2 }
]

const selectedAddOns = ref<addon[]>([])
const isSelectedAddon = (addon: addon) => {
  return selectedAddOns.value.findIndex((item) => item.title === addon.title) !== -1
}

const decrementStep = () => {
  formStore.decrementStep()
}
const nextStep = () => {
  formStore.collectFormData({ addons: selectedAddOns.value })
  formStore.incrementStep()
}
</script>

<style lang="scss" scoped>
.addons-container {
  row-gap: 30px;
  .addon-card {
    border: 1px solid #d6d9e6;
    border-radius: 7px;
    cursor: pointer;
    .addon-title {
      font-weight: 700;
      color: #02295a;
    }
    .addon-description {
      font-weight: 500;
      color: #9699ab;
      font-size: 14px;
    }
    .addon-price {
      color: #473dff;
      font-weight: 500;
    }
  }
  .addon-card:hover {
    border: 1px solid #473dff;
  }
  .selected-addon-card {
    border: 1px solid #473dff;
    background-color: #f0f6ff;
  }
}
</style>
