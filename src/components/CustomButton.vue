<template>
  <button role="button" type="button" @click="emitClick" :disabled="disabled"><slot></slot></button>
</template>

<script setup lang="ts">
type Props = {
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

const emit = defineEmits(['click'])
function emitClick() {
  emit('click')
}
</script>

<style scoped>
button {
  --color-button-focus-and-hover: var(--color-primary-400);
  --color-button-active: var(--color-primary-600);
  --color-button-default: var(--color-primary-400);
  --color-button-disabled: var(--color-accent-300);
  --color-text-disabled: var(--color-accent-400);

  &[type='accent'] {
    --color-button-focus-and-hover: var(--color-secondary-300);
    --color-button-active: var(--color-secondary-600);
    --color-button-default: var(--color-secondary-400);
  }

  padding: 0.75em 1.5em;
  background-color: var(--color-button-default);
  border-radius: 3em;
  line-height: var(--lh-400);
  width: fit-content;

  &:focus,
  &:hover {
    background-color: var(--color-button-focus-and-hover);
  }

  &:active {
    background-color: var(--color-button-active);
  }

  &:disabled {
    background-color: var(--color-button-disabled);
    color: var(--color-text-disabled);
  }
}
</style>
