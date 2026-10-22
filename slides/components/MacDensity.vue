<script setup lang="ts">
// Intuition for the scale estimate: a run of sequential MAC addresses, green where WiGLE saw one.
// Dense sampling leaves many seen addresses right next to each other; sparse sampling leaves few.
// step 1: mark the adjacent pairs and count them, step 2: total ≈ seen ÷ density for each row.
import { computed } from 'vue'
defineProps<{ step: number }>()
const N = 30
// deterministic patterns so the slide looks the same every time
const pick = (seed: number, rate: number) => {
  // mulberry32
  let a = seed
  const rnd = () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296 }
  return Array.from({ length: N }, () => rnd() < rate)
}
const ROWS = [
  { label: 'dense', seen: pick(30, 0.6) },
  { label: 'sparse', seen: pick(17, 0.3) },
].map((r) => {
  const idx = r.seen.flatMap((v, i) => (v ? [i] : []))
  const adj = idx.slice(1).filter((v, k) => v - idx[k] === 1)
  return { ...r, n: idx.length, gaps: idx.length - 1, adj, est: Math.round(idx.length * (idx.length - 1) / adj.length) }
})
const CELL = 16, GAP = 4
const rowW = computed(() => N * (CELL + GAP))
</script>

<template>
  <div class="stage">
    <div class="axis">MAC addresses, in order →</div>
    <div v-for="r in ROWS" :key="r.label" class="row">
      <div class="label">{{ r.label }}</div>
      <div class="cells" :style="{ width: `${rowW}px` }">
        <div v-for="(s, i) in r.seen" :key="i" class="cell" :class="{ seen: s }" :style="{ width: `${CELL}px`, height: `${CELL}px`, marginRight: `${GAP}px` }" />
        <!-- link each seen address to the one right before it -->
        <div v-for="i in r.adj" :key="`a${i}`" class="link" :class="{ on: step >= 1 }"
          :style="{ left: `${(i - 1) * (CELL + GAP) + CELL / 2}px`, width: `${CELL + GAP}px` }" />
      </div>
      <div class="count" :class="{ on: step >= 1 }">
        <template v-if="step < 2">density = {{ r.adj.length }}/{{ r.gaps }} = {{ (r.adj.length / r.gaps).toFixed(2) }}</template>
        <template v-else><span style="color:#4ade80">{{ r.n }} seen</span> ÷ <span class="frac">{{ (r.adj.length / r.gaps).toFixed(2) }}</span> ≈ <strong>{{ r.est }}</strong></template>
      </div>
    </div>
    <div class="legend">
      <span class="cell seen" :style="{ width: `${CELL}px`, height: `${CELL}px` }" /> seen in WiGLE
      <span class="cell" :style="{ width: `${CELL}px`, height: `${CELL}px`, marginLeft: '24px' }" /> not seen (yet)
    </div>
    <div class="formula" :class="{ on: step >= 2 }">total ≈ <span>devices seen</span> ÷ <span>density</span></div>
  </div>
</template>

<style scoped>
.stage { width: fit-content; margin: 0 auto; text-align: left; }
.axis strong { color: #fff; }
.axis { margin-left: 100px; font-size: 1.15rem; color: #aaa; margin-bottom: 14px; }
.row { display: flex; align-items: center; margin-bottom: 26px; }
.label { width: 100px; flex: none; font-size: 1.3rem; color: #ddd; }
.cells { position: relative; display: flex; flex: none; }
.cell { display: inline-block; border-radius: 3px; background: #2a2a2a; vertical-align: middle; }
.cell.seen { background: #4ade80; }
.link { position: absolute; top: -10px; height: 6px; border: 2.5px solid #fbbf24; border-bottom: none; border-radius: 4px 4px 0 0; opacity: 0; transition: opacity .4s; }
.link.on { opacity: 1; }
.count { margin-left: 18px; width: 230px; height: 36px; line-height: 36px; font-size: 1.2rem; color: #fbbf24; opacity: 0; transition: opacity .4s; white-space: nowrap; }
.count.on { opacity: 1; }
.count strong { color: #9dd0ff; font-size: 1.5rem; line-height: 1; }
.count .frac { color: #fbbf24; }
.truth { margin-top: 14px; text-align: center; font-size: 1.6rem; color: #4ade80; opacity: 0; transition: opacity .5s; }
.truth.on { opacity: 1; }
.legend { margin-left: 100px; margin-top: 6px; font-size: 1.15rem; color: #bbb; display: flex; align-items: center; gap: 8px; }
.formula { margin-top: 24px; text-align: center; font-size: 2.2rem; opacity: 0; transition: opacity .5s; }
.formula.on { opacity: 1; }
.formula span { color: #9dd0ff; }
</style>
