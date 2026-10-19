<script setup lang="ts">
// Step 1 story, deliberately simple: Aaron sends Nishant out; Nishant gets a phone running WiGLE;
// he drives around the city in a car; "?" devices pop up along the way.
// step 0: Aaron + Nishant, step 1: Aaron points ("go scan"), phone appears, step 2: into the car and drive.
defineProps<{ step: number }>()

const ROUTE = 'M 60 330 H 300 V 130 H 620 V 330 H 860 V 130 H 1080'
const STREETS_H = [130, 230, 330, 430]
const STREETS_V = [60, 180, 300, 420, 540, 620, 740, 860, 980, 1080]
// devices along the way that light up as the car passes (timing in seconds of the 9 s drive)
const DEVICES = [
  { x: 210, y: 300, t: 1.0 }, { x: 330, y: 200, t: 2.0 }, { x: 470, y: 100, t: 3.0 },
  { x: 590, y: 160, t: 3.9 }, { x: 650, y: 290, t: 4.8 }, { x: 760, y: 360, t: 5.6 },
  { x: 830, y: 200, t: 6.6 }, { x: 950, y: 100, t: 7.6 }, { x: 1050, y: 160, t: 8.4 },
]
</script>

<template>
  <div class="stage">
    <!-- city: dark street grid in the style of the scan animation -->
    <svg viewBox="0 0 1140 460" class="city" :class="{ on: step >= 2 }">
      <rect width="1140" height="460" rx="16" fill="url(#wd-dots)" />
      <defs>
        <pattern id="wd-dots" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.1" fill="#2a2a2a" /></pattern>
      </defs>
      <path v-for="y in STREETS_H" :key="'h' + y" :d="`M 0 ${y} H 1140`" stroke="#222" stroke-width="16" />
      <path v-for="x in STREETS_V" :key="'v' + x" :d="`M ${x} 0 V 460`" stroke="#222" stroke-width="16" />
      <path :d="ROUTE" stroke="#4ea8ff" stroke-width="3" fill="none" pathLength="1" stroke-dasharray="1" class="trail" />
      <g v-for="(d, i) in DEVICES" :key="i" :transform="`translate(${d.x} ${d.y})`">
        <g class="dev" :style="{ animationDelay: `${d.t}s` }">
          <circle r="16" fill="#1c1c1c" stroke="#9dd0ff" stroke-width="1.5" />
          <text y="6" text-anchor="middle" class="q">?</text>
        </g>
      </g>
    </svg>

    <!-- the car drives the route; Nishant and the phone ride in it -->
    <div class="carlayer">
    <div class="car" :class="{ on: step >= 2 }" :style="{ offsetPath: `path('${ROUTE}')` }">
      <div class="body">
        <img src="/people/nishant.jpg" class="driver" />
        <div class="mini-phone"><img src="/shots/wigle.jpg" /></div>
      </div>
      <div class="wheel l" /><div class="wheel r" />
    </div>
    </div>

    <!-- intro: Aaron sends Nishant out with a phone -->
    <div class="intro" :class="{ off: step >= 2 }">
      <div class="person">
        <img src="/people/aaron.jpg" class="face" />
        <div class="name">Aaron</div>
        <div class="bubble" :class="{ on: step >= 1 }">go scan!</div>
      </div>
      <div class="arrow" :class="{ on: step >= 1 }">→</div>
      <div class="person">
        <img src="/people/nishant.jpg" class="face" />
        <div class="name">Nishant</div>
      </div>
      <div class="phone" :class="{ on: step >= 1 }"><img src="/shots/wigle.jpg" /><div class="label">WiGLE</div></div>
    </div>
  </div>
</template>

<style scoped>
.stage { position: relative; width: 900px; height: 363px; margin: 0 auto; }
.city { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; transition: opacity .8s; }
.city.on { opacity: 1; }
.trail { stroke-dashoffset: 1; }
.city.on .trail { animation: draw 9s linear forwards; }
.dev { opacity: 0; transform: scale(.3); transform-box: fill-box; transform-origin: center; }
.city.on .dev { animation: pop .5s ease-out forwards; }
.q { font: 700 18px Inter, system-ui, sans-serif; fill: #9dd0ff; }

.carlayer { position: absolute; left: 0; top: 0; width: 1140px; height: 460px; transform: scale(0.7895); transform-origin: 0 0; }
.car { position: absolute; left: 0; top: 0; width: 0; height: 0; opacity: 0; offset-rotate: 0deg; offset-distance: 0%; }
.car.on { opacity: 1; animation: drive 9s linear forwards; transition: opacity .4s .6s; }
.body { position: absolute; left: -60px; top: -34px; width: 120px; height: 56px; border-radius: 16px 22px 10px 10px; background: #e5e7eb; border: 3px solid #fff; box-shadow: 0 4px 14px rgba(0,0,0,.6); display: flex; align-items: center; justify-content: space-between; padding: 0 6px; }
.driver { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; object-position: 50% 20%; border: 2px solid #4ea8ff; }
.mini-phone { width: 28px; height: 46px; border-radius: 4px; border: 2px solid #111; overflow: hidden; background: #000; }
.mini-phone img { width: 100%; height: 100%; object-fit: cover; }
.wheel { position: absolute; top: 14px; width: 16px; height: 16px; border-radius: 50%; background: #111; border: 3px solid #555; }
.wheel.l { left: -44px; } .wheel.r { left: 26px; }

.intro { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; gap: 40px; transition: opacity .6s, transform .6s; }
.intro.off { opacity: 0; transform: scale(.85); pointer-events: none; }
.person { position: relative; text-align: center; }
.face { width: 180px; height: 180px; border-radius: 50%; object-fit: cover; object-position: 50% 18%; border: 3px solid #4ea8ff; }
.name { font: 500 26px Inter, system-ui, sans-serif; margin-top: 10px; }
.bubble { position: absolute; top: -34px; right: -70px; background: #fff; color: #111; font: 600 22px Inter, system-ui, sans-serif; padding: 6px 14px; border-radius: 14px; opacity: 0; transform: scale(.6); transition: all .4s; }
.bubble.on { opacity: 1; transform: none; }
.arrow { font-size: 48px; color: #9dd0ff; opacity: 0; transition: opacity .4s .2s; }
.arrow.on { opacity: 1; }
.phone { width: 120px; height: 220px; border-radius: 18px; border: 4px solid #3a3a3a; background: #000; overflow: hidden; position: relative; opacity: 0; transform: translateX(40px) rotate(8deg); transition: all .6s .3s; }
.phone.on { opacity: 1; transform: rotate(-4deg); }
.phone img { width: 100%; height: 100%; object-fit: cover; object-position: 30% 50%; }
.phone .label { position: absolute; top: 0; left: 0; right: 0; background: rgba(0,0,0,.7); font: 600 14px Inter, system-ui, sans-serif; color: #fff; padding: 4px; }

@keyframes drive { from { offset-distance: 0%; } to { offset-distance: 100%; } }
@keyframes draw { to { stroke-dashoffset: 0; } }
@keyframes pop { to { opacity: 1; transform: scale(1); } }
</style>
