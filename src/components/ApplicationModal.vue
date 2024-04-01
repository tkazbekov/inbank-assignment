<template>
  <Transition name="modalTransition">
    <div v-if="show" class="modal-mask">
      <div class="modal-body">
        <div class="modal-header">
          <h2 class="header-caption">Personal details</h2>
          <button class="header-close" @click="close">
            <SvgIcon class="close-icon" iconName="cross" />
          </button>
        </div>
        <form class="modal-form">
          <CustomInput
            ref="firstNameInputRef"
            type="text"
            v-model="firstName"
            label="First name"
            class="form-input"
            required
          ></CustomInput>
          <CustomInput
            ref="lastNameInputRef"
            type="text"
            v-model="lastName"
            label="Last name"
            class="form-input"
            required
          ></CustomInput>
          <CustomInput
            ref="telInputRef"
            type="tel"
            v-model="mobile"
            label="Mobile number"
            class="form-input"
            required
          ></CustomInput>
          <CustomInput
            ref="emailInputRef"
            type="email"
            v-model="email"
            label="E-mail"
            class="form-input"
            required
          ></CustomInput>
          <CustomInput
            ref="incomeInputRef"
            type="number"
            v-model="income"
            label="Monthly income"
            class="form-input"
            min="100"
            required
          ></CustomInput>
        </form>
        <CustomButton class="form-submit" @click="onSubmit">
          Submit
          <LoadingSpinner class="loading-spinner" v-if="loading" />
        </CustomButton>
      </div>
      <div class="modal-clickout" @click="$emit('close')"></div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'

import SvgIcon from '@/components/SvgIcon.vue'
import CustomButton from '@/components/CustomButton.vue'
import CustomInput from '@/components/CustomInput.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

import type { ApplicationData } from '@/types/Loan'

type Props = {
  show: boolean
  loading: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  submit: [data: Partial<ApplicationData>]
  close: []
}>()

const firstName = ref('')
const lastName = ref('')
const mobile = ref('')
const email = ref('')
const income = ref('')

const firstNameInputRef = ref(null)
const lastNameInputRef = ref(null)
const telInputRef = ref(null)
const emailInputRef = ref(null)
const incomeInputRef = ref(null)
const inputRefs = ref([
  firstNameInputRef,
  lastNameInputRef,
  telInputRef,
  emailInputRef,
  incomeInputRef
])

function close() {
  emit('close')
}

function onSubmit() {
  if (!validate()) {
    return
  }
  const formData = {
    firstName: firstName.value,
    lastName: lastName.value,
    mobile: mobile.value,
    email: email.value,
    income: income.value
  }

  emit('submit', formData)
}

function validate() {
  var isFormValid = true
  inputRefs.value.forEach((input) => {
    if (!input.value.validate()) {
      isFormValid = false
    }
  })
  return isFormValid
}
</script>

<style scoped>
.modal-mask {
  container-type: inline-size;
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: all 0.3s ease;
}

.modal-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  z-index: 2;
  margin: auto;
  max-width: 33.75rem;
  padding: 2.5rem;
  background-color: var(--color-white);
  border-radius: 1.875rem;
  transition: all 0.3s ease;
}

.modal-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-caption {
  font-weight: var(--fw-semi-bold);
  font-size: var(--fs-modal-heading);
  line-height: var(--lh-500);
}

.header-close {
  all: unset;
  height: 1.5rem;
  width: 1.5rem;
}

.close-icon {
  width: 100%;
  height: 100%;
}

.modal-form {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.form-input {
  flex: 1 1 100%;
}

.form-submit {
  width: 100%;
  position: relative;
}

.loading-spinner {
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
}

.modal-clickout {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
}

@container (width < 89rem) {
  .modal-body {
    margin-bottom: 0;
    border-radius: 1.875rem 1.875rem 0 0;
  }
  .modalTransition-enter-from,
  .modalTransition-leave-to {
    & > .modal-body {
      transform: translateY(100%);
    }
  }
}

.modalTransition-enter-from,
.modalTransition-leave-to {
  opacity: 0;
}
</style>
