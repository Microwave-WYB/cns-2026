<script setup lang="ts">
// Our scans: deep but narrow. WiGLE: wide but shallow. Shown as two rectangles on depth × coverage axes.
defineProps<{ step?: number }>()
</script>

<template>
  <div class="chart">
    <div class="axis-y">detail</div>
    <div class="axis-x">coverage →</div>
    <div class="plot">
      <div class="ours" :class="{ on: (step ?? 0) >= 1 }"><span>our scans</span></div>
      <div class="wigle" :class="{ on: (step ?? 0) >= 2 }"><span>WiGLE</span></div>
    </div>
  </div>
</template>

<style scoped>
.chart { position: relative; width: 360px; height: 260px; }
.plot { position: absolute; left: 30px; bottom: 30px; width: 320px; height: 220px; border-left: 2px solid #6b6b6b; border-bottom: 2px solid #6b6b6b; }
.axis-y { position: absolute; left: -18px; top: 100px; transform: rotate(-90deg); font-size: 18px; opacity: 0.7; }
.axis-x { position: absolute; left: 140px; bottom: 0; font-size: 18px; opacity: 0.7; }
.ours, .wigle { position: absolute; bottom: 0; left: 0; border-radius: 6px; opacity: 0; transition: opacity 0.5s, transform 0.5s; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 18px; }
.ours { width: 70px; height: 210px; background: #4ea8ff33; border: 2px solid #4ea8ff; color: #9dd0ff; transform: translateY(20px); }
.ours span { writing-mode: vertical-rl; }
.wigle { width: 310px; height: 54px; background: #4ade8022; border: 2px solid #4ade80; color: #4ade80; transform: translateX(-20px); }
.on { opacity: 1; transform: none; }
</style>
