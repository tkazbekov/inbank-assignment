<template>
  <svg class="svg-icon">
    <use :href="`sprite.svg#${iconName}`"></use>
  </svg>
</template>

<script setup lang="ts">
type Props = {
  iconName: string
}

defineProps<Props>()
</script>

<style scoped>
.svg-icon {
  width: 32px;
  height: 32px;
  stroke: var(--color-primary-900);
  fill: none;
}
</style>
