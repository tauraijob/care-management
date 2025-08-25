<template>
  <ClientOnly>
    <div class="w-full h-28">
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
    type: 'line',
    data: {
      labels: props.labels,
      datasets: [{
        data: props.data,
        borderColor: '#0A2342',
        backgroundColor: 'rgba(10,35,66,0.08)',
        fill: true,
        tension: 0.35,
        pointRadius: 2,
        pointBackgroundColor: '#0A2342',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { 
        legend: { display: false }, 
        tooltip: { enabled: true, intersect: false, mode: 'index' } 
      },
      scales: { 
        x: { 
          display: true,
          grid: { display: false },
          ticks: { color: '#6B7280', maxRotation: 0, autoSkip: true }
        }, 
        y: { 
          display: true,
          grid: { color: 'rgba(0,0,0,0.05)' },
          ticks: { 
            color: '#6B7280',
            callback: (v) => {
              try { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v) } catch { return v }
            }
          }
        }
      }
    }
  })
})
</script>


