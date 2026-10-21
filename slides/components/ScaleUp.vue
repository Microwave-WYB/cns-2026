<script setup lang="ts">
// One PhD student working slowly through 60,000 apps, then a crowd of AI agents that finish fast.
// step 0: Yibo thinking (slow spinner), step 1: AI agents spin fast and all finish.
import { onUnmounted, ref, watch } from 'vue'
const props = defineProps<{ step: number }>()
const BASE = import.meta.env.BASE_URL
const N = 48
// each agent finishes at its own moment within a few seconds of appearing
const delays = Array.from({ length: N }, (_, i) => 700 + ((i * 7919) % 97) / 97 * 2300)
const done = ref<boolean[]>(Array(N).fill(false))
let timers: ReturnType<typeof setTimeout>[] = []
watch(() => props.step >= 1, (on) => {
  timers.forEach(clearTimeout); timers = []
  done.value = Array(N).fill(false)
  if (on) delays.forEach((d, i) => timers.push(setTimeout(() => { done.value[i] = true }, d)))
}, { immediate: true })
onUnmounted(() => timers.forEach(clearTimeout))
</script>

<template>
  <div class="stage">
    <div class="me" :class="{ aside: step >= 1 }">
      <div class="ring slow" />
      <img :src="`${BASE}people/yibo.jpg`" class="face" />
      <div class="status"><span class="shimmer">Reading app 1 / 60,000…</span></div>
    </div>
    <div class="agents" :class="{ on: step >= 1 }">
      <div v-for="(d, i) in done" :key="i" class="agent" :class="{ done: d }">
        <div class="ring fast" />
        <span class="label">{{ d ? '✓' : 'AI' }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stage { position: relative; width: 900px; height: 420px; margin: 0 auto; }
.me { position: absolute; left: 50%; top: 100px; width: 150px; height: 150px; transform: translateX(-50%); transition: all 1s cubic-bezier(.65,0,.35,1); }
.me.aside { left: 15%; top: 100px; }
.face { position: absolute; inset: 11px; width: 128px; height: 128px; border-radius: 50%; object-fit: cover; max-width: none; }
.ring { position: absolute; inset: 0; border-radius: 50%; border: 5px solid #2a2a2a; border-top-color: #4ea8ff; border-right-color: #4ea8ff; }
.ring.slow { animation: spin 6s linear infinite; }
.status { position: absolute; left: 50%; top: 166px; transform: translateX(-50%); white-space: nowrap; font: 500 22px Inter, system-ui, sans-serif; }
.shimmer { background: linear-gradient(90deg, #6b6b6b 0%, #ededed 50%, #6b6b6b 100%); background-size: 200% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: shimmer 3s linear infinite; }
.agents { position: absolute; right: 30px; top: 10px; width: 540px; display: grid; grid-template-columns: repeat(8, 1fr); gap: 12px; opacity: 0; transform: scale(.9); transition: all .5s; }
.agents.on { opacity: 1; transform: none; }
.agent { position: relative; width: 50px; height: 50px; margin: 0 auto; display: flex; align-items: center; justify-content: center; }
.agent .ring { border-width: 4px; }
.ring.fast { animation: spin .35s linear infinite; }
.agent.done .ring { animation: none; border-color: #22c55e; box-shadow: 0 0 14px rgba(34, 197, 94, .45); }
.label { font: 600 18px Inter, system-ui, sans-serif; color: #bbb; }
.agent.done .label { color: #22c55e; font-size: 24px; }
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }
</style>
