<script setup lang="ts">
// A toilet paper roll whose sheet is printed with interchangeable "LLM agent does security" paper titles.
const titles = [
  'LLM Agents for IoT Security', 'Agentic Bluetooth Fuzzing', 'GPT Finds Your Bugs', 'AutoPwn-LLM',
  'Agents Audit Firmware', 'LLM-Driven BLE Hacking', 'AgentSec: Yet Another', 'Autonomous Vuln Hunter',
  'LLM Agents for IoT Security', 'GPT Reverse-Engineers Apps', 'Agentic Wireless Attacks', 'LLM Pentest Copilot',
]
</script>

<template>
  <svg viewBox="0 0 360 400" class="roll">
    <!-- hanging sheet -->
    <defs>
      <clipPath id="sheet"><rect x="70" y="90" width="220" height="300" /></clipPath>
    </defs>
    <rect x="70" y="90" width="220" height="300" fill="#f4f1ea" />
    <g clip-path="url(#sheet)" fill="#4a4a4a" style="font: 13px Georgia, serif">
      <text v-for="(t, i) in titles" :key="i" x="84" :y="112 + i * 24">{{ t }}</text>
    </g>
    <!-- perforations -->
    <line v-for="y in [190, 290]" :key="y" x1="70" x2="290" :y1="y" :y2="y" stroke="#bdb7aa" stroke-dasharray="4 5" />
    <!-- torn bottom edge -->
    <path d="M70 390 l12 -8 l12 8 l12 -8 l12 8 l12 -8 l12 8 l12 -8 l12 8 l12 -8 l12 8 l12 -8 l12 8 l12 -8 l12 8 l12 -8 l12 8 l12 -8 l4 3 V400 H70 Z" fill="#111" />
    <!-- roll -->
    <rect x="60" y="30" width="240" height="70" rx="6" fill="#ece8df" />
    <ellipse cx="60" cy="65" rx="22" ry="35" fill="#ddd8cc" />
    <ellipse cx="60" cy="65" rx="9" ry="15" fill="#8a7a62" />
    <ellipse cx="300" cy="65" rx="22" ry="35" fill="#f4f1ea" />
  </svg>
</template>

<style scoped>
.roll { width: 100%; height: 100%; }
</style>
