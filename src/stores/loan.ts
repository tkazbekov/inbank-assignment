import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { ApplicationData, LoanData } from '@/types/Loan'

export const useLoanStore = defineStore('loan', () => {
  const loanData = ref<LoanData>()

  function calculate(amount: number, period: number) {
    return +(amount / period).toFixed(2)
  }

  async function apply(
    formData: ApplicationData
  ): Promise<{ success: boolean; period?: number; amount?: number; monthly?: number }> {
    const data = { ...formData, monthly: calculate(formData.amount, formData.period) }
    loanData.value = data

    if (formData.firstName === 'error') {
      throw new Error('Error')
    }

    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      success: formData.income >= 1000,
      ...data
    }
  }

  return { loanData, apply, calculate }
})
