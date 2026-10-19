<script setup lang="ts">
// Step 1 story, deliberately simple, one scene on a city map:
// step 0: Aaron and Nishant (with a phone running WiGLE) on the map,
// step 1: Aaron flies off; Nishant walks the streets and signals pop up wherever he goes.
defineProps<{ step: number }>()

const W = 1140, H = 460
const ROUTE = 'M 640 250 V 160 H 920 V 340 H 780 V 420 H 360 V 250 H 220 V 70 H 500 V 160 H 640 V 70 H 1060 V 420'
const STREETS_H = [70, 160, 250, 340, 420]
const STREETS_V = [80, 220, 360, 500, 640, 780, 920, 1060]
const WALK = 10, START = 0.8 // seconds
// signals that pop up as Nishant passes
let seed = 7
const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280)
const SIGNALS = Array.from({ length: 34 }, (_, i) => ({ t: 0.3 + i * 0.28, dx: (rnd() < 0.5 ? -1 : 1) * (22 + rnd() * 30), dy: (rnd() < 0.5 ? -1 : 1) * (22 + rnd() * 25) }))
</script>

<template>
  <div class="stage">
    <div class="layer">
      <svg :viewBox="`0 0 ${W} ${H}`" class="city">
        <defs>
          <pattern id="wd-dots" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.1" fill="#2a2a2a" /></pattern>
        </defs>
        <rect :width="W" :height="H" rx="16" fill="url(#wd-dots)" />
        <path v-for="y in STREETS_H" :key="'h' + y" :d="`M 0 ${y} H ${W}`" stroke="#1f1f1f" stroke-width="14" />
        <path v-for="x in STREETS_V" :key="'v' + x" :d="`M ${x} 0 V ${H}`" stroke="#1f1f1f" stroke-width="14" />
        <path :d="ROUTE" stroke="#4ea8ff" stroke-opacity=".35" stroke-width="2" fill="none" stroke-dasharray="1" pathLength="1"
          class="trail" :class="{ go: step >= 1 }" />
      </svg>

      <!-- signals: placed along the route where Nishant is at that moment, popping up as he passes -->
      <div v-for="(s, i) in SIGNALS" :key="i" class="sig" :class="{ go: step >= 1 }"
        :style="{ offsetPath: `path('${ROUTE}')`, offsetDistance: `${(s.t / WALK) * 100}%`, animationDelay: `${START + s.t}s` }">
        <div class="dot" :style="{ transform: `translate(${s.dx}px, ${s.dy}px)` }"><span class="ring" /></div>
      </div>

      <!-- Nishant with his phone wanders along the route -->
      <div class="walker" :class="{ go: step >= 1 }" :style="{ offsetPath: `path('${ROUTE}')` }">
        <img src="/people/nishant.jpg" class="face" />
        <div class="phone"><img src="/shots/wigle.jpg" /></div>
      </div>

      <!-- Aaron sends him off and flies away -->
      <img src="/people/aaron.jpg" class="face aaron" :class="{ gone: step >= 1 }" />
    </div>
  </div>
</template>

<style scoped>
.stage { position: relative; width: 900px; height: 363px; margin: 0 auto; }
.layer { position: absolute; left: 0; top: 0; width: 1140px; height: 460px; transform: scale(0.7895); transform-origin: 0 0; }
.city { position: absolute; inset: 0; width: 100%; height: 100%; }
.trail { stroke-dashoffset: 1; }
.trail.go { animation: draw 10s linear .8s forwards; }

.face { max-width: none; width: 96px; height: 96px; border-radius: 50%; object-fit: cover; object-position: 50% 18%; border: 3px solid #4ea8ff; box-shadow: 0 6px 20px rgba(0,0,0,.6); }
.aaron { position: absolute; left: 470px; top: 200px; transition: transform 1.1s cubic-bezier(.5,-0.3,.7,0), opacity 1.1s; }
.aaron.gone { transform: translate(-700px, -520px) rotate(-540deg) scale(.4); opacity: 0; }

.walker { position: absolute; left: 0; top: 0; width: 0; height: 0; offset-rotate: 0deg; offset-distance: 0%; }
.walker.go { animation: walk 10s linear .8s forwards; }
.walker .face { position: absolute; left: -48px; top: -48px; }
.phone { position: absolute; left: 38px; top: -6px; width: 34px; height: 58px; border-radius: 6px; border: 3px solid #3a3a3a; background: #000; overflow: hidden; transform: rotate(12deg); }
.phone img { width: 100%; height: 100%; object-fit: cover; }

.sig { position: absolute; left: 0; top: 0; width: 0; height: 0; offset-rotate: 0deg; opacity: 0; }
.sig.go { animation-name: show; animation-duration: .3s; animation-timing-function: ease-out; animation-fill-mode: forwards; }
.dot { position: absolute; left: -6px; top: -6px; width: 12px; height: 12px; border-radius: 50%; background: #9dd0ff; box-shadow: 0 0 12px #4ea8ff; }
.ring { position: absolute; inset: 0; border-radius: 50%; border: 2px solid #4ea8ff; animation: ripple 2s ease-out infinite; }

@keyframes walk { from { offset-distance: 0%; } to { offset-distance: 100%; } }
@keyframes draw { to { stroke-dashoffset: 0; } }
@keyframes show { from { opacity: 0; } to { opacity: 1; } }
@keyframes ripple { from { transform: scale(1); opacity: .8; } to { transform: scale(3.5); opacity: 0; } }
</style>
