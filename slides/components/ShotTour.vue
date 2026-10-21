<script setup lang="ts">
import { computed } from 'vue'
// A web screenshot toured click by click: each stop zooms to a point, draws red boxes around what matters,
// and shows a short caption over the bottom of the viewer. Coordinates are pixels of the source image.
type Box = { x0: number; y0: number; x1: number; y1: number }
type Stop = { x?: number; y?: number; s?: number; boxes?: Box[]; caption?: string; captionTop?: boolean }
const props = defineProps<{ step: number; src: string; iw: number; ih: number; width?: number; stops: Stop[] }>()
// asset paths must include the site base (e.g. /cns-2026/ on GitHub Pages)
const BASE = import.meta.env.BASE_URL
const W = computed(() => props.width ?? 720)
const H = computed(() => W.value * props.ih / props.iw)
const stop = computed(() => props.stops[Math.min(props.step, props.stops.length - 1)] ?? {})
const camera = computed(() => {
  const { x, y, s } = stop.value
  if (x === undefined || y === undefined || !s) return 'none'
  const k = W.value / props.iw
  // keep the zoomed image covering the viewer
  const tx = Math.min(0, Math.max(W.value - W.value * s, W.value / 2 - x * k * s))
  const ty = Math.min(0, Math.max(H.value - H.value * s, H.value / 2 - y * k * s))
  return `translate(${tx}px, ${ty}px) scale(${s})`
})
// every box of every stop is rendered once; only the current stop's boxes are drawn in
const boxes = computed(() => props.stops.flatMap((st, i) => (st.boxes ?? []).map((b, j) => ({ ...b, i, j }))))
</script>

<template>
  <div>
    <div class="viewer" :style="{ width: `${W}px`, height: `${H}px` }">
      <div class="camera" :style="{ transform: camera }">
        <img :src="`${BASE}${props.src.replace(/^\//, '')}`" :style="{ width: `${W}px`, height: `${H}px` }" />
        <svg class="marks" :viewBox="`0 0 ${props.iw} ${props.ih}`" preserveAspectRatio="none">
          <rect v-for="b in boxes" :key="`${b.i}-${b.j}`" :x="b.x0 - 4" :y="b.y0 - 4" :width="b.x1 - b.x0 + 8" :height="b.y1 - b.y0 + 8" rx="4"
            pathLength="100" :class="{ on: Math.min(props.step, props.stops.length - 1) === b.i }" :style="{ transitionDelay: `${b.j * 0.35}s` }" />
        </svg>
      </div>
      <div class="caption" :class="{ on: !!stop.caption, top: stop.captionTop }">{{ stop.caption }}</div>
    </div>
  </div>
</template>

<style scoped>
.viewer { position: relative; overflow: hidden; border-radius: 8px; border: 1px solid #333; background: #fff; margin: 0 auto; }
.camera { position: relative; transform-origin: 0 0; transition: transform 1.2s cubic-bezier(0.65, 0, 0.35, 1); }
.camera img { max-width: none; }
.marks { position: absolute; inset: 0; width: 100%; height: 100%; }
.marks rect { fill: none; stroke: #e5484d; stroke-width: 3; stroke-dasharray: 100; stroke-dashoffset: 100; opacity: 0; transition: stroke-dashoffset 0s, opacity 0s; }
.marks rect.on { stroke-dashoffset: 0; opacity: 1; transition: stroke-dashoffset .6s ease-out .9s, opacity 0s .9s; }
.caption { position: absolute; left: 50%; bottom: 14px; transform: translateX(-50%); white-space: nowrap; padding: 6px 18px; border-radius: 8px;
  background: rgba(20, 20, 20, .88); color: #fff; font-size: 1.5rem; box-shadow: 0 6px 20px rgba(0,0,0,.4); opacity: 0; transition: opacity 0s; }
.caption.top { bottom: auto; top: 14px; }
.caption.on { opacity: 1; transition: opacity .4s 1.2s; }
</style>
