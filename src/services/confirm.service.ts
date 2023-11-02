import axios from 'axios'
import type { Form } from '@/types/formStepsTypes'

const confirmPlan = (payload: Form) => {
  const url = `https://jsonplaceholder.typicode.com/posts`
  return axios.post(url, payload)
}

export const confirmService = {
  confirmPlan
}
