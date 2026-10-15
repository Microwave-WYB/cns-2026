<script setup lang="ts">
// Undergrads walk in from the right and out on the left, forever.
const people = ['🧑‍💻', '👩‍💻', '👨‍💻', '🧑‍🎓', '👩‍🎓', '👨‍🎓', '🧑‍🔬', '👩‍🔬']
const lines = ['hi!', '', 'bye!', '', 'graduated', '', 'internship!', '']
</script>

<template>
  <div class="door">
    <div class="track">
      <div v-for="(p, i) in [...people, ...people]" :key="i" class="person">
        <span class="say">{{ lines[i % lines.length] }}</span>
        <span>{{ p }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.door { overflow: hidden; width: 100%; mask-image: linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent); }
.track { display: flex; gap: 3.5rem; width: max-content; animation: walk 14s linear infinite; font-size: 3.4rem; }
.person { display: flex; flex-direction: column; align-items: center; }
.say { font-size: 1rem; opacity: 0.6; height: 1.4rem; }
@keyframes walk { from { transform: translateX(0); } to { transform: translateX(-50%); } }
</style>
