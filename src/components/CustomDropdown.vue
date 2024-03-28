<template>
  <div class="dropdown">
    <div class="dropdown-input" @click="toggleDropdown" :class="{ disabled: disabled }">
      <input
        class="input"
        :class="{ filled: selectedOption }"
        :id="inputId"
        :value="selectedOption"
        :placeholder="placeholder"
        :disabled="disabled"
      />
      <label v-if="label" class="label" :for="inputId">{{ label }}</label>
    </div>
    <ul v-if="isOpen" class="dropdown-menu">
      <li v-for="option in options" :key="option" @click="selectOption(option)">{{ option }}</li>
    </ul>
    <div v-if="caption" class="caption">{{ caption }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'

type Props = {
  label?: string
  placeholder?: string
  caption?: string
  disabled?: boolean
  modelValue: string
}

const props = defineProps<Props>()

const inputId = `dropdown-input-${Math.random().toString(36).substring(2, 9)}`
const selectedOption = ref(props.modelValue)
const options = ['Option 1', 'Option 2', 'Option 3']
const isOpen = ref(false)

const toggleDropdown = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value
  }
}

const selectOption = (option: string) => {
  selectedOption.value = option
  isOpen.value = false
}
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
  min-width: 10rem;
}

.dropdown-input {
  position: relative;
  cursor: pointer;
}

.label {
  position: absolute;
  color: var(--label-color);
  font-weight: var(--fw-regular);
  transform: translateX(1rem) translateY(0.75rem);
  line-height: var(--lh-400);
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
  background-color: var(--input-bg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: var(--input-bg);
  border: 1px solid var(--border-color);
}

.caption {
  margin-top: 0.25rem;
  padding: 0 1rem;
  font-size: var(--fs-input-label);
  color: var(--caption-color);
  font-weight: var(--fw-semi-bold);
  line-height: var(--lh-200);
}

.disabled {
  cursor: not-allowed;
}
</style>
