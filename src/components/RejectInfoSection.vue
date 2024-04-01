<template>
  <div class="container">
    <section class="rejection">
      <div class="rejection-body" v-if="store.loanData">
        <div class="body-main">
          <div class="main-text">
            <h1 class="text-heading">
              <span class="italic">Dear</span> {{ store.loanData.firstName }}
            </h1>
            <p class="text-caption">Unfortunately, your loan was denied</p>
          </div>
          <div class="text-explanation">
            <div class="divider"></div>
            <p class="explanation-caption">
              In addition to your income and expenses, a number of other factors play a role in loan
              decisions
            </p>
            <div class="divider"></div>
          </div>
          <RouterLink class="text-button" to="/">
            <CustomButton class="text-button">Exit</CustomButton>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useLoanStore } from '@/stores/loan'
import CustomButton from '@/components/CustomButton.vue'

const store = useLoanStore()
</script>

<style scoped>
.container {
  container-type: inline-size;
  padding: 0;
}
.rejection {
  padding: 2.5rem;
  display: flex;
  justify-content: center;
}

.rejection-body {
  background-color: var(--color-white);
  box-shadow: 0px 0px 40px 0px #0000000a;
  border-radius: 1.25rem;
  display: flex;
  padding: 5rem 2.5rem;
  width: 49.5rem;
  justify-content: center;
}

.body-main {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 2.5rem;
  flex: 0 1 24rem;
  text-align: center;
}

.text-heading {
  font-family: var(--ff-accent);
  font-size: var(--fs-decision-heading);
  line-height: var(--lh-decision-heading);
  margin-bottom: 0.5rem;
}

.text-explanation {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.explanation-caption {
  font-size: var(--fs-300);
  line-height: var(--lh-300);
  opacity: 85%;
  padding-inline: 1.25rem;
}
.divider {
  height: 1px;
  opacity: 15%;
  background-color: var(--color-primary-900);
}

.text-button {
  width: 100%;
}

@container (width < 89rem) {
  .rejection {
    height: calc(100vh - var(--header-height));
    padding: 2.5rem 1rem 5rem;
    background-color: var(--color-white);
  }
  .rejection-body {
    box-shadow: none;
    width: fit-content;
    height: fit-content;
    padding: 0;
  }
  .text-button {
    width: auto;
  }
}
</style>
