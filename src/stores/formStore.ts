import type { Form } from '../types/formStepsTypes'
import { defineStore } from 'pinia'

export const useFormStore = defineStore('form', {
  state: () => ({
    step: 0,
    formData: {} as Form
  }),
  getters: {
    addonsTotalPrice: (state) => {
      let totalPrice = 0
      state.formData.addons?.forEach((addon) => {
        totalPrice += addon.price
      })
      return totalPrice
    }
  },
  actions: {
    incrementStep() {
      this.step += 1
    },
    decrementStep() {
      this.step -= 1
    },
    setStep(stepNumber: number) {
      this.step = stepNumber
    },
    collectFormData<T extends Object>(payload: T) {
      this.formData = { ...this.formData, ...payload }
    }
  }
})
