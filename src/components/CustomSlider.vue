<template>
  <div class="slider-container">
    <input
      class="slider-input"
      type="range"
      name="range"
      id="range"
      :min="min"
      :max="max"
      :step="step"
      :value="internalValue"
      @input="onInput"
    />
    <div class="slider-labels" v-if="max && !hideMinMax">
      <span class="value"
        >{{ min }} <span v-if="currency" class="currency">{{ currency }}</span></span
      >
      <span class="value"
        >{{ max }} <span v-if="currency" class="currency">{{ currency }}</span></span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { isString } from '@/utils'

type PropsType = {
  min?: number | string
  max?: number | string
  step?: number | string
  currency?: string
  hideMinMax?: boolean
  modelValue: string | number
}

const props = withDefaults(defineProps<PropsType>(), {
  min: 0,
  max: 100,
  step: 1
})

const emit = defineEmits(['update:modelValue'])

const internalValue = ref(props.modelValue || getDefaultValue())

const sliderProgress = ref(computeProgress(internalValue.value))

/**
 * Adjusting the default value to be somewhere in the middle, but in accordance with the step prop
 * @Example if the max is 1050 and the step is 100, we just can't have our value be 525, so it will be tuncated to 500
 */
function getDefaultValue(): number {
  const value = +props.modelValue
  return isNaN(value) ? Math.floor(+props.max / 2 / +props.step) * +props.step : value
}

function computeProgress(value: string | number): string {
  return `${(+value / +props.max!) * 100}`
}

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', isString(props.modelValue) ? target.value : +target.value)
}

watch(
  () => props.modelValue,
  (newValue) => {
    const value = +newValue
    if (!isNaN(value)) {
      if (value > +props.max) {
        emit('update:modelValue', isString(props.modelValue) ? `${props.max}` : +props.max)
      }
      if (value <= +props.min) {
        emit('update:modelValue', isString(props.modelValue) ? `${props.min}` : +props.min)
      }
    }
    internalValue.value = value
  }
)

watch(
  () => internalValue.value,
  (newValue) => {
    sliderProgress.value = computeProgress(newValue)
  }
)
</script>

<style scoped>
input[type='range'] {
  --slider-thumb-width: 3.25rem;
  --slider-thumb-height: 2.25rem;
  --slider-thumb-border-radius: 3rem;
  --slider-track-height: 0.25rem;
  --slider-track-border-radius: 0.25rem;

  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: var(--slider-thumb-height);
  margin: 0;
  display: block;
  cursor: pointer;
  outline: none;
  background-color: transparent;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: var(--slider-thumb-height);
    width: var(--slider-thumb-width);
    border-radius: var(--slider-thumb-border-radius);
    background-color: var(--color-primary-400);
    cursor: pointer;
    /* Calculations will put the thumb in the middle of the track, presumably */
    margin-top: calc(0px - ((var(--slider-thumb-height) - var(--slider-track-height)) / 2));

    background-image: url('@/assets/svg/arrows-slider.svg');
    background-repeat: no-repeat;
    background-position: center center;
    transition: background-color 0.2s ease-in-out;
  }

  &::-webkit-slider-thumb:hover {
    background-color: var(--color-primary-300);
  }

  &::-webkit-slider-runnable-track {
    --progress: v-bind(sliderProgress + '%');
    height: var(--slider-track-height);
    background: linear-gradient(
      to right,
      var(--color-primary-900) var(--progress),
      var(--color-accent-200) var(--progress)
    );
    border-radius: var(--slider-track-border-radius);
  }
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  color: var(--color-accent-500);
  line-height: var(--lh-300);
}
</style>
