<script setup lang="ts">
import { computed } from 'vue'
// The Bluetooth SIG Assigned Numbers PDF (section 7.1, Company Identifiers by Value) shown like a PDF viewer:
// start of the list, a long scroll to its last entry, then a search for a QT "company ID" that finds nothing.
const props = defineProps<{ step: number }>()
const W = 820, H = 470, PAD = 14 // viewer size and page margin
const PH = H - 2 * PAD // page height on screen
const ASPECT = 1700 / 2200 // US Letter
// asset paths must include the site base (e.g. /cns-2026/ on GitHub Pages)
const BASE = import.meta.env.BASE_URL
// first and last page of the list are rendered sharp; the pages in between only fly past
const pages = [219, 220, 221, 235, 250, 265, 280, 295, 310, 325, 331, 332].map((n) => ({ n, src: `${BASE}shots/sig-an-p${n}.jpg` }))
const LAST = pages.length - 1
// click steps: each stop is a page (0-based) and an optional zoom target (fraction of that page image, scale)
type Stop = { page: number; zoom?: { fx: number; fy: number; s: number } }
const STOPS: Stop[] = [
  { page: 0 },                                        // "7 Company Identifiers", page 219
  { page: 0, zoom: { fx: 0.45, fy: 0.6, s: 2.6 } },   // the list starts: 0x0000 Ericsson AB, 0x0001 Nokia, ...
  { page: LAST },                                     // scroll to the end of the list, page 332
  { page: LAST, zoom: { fx: 0.42, fy: 0.17, s: 3.4 } }, // the last one: 0x1132 Nicrew Technology
  { page: LAST, zoom: { fx: 0.42, fy: 0.17, s: 3.4 } }, // search for 0x3176: no results
]
const stop = computed(() => STOPS[Math.min(props.step, STOPS.length - 1)])
const camera = computed(() => {
  const z = stop.value.zoom
  if (!z) return 'none'
  const pw = PH * ASPECT
  const px = (W - pw) / 2 + z.fx * pw, py = PAD + z.fy * PH
  return `translate(${W / 2 - px * z.s}px, ${H / 2 - py * z.s}px) scale(${z.s})`
})
</script>

<template>
  <div class="viewer" :style="{ width: `${W}px`, height: `${H}px` }">
    <div class="camera" :style="{ transform: camera }">
      <div class="column" :style="{ transform: `translateY(${-stop.page * H}px)` }">
        <div v-for="p in pages" :key="p.n" class="slot" :style="{ height: `${H}px` }">
          <img :src="p.src" :style="{ height: `${PH}px`, width: `${PH * ASPECT}px` }" />
        </div>
      </div>
    </div>
    <!-- PDF viewer find bar, shown on the last step -->
    <div class="find" :class="{ on: props.step >= 4 }">
      <span class="query">0x3176</span>
      <span class="result">No results</span>
    </div>
  </div>
</template>

<style scoped>
.viewer { position: relative; overflow: hidden; background: #525659; border-radius: 10px; border: 1px solid #333; }
.camera { transform-origin: 0 0; transition: transform 1.8s cubic-bezier(0.65, 0, 0.35, 1); width: 100%; height: 100%; }
.column { transition: transform 2.6s cubic-bezier(0.65, 0, 0.35, 1); }
.slot { display: flex; align-items: center; justify-content: center; }
.slot img { box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5); background: #fff; }
.find { position: absolute; top: 14px; right: 14px; display: flex; align-items: center; gap: 14px; padding: 8px 12px; border-radius: 6px;
  background: #2b2b2b; box-shadow: 0 6px 20px rgba(0,0,0,.5); font-size: 1.4rem; opacity: 0; transform: translateY(-12px); transition: all .4s ease; }
.find.on { opacity: 1; transform: none; }
.query { font-family: ui-monospace, monospace; background: #fff; color: #111; padding: 2px 12px; border-radius: 4px; border: 2px solid #e5484d; min-width: 150px; text-align: left; }
.result { color: #ff8a8a; }
</style>
