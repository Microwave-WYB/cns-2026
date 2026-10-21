<script setup lang="ts">
// The end goal, as an imagined version of our scanner app: every nearby device is labelled with what it is.
// step 0: plain scan (names and addresses), step 1: labels from the knowledge base, step 2: tap the car module.
// Mock UI: names are real name patterns with serials masked; no real MACs or locations.
defineProps<{ step: number }>()
const ROWS = [
  { n: 'QT XXXXXXXX', s: 4, what: 'KARR car alarm module', tone: 'bad' as const },
  { n: 'EmTag', s: 3, what: 'Clinical asset tag', tone: 'info' as const },
  { n: 'Unknown', s: 3, what: 'Apple Find My tag' },
  { n: 'ResMed XXXXXX', s: 2, what: 'CPAP machine', tone: 'info' as const },
  { n: 'PrimexClock', s: 2, what: 'Synchronized wall clock' },
  { n: 'Unknown', s: 1, what: 'Not identified yet', tone: 'muted' as const },
]
</script>

<template>
  <div class="stage">
    <div class="holder" :class="{ aside: step >= 2 }">
      <PhoneScan :rows="ROWS" :labeled="step >= 1" :picked="step >= 2 ? 0 : -1" />
    </div>
    <div class="card" :class="{ on: step >= 2 }">
      <div class="title">KARR car alarm module</div>
      <p>A dealer-installed car alarm. Owners lock and unlock the car from the KARR Security app.</p>
      <p class="warn"><a href="https://nvd.nist.gov/vuln/detail/CVE-2026-18411" target="_blank">CVE-2026-18411</a></p>
    </div>
  </div>
</template>

<style scoped>
.stage { position: relative; width: 900px; height: 430px; margin: 0 auto; }
.holder { position: absolute; left: 50%; top: 0; transform: translateX(-50%); transition: left 1s cubic-bezier(.65,0,.35,1); }
.holder.aside { left: 22%; }
.card { position: absolute; left: 42%; top: 110px; width: 460px; padding: 22px 26px; border-radius: 14px; background: #181818; border: 1px solid #333; text-align: left; opacity: 0; transform: translateX(20px); transition: all .6s .6s; }
.card.on { opacity: 1; transform: none; }
.title { font: 600 24px Inter, system-ui, sans-serif; color: #fff; margin-bottom: 10px; }
.card p { font: 400 19px/1.5 Inter, system-ui, sans-serif; color: #ccc; margin: 6px 0; }
.card p.warn a { color: #fca5a5; text-decoration: underline; }
</style>
