<template>
  <div class="ml-7 mt-4 mr-4 h-100" v-if="!mobile">
    <keep-alive>
      <component :is="componentName" />
    </keep-alive>
  </div>
  <v-card class="pa-4" height="580" v-else>
    <keep-alive>
      <component :is="componentName" />
    </keep-alive>
  </v-card>
</template>

<script setup lang="ts">
import Step1 from './FormSteps/Step1.vue'
import Step2 from './FormSteps/Step2.vue'
import Step3 from './FormSteps/Step3.vue'
import Step4 from './FormSteps/Step4.vue'
import SuccessfulConfirm from './SuccessfulConfirm.vue'
import { computed } from 'vue'
import { useFormStore } from '@/stores/formStore'
import { useDisplay } from 'vuetify'
const formStore = useFormStore()

// eslint-disable-next-line vue/return-in-computed-property
const componentName = computed(() => {
  switch (formStore.step) {
    case 0:
      return Step1
    case 1:
      return Step2
    case 2:
      return Step3
    case 3:
      return Step4
    case 4:
      return SuccessfulConfirm
  }
})

const { mobile } = useDisplay()
</script>
