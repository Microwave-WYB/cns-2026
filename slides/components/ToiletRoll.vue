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
    <!-- A thick cylinder, with its axis about as long as its diameter. -->
    <ellipse cx="110" cy="110" rx="50" ry="76" fill="#f4f1ea" />
    <rect x="110" y="34" width="160" height="152" fill="#f4f1ea" />
    <!-- The sheet leaves the front tangent, not the back or the bottom. -->
    <path d="M60 110 H220 V374 l-10 -4 -10 6 -10 -5 -10 4 -10 -3 -10 5 -10 -5 -10 3 -10 -4 -10 5 -10 -4 -10 5 -10 -4 -10 3 -10 -4 -10 2 Z"
      fill="#f4f1ea" />
    <g fill="#4a4a4a" style="font: 11px Georgia, serif">
      <text v-for="(t, i) in titles" :key="i" x="70" :y="147 + i * 18">{{ t }}</text>
    </g>
    <line v-for="y in [192, 264, 336]" :key="y" x1="64" x2="216" :y1="y" :y2="y" stroke="#c9c2b5" stroke-dasharray="3 4" />
    <!-- Exposed circular layers and cardboard core on the right end. -->
    <ellipse cx="270" cy="110" rx="50" ry="76" fill="#e5dfd2" stroke="#c8bfad" />
    <ellipse v-for="r in [44, 38, 32, 26]" :key="r" cx="270" cy="110" :rx="r" :ry="r * 1.52" fill="none" stroke="#cec5b3" stroke-width="0.8" />
    <ellipse cx="270" cy="110" rx="21" ry="32" fill="#aa8e68" />
    <ellipse cx="270" cy="110" rx="15" ry="26" fill="#554536" />
  </svg>
</template>

<style scoped>
.roll { width: 100%; height: 100%; }
</style>
