<template>
  <div class="container">
    <section class="hero">
      <div class="hero-content">
        <h2>Mini loan</h2>
        <h1><span class="italic">Take charge</span> of unexpected costs</h1>
        <p>
          Finance unforeseen expenses with Inbank. A quick and easy application process with an
          instant credit decision.
        </p>
        <CustomButton class="hero-cta" type="accent" @click="scrollToCalculator"
          >Apply now</CustomButton
        >
      </div>
      <img class="hero-image" src="@/assets/images/image-1.png" alt="mini loan hero" />
    </section>
  </div>
</template>

<script setup>
import CustomButton from '@/components/CustomButton.vue'

const emit = defineEmits(['scroll-to-calculator'])

function scrollToCalculator() {
  emit('scroll-to-calculator')
}
</script>

<style scoped>
.container {
  container-type: inline-size;
}

.hero {
  --hero-border-radius: 12.5rem;
  display: flex;
  gap: 1.5rem;
  padding: 1rem 0 5rem;
}
.hero-content {
  flex: 1 1 auto;
  background-color: var(--color-secondary-700);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 5rem 2.5rem;
  border-radius: var(--hero-border-radius);

  h2 {
    text-align: center;
    line-height: var(--lh-400);
    font-weight: var(--fw-semi-bold);
  }

  h1 {
    font-size: var(--fs-accent);
    line-height: var(--lh-700);
    font-family: var(--ff-accent);
    text-align: center;
  }

  p {
    text-align: center;
    line-height: var(--lh-400);
  }
}

.hero-cta {
  flex: 0 0 auto;
}

.hero-image {
  max-height: 100%;
  flex: 0 1 52.5rem;
  border-radius: var(--hero-border-radius);
}

/* Mobile styles start here */

@container (width < 89rem) {
  .hero {
    --hero-border-radius: 6.25rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  .hero-content {
    flex: 1 0 100%;
    order: 1;
    padding: 4rem 1.5rem;
  }
  .hero-image {
    order: 0;
  }
}
</style>
