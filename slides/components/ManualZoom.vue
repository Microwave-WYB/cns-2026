<script setup lang="ts">
// The KARR user manual (FCC filing 2ASRL-1069) shown like a PDF viewer:
// step 0 = cover, step >= 1 = scroll to page 6, step >= 2 = zoom into the app screenshot ("QT ..." line).
const props = defineProps<{ step: number }>()
const W = 820, H = 470, PAD = 14 // viewer size and page margin
const PH = H - 2 * PAD // page height on screen
const pages = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({ n, src: `/shots/karr-manual-p${n}.jpg`, aspect: n === 1 ? 372 / 552 : n >= 7 ? 372 / 577 : 744 / 552 }))
const TARGET = 5 // page 6, 0-based
// the "QT" line inside page 6, as a fraction of the page image
const FX = 0.3516, FY = 0.2689, S = 8
const pw = PH * pages[TARGET].aspect
const px = (W - pw) / 2 + FX * pw, py = PAD + FY * PH
const zoom = `translate(${W / 2 - px * S}px, ${H / 2 - py * S}px) scale(${S})`
</script>

<template>
  <div class="viewer" :style="{ width: `${W}px`, height: `${H}px` }">
    <div class="camera" :style="{ transform: step >= 2 ? zoom : 'none' }">
      <div class="column" :style="{ transform: `translateY(${step >= 1 ? -TARGET * H : 0}px)` }">
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
