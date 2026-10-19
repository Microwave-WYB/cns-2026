<script setup lang="ts">
// Schematic crossroads (not real data), drawn in the style of the scan animation (remotion/src/arch/Scan.tsx):
// "QT" sightings pinned on the highway, in the parking lots and at the gas station; the log lists their names.
defineProps<{ step: number }>()

type Car = { x: number; y: number; rot: number; g: number }
const cars: Car[] = []
// group 1: highway (two lanes)
for (const [x, y] of [[90, 318], [300, 318], [820, 318], [1080, 318], [180, 362], [450, 362], [740, 362], [980, 362]])
  cars.push({ x, y, rot: 0, g: 1 })
// group 2: parking lots (stalls)
const LOTS = [{ x: 700, y: 70, w: 420, h: 180 }, { x: 700, y: 440, w: 420, h: 150 }]
const STALLS = [
  ...[0, 1, 2, 3, 4].map((i) => ({ x: 750 + i * 80, y: 120 })),
  ...[0, 1, 2, 3, 4].map((i) => ({ x: 750 + i * 80, y: 200 })),
  ...[0, 1, 2, 3, 4].map((i) => ({ x: 750 + i * 80, y: 515 })),
]
const TAKEN = [0, 1, 3, 4, 6, 7, 9, 10, 12, 13]
for (const i of TAKEN) cars.push({ x: STALLS[i].x, y: STALLS[i].y, rot: -90, g: 2 })
// group 3: gas station (cars at the pumps)
const PUMPS = [{ x: 220, y: 160 }, { x: 380, y: 160 }]
for (const p of PUMPS) for (const dx of [-38, 38]) cars.push({ x: p.x + dx, y: p.y + 10, rot: -90, g: 3 })

// synthetic serials in the observed name format ("QT " + 7-8 hex digits); not real devices
let seed = 20261019
const rnd = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648)
const hex = (n: number) => Array.from({ length: n }, () => '0123456789ABCDEF'[Math.floor(rnd() * 16)]).join('')
const log = [...cars.map((c) => c.g), 3, 3, 3, 3, 3, 3, 3, 3].map((g) => ({ g, name: `QT ${hex(rnd() < 0.5 ? 7 : 8)}` }))
</script>

<template>
  <div class="wrap">
  <svg viewBox="0 0 1200 640" class="map">
    <defs>
      <pattern id="qt-dotgrid" width="32" height="32" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.1" fill="#2a2a2a" /></pattern>
    </defs>
    <rect width="1200" height="640" rx="18" fill="url(#qt-dotgrid)" />

    <!-- crossroads: highway (horizontal) and a local road (vertical) -->
    <rect x="555" y="0" width="70" height="640" fill="#1f1f1f" />
    <rect x="0" y="290" width="1200" height="100" fill="#262626" />
    <path d="M0 340 H1200" stroke="#3a3a3a" stroke-width="1.5" stroke-dasharray="14 18" />
    <path d="M590 0 V290 M590 390 V640" stroke="#333" stroke-width="1.2" stroke-dasharray="10 14" />

    <!-- gas station: canopy and pumps -->
    <rect x="130" y="70" width="340" height="190" rx="12" fill="#181818" stroke="#2c2c2c" stroke-width="1.5" />
    <rect x="150" y="95" width="300" height="140" rx="6" fill="none" stroke="#333" stroke-dasharray="6 8" />
    <g v-for="(p, i) in PUMPS" :key="'p' + i" :transform="`translate(${p.x} ${p.y - 10})`" fill="none" stroke="#6b6b6b" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
      <rect x="-8" y="-12" width="16" height="24" rx="2" />
      <path d="M -4 -6 H 4 M 8 -9 h 5 v 12" />
    </g>
    <text x="300" y="58" text-anchor="middle" class="place">gas station</text>

    <!-- parking lots with stall lines -->
    <g v-for="(l, i) in LOTS" :key="'lot' + i">
      <rect :x="l.x" :y="l.y" :width="l.w" :height="l.h" rx="12" fill="#181818" stroke="#2c2c2c" stroke-width="1.5" />
    </g>
    <path v-for="(s, i) in STALLS" :key="'stall' + i" :d="`M ${s.x - 40} ${s.y - 30} V ${s.y + 30}`" stroke="#2c2c2c" stroke-width="1.5" />
    <text x="910" y="58" text-anchor="middle" class="place">parking</text>

    <!-- a store, for scenery -->
    <rect x="130" y="450" width="340" height="140" rx="12" fill="#181818" stroke="#2c2c2c" stroke-width="1.5" />
    <text x="300" y="528" text-anchor="middle" class="place">store</text>

    <g v-for="(c, i) in cars" :key="'c' + i" :transform="`translate(${c.x} ${c.y})`" class="pin" :style="{ opacity: step >= c.g ? 1 : 0 }">
      <circle r="9" fill="none" stroke="#4ea8ff" stroke-width="1.4" class="ripple" :style="{ animationDelay: `${(i * 0.37) % 2.2}s` }" />
      <path d="M0 0 C -9 -12 -12 -18 -12 -24 A 12 12 0 1 1 12 -24 C 12 -18 9 -12 0 0 Z" fill="#4ea8ff" stroke="#9dd0ff" stroke-width="1.2" />
      <circle cy="-24" r="4.5" fill="#121212" />
    </g>
  </svg>
  <div class="log">
    <div v-for="(l, i) in log" :key="'l' + i" class="row" :style="{ opacity: step >= l.g ? 1 : 0, transitionDelay: `${(i % 10) * 60}ms` }">{{ l.name }}</div>
  </div>
  </div>
</template>

<style scoped>
.wrap { display: flex; gap: 16px; align-items: stretch; }
.wrap > .log { align-self: stretch; }
.map { flex: 1; min-width: 0; background: #121212; border-radius: 18px; }
.log { width: 250px; aspect-ratio: auto; max-height: 100%; overflow: hidden; display: grid; grid-template-columns: 1fr 1fr; align-content: start; gap: 4px 12px; padding: 12px 14px;
  background: #161616; border: 1px solid #2a2a2a; border-radius: 12px; font: 12.5px ui-monospace, "Noto Sans Mono", monospace; color: #9dd0ff; font-variant-ligatures: none; }
.row { transition: opacity 0.3s; white-space: nowrap; text-align: left; }
.pin { transition: opacity 0.4s; }
.place { font: 500 18px Inter, system-ui, sans-serif; fill: #6b6b6b; }
.ripple { animation: ripple 2.2s ease-out infinite; transform-box: fill-box; transform-origin: center; }
@keyframes ripple { from { transform: scale(0.8); opacity: 0.6; } to { transform: scale(3.2); opacity: 0; } }
</style>
