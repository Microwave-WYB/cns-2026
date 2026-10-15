<script setup lang="ts">
// A growing heap of "interesting devices": boxes pop in one after another.
const props = withDefaults(defineProps<{ n?: number; cols?: number }>(), { n: 48, cols: 12 })
const items = Array.from({ length: props.n }, (_, i) => ({
  i,
  icon: ['📦', '📟', '🔑', '⌚', '🎧', '🚗', '💡', '🔒'][(i * 7) % 8],
  rot: ((i * 37) % 21) - 10,
}))
</script>

<template>
  <div class="pile" :style="{ gridTemplateColumns: `repeat(${cols}, 1fr)` }">
    <span v-for="it in items" :key="it.i" class="box"
      :style="{ animationDelay: `${it.i * 45}ms`, transform: `rotate(${it.rot}deg)` }">{{ it.icon }}</span>
  </div>
</template>

<style scoped>
.pile { display: grid; gap: 0.4rem; justify-items: center; font-size: 2.6rem; }
.box { opacity: 0; animation: pop 0.35s ease-out forwards; }
@keyframes pop {
  0% { opacity: 0; translate: 0 -40px; scale: 0.6; }
  70% { opacity: 1; translate: 0 6px; scale: 1.08; }
  100% { opacity: 1; translate: 0 0; scale: 1; }
}
</style>
