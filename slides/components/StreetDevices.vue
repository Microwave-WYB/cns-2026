<script setup lang="ts">
// BLE devices out in the world, each with a bobbing question mark.
const devices = ['🚗', '🔒', '⌚', '💡', '🎧', '🛴', '📟', '🔑', '🩺', '🚲', '🧸', '🔌']
</script>

<template>
  <div class="street">
    <div v-for="(d, i) in devices" :key="i" class="dev" :style="{ animationDelay: `${(i % 4) * 0.35}s` }">
      <span class="q">?</span><span>{{ d }}</span>
    </div>
  </div>
</template>

<style scoped>
.street { display: grid; grid-template-columns: repeat(6, 1fr); gap: 1.6rem 2rem; font-size: 3rem; justify-items: center; }
.dev { display: flex; flex-direction: column; align-items: center; animation: bob 2.4s ease-in-out infinite; }
.q { font-size: 1.6rem; color: #fbbf24; font-weight: 800; }
@keyframes bob { 0%, 100% { translate: 0 0; } 50% { translate: 0 -10px; } }
</style>
