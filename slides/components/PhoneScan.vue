<script setup lang="ts">
// Mock of a phone BLE scanner app (illustration, not a screenshot). Named devices are highlighted, "Unknown" is grey.
// With `labeled`, each row's address line is replaced by what the device is (`what`), colored by `tone`.
type Row = { n: string; s: number; what?: string; tone?: 'bad' | 'info' | 'muted' }
const props = withDefaults(defineProps<{ rows?: Row[]; stagger?: number; delay?: number; active?: boolean; labeled?: boolean; picked?: number }>(), {
  rows: () => [
    { n: 'QT XXXXXXXX', s: 4 }, { n: 'Unknown', s: 2 }, { n: 'QT XXXXXXX', s: 3 },
    { n: 'QT XXXXXXXX', s: 3 }, { n: 'Unknown', s: 1 }, { n: 'QT XXXXXXXX', s: 2 },
    { n: 'QT XXXXXXX', s: 4 }, { n: 'Unknown', s: 2 }, { n: 'QT XXXXXXXX', s: 1 },
    { n: 'QT XXXXXXX', s: 3 },
  ],
  stagger: 0.12, delay: 0, active: true, labeled: false, picked: -1,
})
</script>

<template>
  <div class="phone">
    <div class="notch" />
    <div class="bar">
      <span class="title">Scanner</span>
      <span class="scan">SCANNING</span>
    </div>
    <div v-if="props.active" class="list">
      <div v-for="(r, i) in props.rows" :key="i" class="row" :class="{ qt: r.n !== 'Unknown', picked: i === props.picked }" :style="{ animationDelay: `${props.delay + i * props.stagger}s` }">
        <div class="text">
          <div class="name">{{ r.n }}</div>
          <div class="sub">
            <div class="addr" :class="{ gone: props.labeled && r.what }">XX:XX:XX:XX:XX:XX</div>
            <div v-if="r.what" class="what" :class="[r.tone, { on: props.labeled }]" :style="{ transitionDelay: `${i * 0.12}s` }">{{ r.what }}</div>
          </div>
        </div>
        <div class="sig"><span v-for="k in 4" :key="k" :class="{ on: k <= r.s }" :style="{ height: `${k * 4 + 2}px` }" /></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.phone { flex: none; width: 234px; height: 416px; border-radius: 36px; border: 3px solid #3a3a3a; background: #0d0d0d; padding: 34px 10px 12px; position: relative; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,.6); }
.notch { position: absolute; top: 10px; left: 50%; transform: translateX(-50%); width: 80px; height: 16px; border-radius: 10px; background: #000; }
.bar { display: flex; justify-content: space-between; align-items: center; padding: 4px 8px 10px; border-bottom: 1px solid #262626; }
.title { font: 600 17px Inter, system-ui, sans-serif; color: #ededed; }
.scan { font: 600 10px Inter, system-ui, sans-serif; color: #4ea8ff; letter-spacing: .08em; animation: blink 1.4s infinite; }
.list { display: flex; flex-direction: column; }
.row { display: flex; align-items: center; gap: 10px; padding: 7px 8px; border-bottom: 1px solid #1c1c1c; opacity: 0; animation: in .4s ease-out forwards; }
.text { flex: 1; min-width: 0; text-align: left; }
.name { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font: 600 13px ui-monospace, "Noto Sans Mono", monospace; color: #8a8a8a; font-variant-ligatures: none; }
.row.qt .name { color: #9dd0ff; }
.sub { position: relative; height: 14px; }
.addr { font: 10px ui-monospace, monospace; color: #555; transition: opacity .3s; }
.addr.gone { opacity: 0; }
.what { position: absolute; left: 0; top: -1px; white-space: nowrap; font: 600 11px Inter, system-ui, sans-serif; color: #e5e5e5; opacity: 0; transition: opacity .4s; }
.what.on { opacity: 1; }
.what.bad { color: #fca5a5; }
.what.info { color: #93c5fd; }
.what.muted { color: #777; font-weight: 500; }
.row.picked { background: #2a1717; }
.sig { display: flex; align-items: flex-end; gap: 2px; }
.sig span { width: 3px; background: #2a2a2a; border-radius: 1px; }
.sig span.on { background: #4ea8ff; }
@keyframes in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
@keyframes blink { 50% { opacity: .35; } }
</style>
