<script setup lang="ts">
// Schematic map (not real data), drawn in the style of the scan animation (remotion/src/arch/Scan.tsx):
// "QT" cars light up along the highway, in parking lots and at gas stations.
const props = defineProps<{ step: number }>()

const HWY = [[30, 905], [470, 870], [790, 330], [1320, 240]] as const
const bez = (t: number) => {
  const u = 1 - t
  const w = [u * u * u, 3 * u * u * t, 3 * u * t * t, t * t * t]
  return [w.reduce((s, k, i) => s + k * HWY[i][0], 0), w.reduce((s, k, i) => s + k * HWY[i][1], 0)]
}
const normal = (t: number) => {
  const [x0, y0] = bez(Math.max(0, t - 0.005))
  const [x1, y1] = bez(Math.min(1, t + 0.005))
  const l = Math.hypot(x1 - x0, y1 - y0)
  return [-(y1 - y0) / l, (x1 - x0) / l]
}
const HWY_D = `M ${HWY[0].join(' ')} C ${HWY.slice(1).map((q) => q.join(' ')).join(', ')}`
const ROADS = [
  'M 120 140 C 300 420 260 700 420 1040',
  'M 560 120 C 640 380 760 520 980 620 S 1240 820 1320 1000',
  'M 40 480 C 360 520 720 600 1320 560',
  'M 900 110 C 960 300 1040 420 1320 420',
]

type Car = { x: number; y: number; rot: number; g: number }
const cars: Car[] = []
// group 1: highway
for (let i = 0; i < 9; i++) {
  const t = 0.07 + i * 0.105
  const [x, y] = bez(t)
  const [nx, ny] = normal(t)
  const [ax, ay] = bez(t + 0.01)
  const side = i % 2 ? 9 : -9
  cars.push({ x: x + nx * side, y: y + ny * side, rot: Math.atan2(ay - y, ax - x) * 180 / Math.PI, g: 1 })
}
// group 2: parking lots
const LOTS = [{ x: 110, y: 560, w: 260, h: 150 }, { x: 960, y: 740, w: 260, h: 150 }]
for (const l of LOTS)
  for (let i = 0; i < 6; i++)
    cars.push({ x: l.x + 45 + (i % 3) * 80, y: l.y + 45 + Math.floor(i / 3) * 72, rot: -90, g: 2 })
// group 3: gas stations
const STATIONS = [{ x: 600, y: 770 }, { x: 430, y: 280 }]
for (const s of STATIONS)
  for (const dx of [-30, 30]) cars.push({ x: s.x + dx, y: s.y + 52, rot: -90, g: 3 })

// background devices that are not QT, so the QT ones stand out
let seed = 20261019
const rnd = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648)
const noise = Array.from({ length: 34 }, () => ({ x: 60 + rnd() * 1230, y: 250 + rnd() * 660, k: Math.floor(rnd() * 3) }))
</script>

<template>
  <svg viewBox="30 230 1290 700" class="map">
    <defs>
      <pattern id="qt-dotgrid" width="32" height="32" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.1" fill="#2a2a2a" /></pattern>
    </defs>
    <rect x="30" y="230" width="1290" height="700" rx="18" fill="url(#qt-dotgrid)" />
    <path v-for="(d, i) in ROADS" :key="i" :d="d" stroke="#1f1f1f" stroke-width="12" fill="none" stroke-linecap="round" />
    <path :d="HWY_D" stroke="#262626" stroke-width="34" fill="none" />
    <path :d="HWY_D" stroke="#3a3a3a" stroke-width="1.2" fill="none" stroke-dasharray="14 18" opacity="0.8" />

    <rect v-for="(l, i) in LOTS" :key="'lot' + i" :x="l.x" :y="l.y" :width="l.w" :height="l.h" rx="10"
      fill="#181818" stroke="#2c2c2c" stroke-width="1.5" />
    <g v-for="(s, i) in STATIONS" :key="'st' + i" :transform="`translate(${s.x} ${s.y})`">
      <rect x="-70" y="10" width="140" height="80" rx="10" fill="#181818" stroke="#2c2c2c" stroke-width="1.5" />
      <g fill="none" stroke="#6b6b6b" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <rect x="-7" y="-26" width="14" height="20" rx="2" />
        <path d="M -4 -21 H 4 M 7 -20 h 4 v 10" />
      </g>
    </g>

    <g v-for="(n, i) in noise" :key="'n' + i" :transform="`translate(${n.x} ${n.y})`" fill="none" stroke="#3d4756" stroke-width="1.4">
      <rect v-if="n.k === 0" x="-5" y="-8" width="10" height="16" rx="2" />
      <circle v-else-if="n.k === 1" r="6" />
      <rect v-else x="-5" y="-5" width="10" height="10" rx="3" />
    </g>

    <g v-for="(c, i) in cars" :key="'c' + i" :transform="`translate(${c.x} ${c.y})`">
      <template v-if="step >= c.g">
        <circle r="10" fill="none" stroke="#4ea8ff" stroke-width="1.4" class="ripple" :style="{ animationDelay: `${(i * 0.37) % 2.2}s` }" />
        <circle r="18" fill="none" stroke="#9dd0ff" stroke-opacity="0.35" />
      </template>
      <g :transform="`rotate(${c.rot})`" fill="none" :stroke="step >= c.g ? '#9dd0ff' : '#6b7f99'" stroke-width="1.6" class="car">
        <rect x="-13" y="-6.5" width="26" height="13" rx="5" />
        <path d="M 4 -5 V 5 M -7 -5 V 5" />
      </g>
      <text v-if="step >= c.g" y="-24" text-anchor="middle" class="qt">QT</text>
    </g>
  </svg>
</template>

<style scoped>
.map { width: 100%; background: #121212; border-radius: 18px; }
.car { transition: stroke 0.4s; }
.qt { font: 600 17px ui-monospace, "Noto Sans Mono", monospace; fill: #9dd0ff; }
.ripple { animation: ripple 2.2s ease-out infinite; transform-box: fill-box; transform-origin: center; }
@keyframes ripple { from { transform: scale(0.8); opacity: 0.6; } to { transform: scale(3.2); opacity: 0; } }
</style>
