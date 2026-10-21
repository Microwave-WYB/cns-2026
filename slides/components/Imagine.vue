<script setup lang="ts">
// "imagine 60" that keeps growing a zero at a time until 60,000.
import { computed, onUnmounted, ref, watch } from 'vue'
const props = defineProps<{ step: number }>()
const VALUES = ['60', '600', '6,000', '60,000']
const i = ref(0)
let t: ReturnType<typeof setInterval> | undefined
watch(() => props.step >= 1, (on) => {
  clearInterval(t); i.value = 0
  if (on) t = setInterval(() => { if (i.value < VALUES.length - 1) i.value++; else clearInterval(t) }, 700)
}, { immediate: true })
onUnmounted(() => clearInterval(t))
const n = computed(() => VALUES[i.value])
</script>

<template>
  <div class="big" :class="{ on: step >= 1 }">imagine <span :key="n" class="n">{{ n }}</span></div>
</template>

<style scoped>
.big { font-size: 6rem; font-weight: 700; line-height: 1; opacity: 0; transition: opacity .4s; }
.big.on { opacity: 1; }
.n { display: inline-block; animation: pop .25s cubic-bezier(.3,1.6,.5,1); }
@keyframes pop { from { transform: scale(1.15); } to { transform: none; } }
</style>
