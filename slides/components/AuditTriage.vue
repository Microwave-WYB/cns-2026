<script setup lang="ts">
// Audit triage over knowledge-base entries (illustrative; only KARR's finding is real).
// step 0: entries not audited yet, step 1: AI agents check each one (known CVEs, how the app authenticates) and each resolves,
// step 2: flagged entries go to a researcher, who confirms on a real device before disclosure.
import { onUnmounted, ref, watch } from 'vue'
const props = defineProps<{ step: number }>()
const BASE = import.meta.env.BASE_URL
type Verdict = { tag: string; tone: 'bad' | 'warn' | 'ok' }
const ROWS: { name: string; v: Verdict }[] = [
  { name: 'KARR car alarm module', v: { tag: 'CVE-2026-18411', tone: 'bad' } },
  { name: 'Throttle controller', v: { tag: 'possible weak auth', tone: 'warn' } },
  { name: 'Clinical asset tag', v: { tag: 'nothing found', tone: 'ok' } },
  { name: 'Smart lock', v: { tag: 'possible weak auth', tone: 'warn' } },
  { name: 'Smart mug', v: { tag: 'nothing found', tone: 'ok' } },
  { name: 'Garage opener', v: { tag: 'nothing found', tone: 'ok' } },
]
// each row resolves at its own moment, a second or two after the agents start
const DELAYS = [900, 1700, 1200, 2300, 1500, 2000]
const done = ref<boolean[]>(ROWS.map(() => false))
let timers: ReturnType<typeof setTimeout>[] = []
watch(() => props.step >= 1, (on) => {
  timers.forEach(clearTimeout); timers = []
  done.value = ROWS.map(() => false)
  if (on) DELAYS.forEach((d, i) => timers.push(setTimeout(() => { done.value[i] = true }, d)))
}, { immediate: true })
onUnmounted(() => timers.forEach(clearTimeout))
</script>

<template>
  <div class="stage">
    <div class="list">
      <div class="head">
        <span>knowledge base</span>
        <span class="checks" :class="{ on: step >= 1 }">known CVEs · how the app authenticates</span>
      </div>
      <div v-for="(r, i) in ROWS" :key="r.name" class="row"
        :class="{ flagged: step >= 2 && r.v.tone !== 'ok', dim: step >= 2 && r.v.tone === 'ok' }">
        <span class="name">{{ r.name }}</span>
        <span v-if="step < 1" class="tag idle">not audited</span>
        <span v-else-if="!done[i]" class="agent"><span class="ring" />AI</span>
        <span v-else class="tag" :class="r.v.tone">{{ r.v.tag }}</span>
      </div>
    </div>

    <svg class="link" :class="{ on: step >= 2 }" viewBox="0 0 80 40"><path d="M2 20 H70" /><path d="M62 12 L72 20 L62 28" /></svg>
    <div class="card" :class="{ on: step >= 2 }">
      <img :src="`${BASE}people/yibo.jpg`" class="face" />
      <div class="stepline">reviews what was flagged</div>
      <div class="stepline">confirms on a real device</div>
      <div class="stepline">discloses to the vendor</div>
    </div>
  </div>
</template>

<style scoped>
.stage { position: relative; width: 900px; height: 420px; margin: 0 auto; display: flex; align-items: center; gap: 18px; }
.list { width: 490px; flex: none; text-align: left; }
.head { display: flex; justify-content: space-between; align-items: baseline; padding: 0 14px 10px; border-bottom: 1px solid #333; font: 600 16px Inter, system-ui, sans-serif; color: #999; }
.checks { font-weight: 500; font-size: 14px; color: #a78bfa; opacity: 0; transition: opacity .4s; }
.checks.on { opacity: 1; }
.row { display: flex; justify-content: space-between; align-items: center; height: 54px; padding: 0 14px; border-bottom: 1px solid #222; transition: all .5s; }
.row.flagged { background: #241818; }
.row.dim { opacity: .35; }
.name { font: 500 20px Inter, system-ui, sans-serif; color: #eee; }
.tag { padding: 3px 10px; border-radius: 8px; font: 600 14px Inter, system-ui, sans-serif; animation: pop .3s cubic-bezier(.3,1.6,.5,1); }
.tag.idle { background: #222; color: #777; animation: none; }
.tag.bad { background: #4a1d1d; color: #fca5a5; font-family: ui-monospace, monospace; }
.tag.warn { background: #463616; color: #fcd34d; }
.tag.ok { background: #1c2a1f; color: #86efac; }
.agent { position: relative; width: 30px; height: 30px; display: grid; place-items: center; font: 600 10px Inter, system-ui, sans-serif; color: #ccc; }
.agent .ring { position: absolute; inset: 0; border-radius: 50%; border: 3px solid #2a2a2a; border-top-color: #a78bfa; border-right-color: #a78bfa; animation: spin .4s linear infinite; }
.link { width: 60px; height: 40px; flex: none; opacity: 0; transition: opacity .5s .3s; }
.link.on { opacity: 1; }
.link path { fill: none; stroke: #888; stroke-width: 2.5; }
.card { width: 270px; flex: none; text-align: left; opacity: 0; transform: translateX(16px); transition: all .6s .5s; }
.card.on { opacity: 1; transform: none; }
.face { width: 96px; height: 96px; border-radius: 50%; object-fit: cover; display: block; margin: 0 auto 14px; border: 3px solid #4ea8ff; max-width: none; }
.card .title { font: 600 22px Inter, system-ui, sans-serif; color: #fff; margin-bottom: 10px; }
.stepline { font: 400 18px/1.4 Inter, system-ui, sans-serif; color: #ccc; padding: 7px 0; border-top: 1px solid #262626; }
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes pop { from { transform: scale(.6); opacity: 0; } to { transform: none; opacity: 1; } }
</style>
