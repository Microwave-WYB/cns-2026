<script setup lang="ts">
import { onMounted } from 'vue'
// Warm the browser cache with the big images that components load by computed path (e.g. the manual viewer),
// so those slides do not wait on the network when they come up. Starts after the first slide has rendered.
const BASE = import.meta.env.BASE_URL
const PRELOAD = [
  ...[1, 2, 3, 4, 5, 6, 7, 8].map((n) => `shots/karr-manual-p${n}.jpg`),
  ...[219, 220, 221, 235, 250, 265, 280, 295, 310, 325, 331, 332].map((n) => `shots/sig-an-p${n}.jpg`),
  'people/yibo.jpg',
]
onMounted(() => setTimeout(() => PRELOAD.forEach((p) => { new Image().src = `${BASE}${p}` }), 1000))
</script>

<template>
  <!-- page number on every slide except the title -->
  <div v-if="$nav.currentPage > 1" class="absolute bottom-3 right-5 text-sm opacity-50">
    {{ $nav.currentPage }} / {{ $nav.total }}
  </div>
</template>

<style>
:root {
  --slidev-transition-duration: 150ms;
}
</style>
