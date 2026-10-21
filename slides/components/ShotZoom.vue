<script setup lang="ts">
import { computed } from 'vue'
// A full-page web screenshot: click 1 zooms into a passage, click 2 underlines it.
// Zoom target and underlines are in pixels of the source image.
const props = defineProps<{
  step: number
  src: string
  iw: number; ih: number // source image size
  zoom: { x: number; y: number; s: number }
  lines: { x0: number; x1: number; y: number }[]
  width?: number
}>()
// asset paths must include the site base (e.g. /cns-2026/ on GitHub Pages)
const BASE = import.meta.env.BASE_URL
const W = computed(() => props.width ?? 900)
const H = computed(() => W.value * props.ih / props.iw)
const camera = computed(() => {
  if (props.step < 1) return 'none'
  const k = W.value / props.iw, { x, y, s } = props.zoom
  return `translate(${W.value / 2 - x * k * s}px, ${H.value / 2 - y * k * s}px) scale(${s})`
})
</script>

<template>
  <div class="viewer" :style="{ width: `${W}px`, height: `${H}px` }">
    <div class="camera" :style="{ transform: camera }">
      <img :src="`${BASE}${props.src.replace(/^\//, '')}`" :style="{ width: `${W}px`, height: `${H}px` }" />
      <svg class="marks" :viewBox="`0 0 ${props.iw} ${props.ih}`" preserveAspectRatio="none">
        <line v-for="(l, i) in props.lines" :key="i" :x1="l.x0" :x2="l.x1" :y1="l.y" :y2="l.y"
          :class="{ on: props.step >= 2 }" :style="{ '--len': `${l.x1 - l.x0}`, transitionDelay: `${i * 0.5}s` }" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.viewer { position: relative; overflow: hidden; border-radius: 10px; border: 1px solid #333; background: #fff; }
.camera { position: relative; transform-origin: 0 0; transition: transform 1.8s cubic-bezier(0.65, 0, 0.35, 1); }
.marks { position: absolute; inset: 0; width: 100%; height: 100%; }
.marks line { stroke: #e5484d; stroke-width: 3; stroke-linecap: round; stroke-dasharray: var(--len); stroke-dashoffset: var(--len); transition: stroke-dashoffset .6s ease-out; }
.marks line.on { stroke-dashoffset: 0; }
</style>
