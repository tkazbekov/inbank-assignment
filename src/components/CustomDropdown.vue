<template>
  <div class="select" :class="{ error: !isValid, expanded: isDropdownOpen }">
    <CustomInput
      class="select-input"
      v-model="selectedOption.label"
      :label="label"
      :placeholder="placeholder"
      type="dropdown"
      :isValid="isValid"
      @click="isDropdownOpen = !isDropdownOpen"
    ></CustomInput>

    <div class="dropdown" v-if="isDropdownOpen">
      <ul role="list" class="dropdown-list">
        <li
          v-for="option in options"
          :key="option.value"
          class="dropdown-item"
          @click="selectedOption = option"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import CustomInput from './CustomInput.vue'

type Option = {
  label: string
  value: string
}

interface Props {
  modelValue: string
  label?: string
  placeholder?: string
  disabled?: boolean
  options: Option[]
  isValid?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  isValid: true
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isDropdownOpen = ref(false)

const selectedOption = computed({
  get() {
    return findOptionByValue(props.modelValue)
  },
  set(option) {
    if (isDropdownOpen.value) {
      isDropdownOpen.value = false
    }
    emit('update:modelValue', option?.value || '')
  }
})

function findOptionByValue(value: string) {
  return props.options.find((option) => option.value === value) || props.options[0]
}
</script>

<style scoped>
.select {
  --dropdown-caret-color: var(--color-accent-500);

  position: relative;

  &.error {
    --dropdown-caret-color: var(--color-error);
  }

  &.expanded {
    .select-input {
      &::after {
        transform: translateY(-50%) rotate(180deg);
      }
    }
  }
}
.dropdown {
  --dropdown-caret-color: var(--color-primary-900);

  width: 100%;
  background-color: var(--color-white);
  position: absolute;
  max-height: 12.5rem;
  overflow-y: scroll;
  border-radius: 0.5rem;
  transform: translateY(0.25rem);

  &.error {
    --dropdown-caret-color: var(--color-error);
  }

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    background-color: var(--color-white);
    border-radius: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    border: 0.125rem solid var(--color-white);
    border-radius: 1rem;
    background-color: var(--color-primary-300);
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: var(--color-primary-400);
  }
}

.dropdown-list {
  padding: 0;
}

.dropdown-item {
  padding: 0.75rem 1rem;

  &:hover {
    background-color: var(--color-primary-300);
  }
}

.select-input {
  width: 100%;
  &::after {
    content: '';
    position: absolute;
    right: 1.25rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1rem;
    height: 1rem;
    background-color: var(--dropdown-caret-color);
    -webkit-mask-image: url('@/assets/svg/caret.svg');
    mask-image: url('@/assets/svg/caret.svg');
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-position: center;
    mask-position: center;
    -webkit-mask-size: contain;
    mask-size: contain;
  }
}

@media screen and (width < 91rem) {
  .dropdown {
    &::-webkit-scrollbar {
      width: 1rem;
    }

    &::-webkit-scrollbar-track {
      background-color: var(--color-white);
      border-radius: 0.5rem;
    }

    &::-webkit-scrollbar-thumb {
      border: 0.25rem solid var(--color-white);
      border-radius: 1rem;
      background-color: var(--color-primary-300);
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: var(--color-primary-400);
    }
  }
}
</style>
