<script setup lang="ts">
// Schematic map (not real data): "QT" sightings along a highway, in parking lots and at gas stations.
const props = defineProps<{ step: number }>()
const bez = (t: number, a: number, b: number, c: number, d: number) =>
  (1 - t) ** 3 * a + 3 * (1 - t) ** 2 * t * b + 3 * (1 - t) * t ** 2 * c + t ** 3 * d
const highway = Array.from({ length: 12 }, (_, i) => {
  const t = (i + 0.5) / 12
  return { x: bez(t, 20, 250, 700, 940), y: bez(t, 340, 60, 60, 340) }
})
const lots = [
  { x: 120, y: 60, w: 150, h: 80 },
  { x: 700, y: 330, w: 170, h: 90 },
  { x: 380, y: 360, w: 140, h: 80 },
]
const lotTags = lots.flatMap((l, k) =>
  Array.from({ length: 8 }, (_, i) => ({ x: l.x + 14 + (i % 4) * (l.w - 28) / 3, y: l.y + 18 + Math.floor(i / 4) * (l.h - 36), k })))
const stations = [{ x: 300, y: 290 }, { x: 640, y: 210 }, { x: 850, y: 150 }, { x: 470, y: 300 }]
</script>

<template>
  <svg viewBox="0 0 960 480" class="map">
    <g stroke="#2c2c2c" stroke-width="2" fill="none">
      <path v-for="i in 8" :key="'h' + i" :d="`M0 ${i * 55} H960`" />
      <path v-for="i in 12" :key="'v' + i" :d="`M${i * 80} 0 V480`" />
    </g>
    <path d="M20 340 C 250 60, 700 60, 940 340" stroke="#555" stroke-width="14" fill="none" stroke-linecap="round" />
    <path d="M20 340 C 250 60, 700 60, 940 340" stroke="#121212" stroke-width="2" fill="none" stroke-dasharray="10 12" />

    <g class="grp" :style="{ opacity: step >= 1 ? 1 : 0 }">
      <g v-for="(p, i) in highway" :key="'hw' + i">
        <circle :cx="p.x" :cy="p.y" r="15" fill="#4ea8ff" opacity="0.9" />
        <text :x="p.x" :y="p.y + 5" text-anchor="middle" class="qt">QT</text>
      </g>
    </g>
    <g class="grp" :style="{ opacity: step >= 2 ? 1 : 0 }">
      <rect v-for="(l, i) in lots" :key="'l' + i" :x="l.x" :y="l.y" :width="l.w" :height="l.h" rx="6" fill="#1c1c1c" stroke="#555" />
      <g v-for="(p, i) in lotTags" :key="'lt' + i">
        <circle :cx="p.x" :cy="p.y" r="13" fill="#2fc7b4" opacity="0.9" />
        <text :x="p.x" :y="p.y + 4" text-anchor="middle" class="qt small">QT</text>
      </g>
    </g>
    <g class="grp" :style="{ opacity: step >= 3 ? 1 : 0 }">
      <g v-for="(s, i) in stations" :key="'s' + i">
        <rect :x="s.x - 22" :y="s.y - 22" width="44" height="44" rx="8" fill="#f87171" opacity="0.95" />
        <text :x="s.x" :y="s.y + 5" text-anchor="middle" class="qt">QT</text>
      </g>
    </g>
  </svg>
</template>

<style scoped>
.map { width: 100%; background: #161616; border-radius: 12px; border: 1px solid #333; }
.grp { transition: opacity 0.5s; }
.qt { font: 700 13px ui-monospace, monospace; fill: #0b0b0b; }
.qt.small { font-size: 11px; }
</style>
