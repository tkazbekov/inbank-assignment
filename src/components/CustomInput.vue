<template>
  <div class="input-container" :class="{ disabled: disabled, error: !isValid }">
    <input
      class="input"
      :class="{ filled: internalValue }"
      :id="inputId"
      :value="internalValue"
      :placeholder="placeholder"
      @input="onInput"
      @change="onChange"
      :disabled="disabled"
      :inputmode="getInputMode()"
    />
    <label v-if="label" class="label" :for="inputId">{{ label }}</label>
    <div v-if="caption && !errorMessage && !isValid" class="caption">{{ caption }}</div>
    <div v-if="errorMessage && !isValid" class="caption">{{ errorMessage }}</div>
  </div>
</template>

<script setup lang="ts">
import test from 'node:test'
import { ref, watch } from 'vue'

const ERROR_CODES = {
  tel: 'Invalid phone number format (8-11 digits)',
  email: 'Invalid email format (email@example.com)',
  required: 'This field cannot be empty',
  number: 'This field only accepts numbers'
}

enum INPUT_TYPES {
  Text = 'text',
  Number = 'number',
  Tel = 'tel',
  Email = 'email',
  Dropdown = 'dropdown'
}

type Props = {
  label?: string
  placeholder?: string
  caption?: string
  disabled?: boolean
  modelValue: string
  type?: string
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text'
})

const emit = defineEmits(['update:modelValue'])

defineExpose({
  validate
})

const inputId = `input-${Math.random().toString(36).substring(2, 9)}`
const internalValue = ref(props.modelValue)

const isValid = ref(true)
const errorMessage = ref('')

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  if (!isValid.value) {
    validate(target.value.trim())
  }
  internalValue.value = getTransformedString(target.value.trim())
  emit('update:modelValue', internalValue.value)
}

function onChange(event: Event) {
  const target = event.target as HTMLInputElement
  internalValue.value = getTransformedString(target.value.trim())
  emit('update:modelValue', internalValue.value)
  validate()
}

function getTransformedString(value: string) {
  var newValue: string
  switch (props.type) {
    case INPUT_TYPES.Number: {
      newValue = value.replace(/\D/g, '')
      newValue = newValue !== '0' ? newValue.replace(/^0+/, '') : newValue
      if (newValue === internalValue.value) {
        internalValue.value = ''
      }
      break
    }
    case INPUT_TYPES.Dropdown: {
      newValue = internalValue.value
      internalValue.value = ''
      break
    }
    default: {
      newValue = value
      break
    }
  }
  return newValue
}

function getInputMode() {
  switch (props.type) {
    case INPUT_TYPES.Number:
      return 'numeric'
    case INPUT_TYPES.Dropdown:
      return 'none'
    default:
      return 'text'
  }
}

function validate(value?: string) {
  const testString = value || props.modelValue
  if (!testString.length && props.required) {
    errorMessage.value = ERROR_CODES.required
    isValid.value = false
    return false
  }
  switch (props.type) {
    case INPUT_TYPES.Number: {
      if (/^\d+$/.test(testString)) {
        isValid.value = true
        break
      }
      errorMessage.value = ERROR_CODES.number
      isValid.value = false
      break
    }
    case INPUT_TYPES.Email: {
      if (/^.+@.+\..+$/.test(testString)) {
        isValid.value = true
        break
      }
      errorMessage.value = ERROR_CODES.email
      isValid.value = false
      break
    }
    case INPUT_TYPES.Tel: {
      if (/^\d{8,11}$/.test(testString)) {
        isValid.value = true
        break
      }
      errorMessage.value = ERROR_CODES.tel
      isValid.value = false
      break
    }
    default:
      isValid.value = true
      break
  }
  return isValid.value
}

watch(
  () => props.modelValue,
  (newValue) => {
    internalValue.value = newValue
  }
)
</script>

<style scoped>
.input-container {
  --border-color: var(--color-accent-300);
  --label-color: var(--color-accent-500);
  --caption-color: var(--color-accent-500);
  --input-bg: var(--color-white);
  --input-color: var(--color-primary-900);

  position: relative;
  display: inline-block;
  min-width: 10rem;

  &.error {
    --caption-color: var(--color-error);
    --label-color: var(--color-error);
    --border-color: var(--color-error);
  }

  &:not(.error):has(.input:focus, .input.filled) {
    --label-color: var(--color-primary-700);
    --border-color: var(--color-primary-700);
  }

  &.disabled {
    --label-color: var(--color-accent-400);
    --input-color: var(--color-accent-400);
    --input-bg: var(--color-accent-100);
  }
}

.label {
  transition:
    transform 0.1s,
    font-size 0.1s;
  transition-timing-function: ease-out;
  position: absolute;
  color: var(--label-color);
  font-weight: var(--fw-regular);
  transform: translateX(1rem) translateY(0.75rem);
  border: 1px solid transparent;
  background-color: var(--color-white);
  line-height: var(--lh-400);
  display: block;
  top: 0;
  width: calc(100% - 2rem);
}

.input {
  width: 100%;
  padding: 8px;
  border-radius: 0.5rem;
  font-size: var(--fs-body);
  padding: 0.75rem 1rem;
  line-height: var(--lh-400);
  border: 1px solid var(--border-color);
  outline-color: var(--border-color);
  color: var(--input-color);
  background-color: var(--input-bg);

  &::placeholder {
    color: var(--color-accent-400);
    opacity: none;
  }

  &:focus,
  &.filled {
    & + .label {
      transform: translateX(0.5rem) translateY(-0.5rem);
      font-size: var(--fs-input-label);
      line-height: var(--lh-200);
      font-weight: var(--fw-semi-bold);
      width: auto;
      padding: 0 0.5rem;
      border-radius: 3rem;
    }
  }

  &:focus::placeholder {
    opacity: 100%;
  }
}

.caption {
  margin-top: 0.25rem;
  padding: 0 1rem;
  font-size: var(--fs-input-label);
  color: var(--caption-color);
  font-weight: var(--fw-semi-bold);
  line-height: var(--lh-200);
}
</style>
