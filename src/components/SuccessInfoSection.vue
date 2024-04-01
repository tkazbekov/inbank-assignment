import CustomButton from './CustomButton.vue';
<template>
  <div class="container">
    <section class="success">
      <div class="success-body">
        <div class="body-section section-image">
          <img src="@/assets/images/small-loan.png" alt="success" />
        </div>
        <div class="body-section section-right">
          <div class="body-content">
            <div class="content-text">
              <h1 class="text-heading"><span class="italic">Good</span> news!</h1>
              <p class="text-caption">Your loan has been approved.</p>
            </div>
            <div class="content-data">
              <ul role="list" class="data-list">
                <div class="divider" />
                <li class="list-item">
                  <span class="item-label">Loan amount</span>
                  <span class="item-value">{{ store.loanData.amount }} €</span>
                </li>
                <div class="divider" />
                <li class="list-item">
                  <span class="item-label">Loan period</span>
                  <span class="item-value">{{ store.loanData.period }} months</span>
                </li>
                <div class="divider" />
                <li class="list-item">
                  <span class="item-label">Monthly payment</span>
                  <span class="item-value">{{ store.loanData.monthly }} €</span>
                </li>
                <div class="divider" />
              </ul>
            </div>
            <RouterLink class="content-action" to="/">
              <CustomButton class="content-action">Back to home page</CustomButton>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useLoanStore } from '@/stores/loan'
import CustomButton from '@/components/CustomButton.vue'

const store = useLoanStore()
</script>

<style scoped>
.container {
  container-type: inline-size;
  padding: 0;
}
.success {
  padding: 2.5rem;
  padding-bottom: 0;
  display: flex;
  justify-content: center;
}
.success-body {
  box-shadow: 0px 0px 40px 0px #0000000a;
  border-radius: 1.25rem;
  display: flex;
  width: 75rem;
  height: 42.5rem;
}
.body-section {
  flex: 0 1 37.5rem;
}

.section-image {
  padding-block: 5rem;
  background-color: var(--color-secondary-400);
  border-radius: 1.25rem 0 0 1.25rem;
  clip-path: url('@/assets/svg/result-clip.svg');
  border: 4px var(--color-white) solid;

  & > img {
    margin-left: 3rem;
    transform: translateX(3.75rem);
  }
}

.section-right {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 32px 40px 44px;
}

.body-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  flex: 0 1 24rem;
}

.content-text {
  text-align: center;
}

.text-heading {
  font-family: var(--ff-accent);
  font-size: var(--fs-decision-heading);
  line-height: var(--lh-decision-heading);
  margin-bottom: 0.5rem;
}

.content-data {
  width: 100%;
}

.divider {
  height: 1px;
  opacity: 15%;
  background-color: var(--color-primary-900);
}

.data-list {
  display: flex;
  flex-direction: column;
  padding: 0;
}
.list-item {
  flex: 0 0 3rem;
  padding-block: 0.75rem;
  gap: 1rem;
  display: flex;
}

.item-label {
  flex: 1 1 11.25rem;
  font-weight: var(--fw-semi-bold);
}

.item-value {
  flex: 1 1 11.75rem;
}

.content-action {
  width: 100%;
}

@container (width < 89rem) {
  .success {
    background-color: var(--color-white);
    height: calc(100vh - var(--header-height));
    padding: 2.5rem 1rem 5rem;
  }
  .success-body {
    box-shadow: none;
    flex-wrap: wrap;
    width: fit-content;
    height: fit-content;
    justify-content: center;
    gap: 1.5rem;
  }

  .body-section {
    flex: 1 1 100%;
  }

  .section-image {
    flex: 0 0 15rem;
    padding: 45px 40px;
    border: none;
    -webkit-mask-image: url('@/assets/svg/result-clip.svg');
    mask-image: url('@/assets/svg/result-clip.svg');
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    & > img {
      transform: none;
      margin: 0;
      width: 10rem;
    }
  }

  .section-right {
    padding: 0;
  }

  .text-caption {
    margin-top: 0.5rem;
  }

  .item-value {
    flex-basis: 8.25rem;
  }
}
</style>
