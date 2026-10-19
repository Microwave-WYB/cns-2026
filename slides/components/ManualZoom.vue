<script setup lang="ts">
import { computed } from 'vue'
// The KARR user manual (FCC filing 2ASRL-1069) shown like a PDF viewer:
// each click either scrolls to a page or zooms into a passage on it (see STOPS).
const props = defineProps<{ step: number }>()
const W = 820, H = 470, PAD = 14 // viewer size and page margin
const PH = H - 2 * PAD // page height on screen
const pages = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({ n, src: `/shots/karr-manual-p${n}.jpg`, aspect: n === 1 ? 372 / 552 : n >= 7 ? 372 / 577 : 744 / 552 }))
// click steps: each stop is a page (0-based) and an optional zoom target (fraction of that page image, scale)
type Stop = { page: number; zoom?: { fx: number; fy: number; s: number } }
const STOPS: Stop[] = [
  { page: 0 },                                         // cover
  { page: 0, zoom: { fx: 0.5, fy: 0.426, s: 3.6 } },   // cover blurb: "... the best in electronic vehicle security"
  { page: 4 },                                         // page "KARR BT System Functions"
  { page: 4, zoom: { fx: 0.168, fy: 0.553, s: 5 } },   // "The KARR BT System App allows you to arm/lock or disarm/unlock ..."
  { page: 5 },                                         // page "Settings"
  { page: 5, zoom: { fx: 0.3516, fy: 0.2689, s: 8 } }, // app screenshot: "QT" + serial
]
const stop = computed(() => STOPS[Math.min(props.step, STOPS.length - 1)])
const camera = computed(() => {
  const z = stop.value.zoom
  if (!z) return 'none'
  const pw = PH * pages[stop.value.page].aspect
  const px = (W - pw) / 2 + z.fx * pw, py = PAD + z.fy * PH
  return `translate(${W / 2 - px * z.s}px, ${H / 2 - py * z.s}px) scale(${z.s})`
})
</script>

<template>
  <div class="viewer" :style="{ width: `${W}px`, height: `${H}px` }">
    <div class="camera" :style="{ transform: camera }">
      <div class="column" :style="{ transform: `translateY(${-stop.page * H}px)` }">
        <div v-for="p in pages" :key="p.n" class="slot" :style="{ height: `${H}px` }">
          <img :src="p.src" :style="{ height: `${PH}px` }" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.viewer { overflow: hidden; background: #525659; border-radius: 10px; border: 1px solid #333; }
.camera { transform-origin: 0 0; transition: transform 1.8s cubic-bezier(0.65, 0, 0.35, 1); width: 100%; height: 100%; }
.column { transition: transform 2s cubic-bezier(0.65, 0, 0.35, 1); }
.slot { display: flex; align-items: center; justify-content: center; }
.slot img { box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5); background: #fff; }
</style>
