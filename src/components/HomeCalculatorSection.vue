<template>
  <div class="container">
    <section class="calculator">
      <div class="calculator-text calculator-section">
        <h1>Calculate <span class="italic">your monthly payment</span></h1>
        <p>Estimate your monthly payments based on the chosen loan amount and time period.</p>
      </div>
      <div class="divider"></div>
      <div class="calculations calculator-section">
        <div class="calculations-inputs">
          <div class="calculations-inputgroup">
            <CustomSlider v-model="value1" class="calculations-slider" max="10000"></CustomSlider>
            <CustomInput
              v-model="value1"
              class="calculations-textinput"
              label="Amount"
              type="number"
            ></CustomInput>
          </div>
          <div class="calculations-inputgroup">
            <CustomSlider v-model="value2" class="calculations-slider"></CustomSlider>
            <CustomInput
              v-model="value2"
              class="calculations-textinput"
              label="Period"
              type="dropdown"
            ></CustomInput>
          </div>
        </div>
        <div class="calculations-result">
          <div class="result-text">
            <p class="result-heading">Monthly payment</p>
            <h1 class="result-value">144.84€</h1>
          </div>
          <CustomButton class="result-cta" @click="openModal">Apply now</CustomButton>
          <p class="result-footer">
            The calculation is approximate and may differ from the conditions offered to you. Please
            submit a loan application to receive a personal offer. Financial services are provided
            by AS Inbank Finance.
          </p>
          <Teleport to="body">
            <ApplicationModal :show="isModalOpen" @close="closeModal" />
          </Teleport>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import CustomButton from '@/components/CustomButton.vue'
import CustomSlider from '@/components/CustomSlider.vue'
import CustomDropdown from '@/components/CustomDropdown.vue'
import CustomInput from '@/components/CustomInput.vue'
import ApplicationModal from '@/components/ApplicationModal.vue'
import { ref } from 'vue'

const value1 = ref('20')
const value2 = ref('50')
const value3 = ref('1')
const isModalOpen = ref(false)

function openModal() {
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
}
</script>

<style scoped>
.container {
  container-type: inline-size;
  background-color: var(--color-primary-100);
}

.calculator {
  display: flex;
  gap: 2.5rem;
  padding-block: 5rem;
}

.calculator-section {
  flex: 1 1;
}

.calculator-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  text-align: center;

  & > * {
    margin: 0 2.5rem;
  }

  h1 {
    font-size: var(--fs-accent);
    line-height: var(--lh-700);
    font-family: var(--ff-accent);
  }
  p {
    line-height: var(--lh-400);
  }
}
.divider {
  width: 1px;
  background-color: var(--color-primary-900);
  opacity: 15%;
  flex-shrink: 0;
}

.calculations {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2.5rem;
}

.calculations-inputs {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  flex: 1 1 auto;
}

.calculations-inputgroup {
  display: flex;
  gap: 1.5rem;
  width: 100%;
}
.calculations-textinput {
  flex: 0 0 10rem;
}

.calculations-slider {
  flex: 1 1 auto;
}

.calculations-result {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
}

.result-text {
  flex: 1 1 100%;
}

.result-heading {
  text-align: center;
  line-height: var(--lh-400);
}

.result-value {
  margin-top: 0.5rem;
  font-size: var(--fs-accent);
  line-height: var(--lh-700);
  font-family: var(--ff-accent);
  text-align: center;
}

.result-footer {
  font-size: var(--fs-input-label);
  line-height: var(--lh-100);
  opacity: 60%;
}

@container (width < 89rem) {
  .divider {
    display: none;
  }
  .calculator {
    flex-wrap: wrap;
    padding-block: 2.5rem;
  }
  .calculator-text {
    flex: 1 1 100%;
    text-align: left;
    gap: 0.5rem;

    & > * {
      margin: 0;
    }
  }
  .calculations-inputgroup {
    flex-wrap: wrap;
  }
  .calculations-textinput {
    flex: 1 1 100%;
    order: 0;
  }

  .calculations-slider {
    flex: 1 1 100%;
    order: 1;
  }
}
</style>
