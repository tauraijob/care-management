<template>
  <div :class="wrapperClasses">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-sm font-medium" :class="labelClasses">{{ label }}</p>
        <p class="mt-2 text-2xl font-bold" :class="valueClasses">{{ formattedValue }}</p>
      </div>
      <div v-if="icon" class="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" :class="iconBgClasses">
        <Icon :name="icon" class="text-xl" :class="iconColorClasses" />
      </div>
    </div>

    <div v-if="delta !== undefined && delta !== null" class="mt-3 flex items-center text-sm">
      <span :class="deltaClasses">{{ delta >= 0 ? '+' : ''}}{{ delta }}%</span>
      <span class="ml-2 text-gray-500">vs last period</span>
    </div>
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], required: true },
  delta: { type: Number, default: null },
  icon: { type: String, default: '' },
  variant: { type: String, default: 'neutral' }, // 'primary' | 'success' | 'warning' | 'danger' | 'neutral'
})

const formattedValue = computed(() => props.value)

const wrapperClasses = computed(() => [
  'rounded-xl p-5 border shadow-sm transition-colors',
  props.variant === 'primary' ? 'bg-lucerna-primary text-white border-transparent' :
  props.variant === 'success' ? 'bg-green-50 border-green-200' :
  props.variant === 'warning' ? 'bg-yellow-50 border-yellow-200' :
  props.variant === 'danger' ? 'bg-red-50 border-red-200' :
  'bg-white border-gray-100'
])

const labelClasses = computed(() => props.variant === 'primary' ? 'text-white/90' : 'text-gray-600')
const valueClasses = computed(() => props.variant === 'primary' ? 'text-white' : 'text-gray-900')

const iconBgClasses = computed(() => [
  props.variant === 'primary' ? 'bg-white/20' :
  props.variant === 'success' ? 'bg-green-100' :
  props.variant === 'warning' ? 'bg-yellow-100' :
  props.variant === 'danger' ? 'bg-red-100' :
  'bg-lucerna-primary'
])

const iconColorClasses = computed(() => [
  props.variant === 'primary' ? 'text-white' :
  props.variant === 'success' ? 'text-green-600' :
  props.variant === 'warning' ? 'text-yellow-600' :
  props.variant === 'danger' ? 'text-red-600' :
  'text-white'
])

const deltaClasses = computed(() => [
  props.variant === 'primary' ? 'text-white' :
  (props.delta ?? 0) >= 0 ? 'text-green-600' : 'text-red-600'
])
</script>


