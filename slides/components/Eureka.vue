<script setup lang="ts">
// Step 3 story: Nishant thinking (spinning loader) → a light bulb pops → the paper's first page appears.
// step 0: thinking, step 1: light bulb, step 2: the paper.
import { onMounted, onUnmounted, ref } from 'vue'
defineProps<{ step: number }>()
// AI-app style status line while thinking
const WORDS = ['Thinking…', 'Scanning…', 'Reading the app…', 'Working…', 'Taking it apart…', 'Thinking…']
const i = ref(0)
let t: ReturnType<typeof setInterval> | undefined
onMounted(() => { t = setInterval(() => { i.value = (i.value + 1) % WORDS.length }, 1100) })
onUnmounted(() => clearInterval(t))
</script>

<template>
  <div class="stage">
    <div class="who" :class="{ aside: step >= 2 }">
      <div class="ring" :class="{ done: step >= 1 }" />
      <img src="/people/nishant.jpg" class="face" />
      <div class="bulb" :class="{ on: step >= 1 }">💡</div>
      <div class="status" :class="{ done: step >= 1 }">
        <span v-if="step < 1" :key="i" class="shimmer">{{ WORDS[i] }}</span>
        <span v-else class="got">Got it!</span>
      </div>
    </div>
    <img src="/shots/please-pay-inside-p1.jpg" class="paper" :class="{ on: step >= 2 }" />
  </div>
</template>

<style scoped>
.stage { position: relative; width: 900px; height: 440px; margin: 0 auto; }
.who { position: absolute; left: 50%; top: 50%; width: 200px; height: 200px; transform: translate(-50%, -45%); transition: all 1s cubic-bezier(.65,0,.35,1); }
.who.aside { left: 22%; }
.face { position: absolute; inset: 14px; width: 172px; height: 172px; border-radius: 50%; object-fit: cover; object-position: 50% 18%; max-width: none; }
.ring { position: absolute; inset: 0; border-radius: 50%; border: 6px solid #2a2a2a; border-top-color: #4ea8ff; border-right-color: #4ea8ff; animation: spin 1s linear infinite; transition: border-color .4s; }
.ring.done { animation: none; border-color: #fbbf24; box-shadow: 0 0 40px rgba(251, 191, 36, .45); }
.bulb { position: absolute; left: 50%; top: -96px; font-size: 76px; line-height: 1; transform: translateX(-50%) scale(0); opacity: 0; transition: all .45s cubic-bezier(.3,1.8,.5,1); filter: drop-shadow(0 0 22px rgba(251, 191, 36, .9)); }
.bulb.on { transform: translateX(-50%) scale(1); opacity: 1; }
.paper { position: absolute; right: 80px; top: 10px; height: 420px; border-radius: 6px; box-shadow: 0 10px 40px rgba(0,0,0,.7); opacity: 0; transform: scale(.3) rotate(-8deg); transform-origin: left center; transition: all .9s cubic-bezier(.3,1.3,.5,1) .25s; max-width: none; }
.paper.on { opacity: 1; transform: none; }
.status { position: absolute; left: 50%; top: 222px; transform: translateX(-50%); white-space: nowrap; font: 500 26px Inter, system-ui, sans-serif; }
.shimmer { background: linear-gradient(90deg, #6b6b6b 0%, #ededed 50%, #6b6b6b 100%); background-size: 200% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: shimmer 1.4s linear infinite; }
.got { color: #fbbf24; font-weight: 650; }
@keyframes shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
