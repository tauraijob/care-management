<template>
  <ClientOnly>
    <div class="w-full h-56">
      <canvas ref="canvasEl"></canvas>
    </div>
  </ClientOnly>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  labels: { type: Array, default: () => [] },
  data: { type: Array, default: () => [] }
})

const canvasEl = ref(null)

onMounted(async () => {
  let Chart
  try {
    Chart = (await import('chart.js/auto')).default
  } catch (e) {
    return
  }
  if (!canvasEl.value) return
  const ctx = canvasEl.value.getContext('2d')
  if (!ctx) return
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: props.labels,
      datasets: [{
        data: props.data,
        backgroundColor: ['#0A2342','#4A6470','#FF6600','#93C5FD','#F59E0B'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom' } }
    }
  })
})
</script>


