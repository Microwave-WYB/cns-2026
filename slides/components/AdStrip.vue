<script setup lang="ts">
// A BLE advertisement drawn as byte tiles grouped into AD structures — same look and colors as the videos.
type Part = { t: 'flags' | 'uuid' | 'svc' | 'mfg' | 'name' | 'tx'; n: number }
const props = withDefaults(defineProps<{ parts: Part[]; tile?: number; label?: string }>(), { tile: 14 })
const COLOR: Record<Part['t'], string> = {
  flags: '#a3a3a3', uuid: '#4ea8ff', svc: '#2fc7b4', mfg: '#5fd4e8', name: '#cbd5e1', tx: '#7c8db5',
}
</script>

<template>
  <div class="strip">
    <div v-for="(p, i) in props.parts" :key="i" class="part">
      <span v-for="j in p.n" :key="j" class="tile"
        :style="{ width: `${tile}px`, height: `${tile * 1.5}px`, background: COLOR[p.t], opacity: j === 1 ? 0.55 : 1 }" />
    </div>
    <span v-if="label" class="label">{{ label }}</span>
  </div>
</template>

<style scoped>
.strip { display: flex; align-items: center; gap: 8px; }
.part { display: flex; gap: 2px; }
.tile { display: inline-block; border-radius: 3px; }
.label { margin-left: 14px; font-family: ui-monospace, monospace; font-size: 18px; opacity: 0.8; font-variant-ligatures: none; }
</style>
