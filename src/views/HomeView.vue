<template>
  <main>
    <HomeHeroSection @scroll-to-calculator="scrollToCalculator"></HomeHeroSection>
    <HomeCalculatorSection ref="calculator"></HomeCalculatorSection>
  </main>
</template>

<script setup>
import { ref } from 'vue'

import HomeCalculatorSection from '@/components/HomeCalculatorSection.vue'
import HomeHeroSection from '@/components/HomeHeroSection.vue'

const calculator = ref(null)

function scrollToCalculator() {
  calculator.value.$el.scrollIntoView({ behavior: 'smooth' })
}
</script>
