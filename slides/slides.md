---
title: Toward a Continuous, Ecosystem-Scale Bluetooth Security Observatory
colorSchema: dark
transition: fade
mdc: true
---

# Toward a Continuous, Ecosystem-Scale<br>Bluetooth Security Observatory

<div class="text-2xl mt-8">Yibo Wei</div>
<div class="text-lg mt-2 opacity-60">UC San Diego · CNS 2026</div>
<div class="text-lg mt-6" style="color:#fbbf24">preliminary work, in progress</div>

---
layout: center
class: text-center
---

# Ever wondered what all these are?

<div class="text-3xl mt-10 opacity-70">open your Bluetooth settings</div>

---
---

# That's not the whole story

<div class="flex items-center gap-16 mt-6">
<img src="/shots/nrf-connect.jpg" class="rounded-2xl" style="height: 430px; border: 3px solid #3a3a3a" />
  <div class="text-left flex flex-col gap-8">
    <div v-click><div class="text-4xl font-bold" style="font-family: ui-monospace, monospace; color:#9dd0ff">0x004C = Apple</div><div class="text-xl mt-2 opacity-70">Find My, AirDrop, …</div></div>
    <div v-click><div class="text-4xl font-bold">68%</div><div class="text-xl mt-2 opacity-70">of what we hear is Apple</div></div>
    <div v-click><div class="text-4xl font-bold">91%</div><div class="text-xl mt-2 opacity-70">have no name at all</div></div>
  </div>
</div>

---
layout: center
class: text-center
---

# What is all this Bluetooth doing?

<div v-click class="text-4xl mt-10">nobody really knows</div>

---
layout: center
class: text-center
---

# Why should you care?

---
layout: center
class: text-center
hide: true
---

# Let me tell you a story

<div class="text-3xl mt-8 opacity-80">how BLE security research used to be done at UCSD</div>

<div v-click class="text-2xl opacity-60 mt-6">(a documentary)</div>

---
clicks: 1
---

# This is Nishant, our former PhD student

<div class="flex items-center justify-center gap-6 mt-4">
  <Wardrive :step="$clicks" />
  <PhoneScan :active="$clicks >= 1" :delay="0.3" :stagger="0.5" :rows="[{ n: 'Oral-B', s: 4 }, { n: 'Unknown', s: 2 }, { n: 'Tile', s: 3 }, { n: 'Ember Mug', s: 3 }, { n: 'MyQ-XXX', s: 2 }, { n: 'Unknown', s: 1 }, { n: 'GO Plus', s: 4 }, { n: 'OBDII', s: 3 }, { n: 'Haiku XXXX', s: 2 }, { n: 'Unknown', s: 2 }]" />
</div>

---
layout: center
class: text-center
---

# Find out what's out there

<div class="grid grid-cols-[1fr_1.4fr] gap-6 mt-6 items-center">
  <img src="/shots/skimmer-tape.jpg" class="rounded-lg w-full" style="border: 1px solid #333" />
  <img src="/shots/skimmer-board.jpg" class="rounded-lg w-full" style="border: 1px solid #333" />
</div>

<div v-click class="text-4xl mt-6" style="color:#f87171">a gas pump card <strong>skimmer</strong></div>
<div v-click class="text-3xl mt-3">over Bluetooth: no trip back for the data, no getting caught</div>
<div class="text-lg mt-2 opacity-60">Please Pay Inside, USENIX Security '19</div>

---
layout: center
class: text-center
clicks: 2
---

# Research

<Eureka :step="$clicks" class="mt-4" />

---
layout: center
class: text-center
---

# We kept seeing "QT"

<div class="flex justify-center items-center gap-16 mt-4">
  <PhoneScan />
  <div v-click class="text-6xl font-bold">what is<br><span style="color:#9dd0ff; font-family: ui-monospace, monospace">QT</span>?</div>
</div>

---
layout: center
class: text-center
---

# So what is QT?

<img src="/shots/google-what-is-qt.jpg" class="mx-auto mt-4 rounded-lg" style="height: 420px; border: 1px solid #333" />

---
clicks: 3
---

# Internet devices: Censys scans for us

<ShotTour :step="$clicks" src="/shots/censys-search.jpg" :iw="1600" :ih="913" :width="720" class="mt-6" :stops="[
  {},
  { x: 560, y: 90, s: 2.2, boxes: [{ x0: 405, y0: 54, x1: 700, y1: 82 }], caption: 'search: one product' },
  { x: 820, y: 200, s: 2.2, boxes: [{ x0: 698, y0: 168, x1: 826, y1: 189 }], caption: '825,171 hosts' },
  { x: 900, y: 780, s: 1.8, boxes: [{ x0: 718, y0: 709, x1: 856, y1: 734 }, { x0: 836, y0: 756, x1: 970, y1: 780 }, { x0: 740, y0: 834, x1: 1052, y1: 859 }], caption: 'what it runs', captionTop: true },
]" />

---
clicks: 2
hide: true
---

# For the Internet, there's Censys

<div class="text-2xl mt-2 opacity-90"><span style="color:#9dd0ff">Look up a device</span> → find out what it is</div>

<ShotTour :step="$clicks" src="/shots/censys-host.jpg" :iw="1600" :ih="913" class="mt-3" :stops="[
  {},
  { x: 560, y: 240, s: 2, boxes: [{ x0: 384, y0: 136, x1: 522, y1: 160 }, { x0: 440, y0: 332, x1: 752, y1: 357 }], caption: 'tags and open services' },
  { x: 520, y: 820, s: 2.2, boxes: [{ x0: 440, y0: 805, x1: 570, y1: 826 }], caption: 'software, from its own banner' },
]" />

---
clicks: 2
---

# Bluetooth devices: WiGLE

<ShotTour :step="$clicks" src="/shots/wigle-qt-search.jpg" :iw="2968" :ih="2026" :width="660" class="mt-4" :stops="[
  {},
  { x: 290, y: 520, s: 2.6, boxes: [{ x0: 33, y0: 611, x1: 398, y1: 665 }], caption: 'search: name QT %' },
  { x: 1113, y: 300, s: 2.4, boxes: [{ x0: 757, y0: 108, x1: 1475, y1: 186 }], caption: 'a name, a place, a date' },
]" />

---
layout: center
class: text-center
---

# The closest: wireless intrusion detection

<img src="/shots/bastille-home.jpg" class="mx-auto mt-4 rounded-lg" style="height: 300px; border: 1px solid #333" />

<div v-click class="text-3xl mt-8">flags <strong>suspicious devices</strong> in your own building</div>

---
hide: true
---

# So we did it by hand

<v-clicks>

1. Read the advertisement
2. Look up the MAC prefix and the company ID
3. Find its FCC filing and user manual
4. Get the app and take it apart
5. Find out what it does, and whether it's secure

</v-clicks>

<style>
.slidev-layout ol { font-size: 1.6rem; line-height: 1.5; margin-top: 2.5rem; }
.slidev-layout li { margin-bottom: 1rem; }
</style>

---
layout: center
class: text-center
---

# All we have: one advertisement

<div class="mx-auto mt-4 text-left" style="width: 900px">
  <div class="text-3xl font-bold" style="font-family: ui-monospace, monospace; font-variant-ligatures: none">QT 8B1<span style="opacity:.35">XXXXX</span></div>
  <div class="text-xl mt-1 opacity-70" style="font-family: ui-monospace, monospace; font-variant-ligatures: none">40:84:32<span style="opacity:.45">:XX:XX:XX</span></div>
  <div class="grid grid-cols-[60px_90px_340px_1fr] gap-y-3 mt-6 text-xl" style="font-family: ui-monospace, monospace; font-variant-ligatures: none">
    <div class="opacity-60">Len</div><div class="opacity-60">Type</div><div></div><div class="opacity-60">Data</div>
    <div>11</div><div>0x09</div><div class="opacity-70">Complete Local Name</div><div>QT 8B1<span style="opacity:.35">XXXXX</span></div>
    <div>2</div><div>0x01</div><div class="opacity-70">Flags</div><div>06</div>
    <div>7</div><div>0xFF</div><div class="opacity-70">Manufacturer Specific Data</div><div><span style="color:#9dd0ff">76 31</span> 31 73 34 e8</div>
  </div>
</div>

---
layout: center
class: text-center
clicks: 1
---

# The MAC address prefix

<img v-if="$clicks < 1" src="/shots/oui-lookup-408432.jpg" class="mx-auto mt-4 rounded-lg" style="height: 340px; border: 1px solid #333" />
<img v-else src="/shots/microchip-products.jpg" class="mx-auto mt-4 rounded-lg" style="height: 340px; border: 1px solid #333" />

<div v-click class="text-3xl mt-6 opacity-80">a chip maker, not a product</div>

---
layout: center
class: text-center
---

# The manufacturer ID

<div class="grid grid-cols-[auto_auto_auto] gap-x-10 gap-y-3 mt-8 mx-auto w-fit text-3xl text-left" style=" font-family: ui-monospace, monospace; font-variant-ligatures: none">
  <div style="color:#9dd0ff">0x3176</div><div class="opacity-50">→</div><div>?</div>
  <div style="color:#9dd0ff">0x3978</div><div class="opacity-50">→</div><div>?</div>
  <div style="color:#9dd0ff">0x3670</div><div class="opacity-50">→</div><div>?</div>
  <div style="color:#9dd0ff">0x3970</div><div class="opacity-50">→</div><div>?</div>
  <div style="color:#9dd0ff">0x3875</div><div class="opacity-50">→</div><div>?</div>
</div>

---
layout: center
class: text-center
clicks: 4
---

# Bluetooth SIG company IDs

<SigPdfZoom :step="$clicks" class="mx-auto mt-2" />

---
layout: center
class: text-center
clicks: 2
---

# Luckily: wireless devices sold in the US need an FCC ID

<ShotZoom :step="$clicks" src="/shots/ecfr-2925-page.jpg" :iw="1585" :ih="840"
  :zoom="{ x: 880, y: 630, s: 2 }"
  :lines="[{ x0: 561, x1: 1228, y: 706 }, { x0: 592, x1: 1217, y: 759 }, { x0: 593, x1: 1216, y: 781 }]"
  class="mx-auto mt-6" />

---
layout: center
class: text-center
clicks: 1
---

<ShotZoom :step="$clicks" src="/shots/google-qt-fcc.jpg" :iw="1200" :ih="806" :width="760"
  :zoom="{ x: 494, y: 572, s: 2.15 }" :lines="[]" class="mx-auto" />

---
layout: center
class: text-center
---

# An FCC filing

<img src="/shots/fccid-qt.jpg" class="mx-auto mt-6 rounded-lg" style="height: 400px; border: 1px solid #333" />

---
layout: center
class: text-center
clicks: 5
---

# Its user manual

<ManualZoom :step="$clicks" class="mx-auto mt-2" />

---
layout: center
class: text-center
---

<img src="/shots/play-karr-security.jpg" class="mx-auto rounded-lg" style="width: 860px; border: 1px solid #333" />

---
layout: center
class: text-center
---

# So we took the app apart

```python {*|2|2}
# manufacturer data, simplified
color   = parse_int(manufacturer_data[0:2])
mode    = parse_int(manufacturer_data[2:4])
armed   = parse_int(manufacturer_data[3:4])
battery = parse_int(manufacturer_data[5:6])

# challenge-response, simplified; keys redacted
DEALER_KEY = "████████████"  # hard-coded
USER_KEY   = "████████████"  # hard-coded
if mode == Mode.DEALER:
    key = DEALER_KEY
else:
    key = USER_KEY
response = hash(challenge, name, key)
```

<img v-click="2" src="/shots/facepalm.gif" class="absolute" style="right: 40px; top: 120px; width: 280px; border: 1px solid #333" />
<div v-click="2" class="absolute text-left" style="left: 640px; top: 350px; width: 300px; font-size: 1.35rem; color: #f87171">This is supposed to be<br>the manufacturer ID</div>
<Arrow v-click="2" x1="636" y1="358" x2="508" y2="152" color="#f87171" width="3" />

<style>
.slidev-code { font-size: 1.15rem !important; line-height: 1.6 !important; text-align: left; width: 860px; margin-left: auto; margin-right: auto; }
</style>

---
layout: center
---

# Who can open which car?

```python
# access control, simplified
devices = scan()                     # every KARR module nearby
my_cars = api.get_my_vehicles(user)  # from the vendor's server
for device in devices:
    if device.name in my_cars:
        allow_access(device)
```

<style>
.slidev-code { font-size: 1.3rem !important; line-height: 1.7 !important; text-align: left; width: 860px; margin-left: auto; margin-right: auto; }
</style>

---
clicks: 1
---

# Does it work on a real car?

<div class="flex items-center justify-center gap-8 mt-4">
  <img src="/shots/qtclient-vscode.jpg" style="width: 600px" />
  <img v-click src="/shots/slack-car-unlocked.jpg" style="height: 400px" />
</div>

---
clicks: 2
---

# How many cars?

<div class="formulas mt-4" :class="{ dim: $clicks >= 1 }">

$$P(X = k) = (1 - p)^{k-1} p, \quad p = \frac{n}{N}, \quad P(X = 1) = p \approx \frac{\mathrm{count}(\Delta = 1)}{n-1}$$

$$N = \frac{n}{P(X=1)} \approx \frac{n}{\mathrm{count}(\Delta = 1) / (n-1)}, \qquad \log f(k) = \beta_0 + \beta_1 k, \; R^2 > 0.9$$

$$N_{\mathrm{QT}} \approx \frac{1{,}141{,}798}{583{,}392 / 1{,}141{,}797} \approx 2{,}234{,}692 \qquad N_{\mathrm{DR}} \approx \frac{246{,}512}{98{,}219 / 246{,}511} \approx 618{,}698$$

$$N_{\mathrm{KARR}} \approx N_{\mathrm{QT}} + N_{\mathrm{DR}} \approx 2{,}234{,}692 + 618{,}698 \approx 2{,}853{,}390$$

</div>

<div class="flex justify-center gap-12 mt-10 text-2xl whitespace-nowrap">
  <div v-click="2">✓ checked in <strong>Lean</strong> (by Claude and GPT)</div>
</div>

<div v-click="1" class="absolute text-5xl" style="left: 0; right: 0; top: 180px; text-align: center; color: #fbbf24; text-shadow: 0 0 24px #121212, 0 0 12px #121212">(nobody can read this)</div>

<style>
.formulas { font-size: 0.9rem; transition: opacity .5s; }
.formulas .katex-display { margin: 0.4em 0; }
.formulas.dim { opacity: .25; }
</style>

---
clicks: 5
---

# How many cars?

<MacDensity :step="$clicks" class="mt-8" />

<div class="text-center mt-8">
  <div v-click="3" class="text-2xl whitespace-nowrap">Rivian: we estimate
    <strong v-if="$clicks < 4">603,468</strong><strong v-else style="color:#4ade80">603,468 ÷ 4 = 150,867</strong>
    · Rivian reported <strong>146,659</strong>
    <span v-if="$clicks < 4" style="color:#fbbf24">?!</span><span v-else style="color:#4ade80">(2.9% off)</span></div>
  <div v-click="4" class="text-xl mt-2" style="color:#4ade80">each Rivian has 4 BLE sensors</div>
  <div v-click="5" class="text-4xl font-bold mt-4 whitespace-nowrap" style="color:#f87171">KARR: 2.8 million</div>
</div>

---
layout: center
---

# First submission: one product. The reviews:

<div v-click class="mx-auto mt-10 text-left" style="max-width: 760px">
  <div class="text-xl opacity-60">Reviewer #2</div>
  <div class="text-4xl mt-4 leading-snug">"Only one vulnerability.<br><span v-mark.red="2">Lacks scientific novelty.</span>"</div>
  <div class="text-lg opacity-50 mt-6">(paraphrased)</div>
</div>

---
layout: center
class: text-center
---

# So we did it 6 times.

<div class="flex justify-center gap-10 mt-8">
  <div v-click="1" class="flex flex-col items-center">
    <img src="/logos/karr.png" style="width: 80px; height: 80px; border-radius: 18px" />
    <div class="text-2xl font-bold mt-3" :style="{ color: $clicks >= 7 ? '#f87171' : '#9dd0ff' }">KARR</div>
  </div>
  <div v-click="2" class="flex flex-col items-center">
    <img src="/logos/carlink.png" style="width: 80px; height: 80px; border-radius: 18px" />
    <div class="text-2xl font-bold mt-3" :style="{ color: $clicks >= 7 ? '#f87171' : '#9dd0ff' }">CarLink</div>
  </div>
  <div v-click="3" class="flex flex-col items-center">
    <img src="/logos/ds4.png" style="width: 80px; height: 80px; border-radius: 18px" />
    <div class="text-2xl font-bold mt-3" :style="{ color: '#9dd0ff' }">DS4</div>
  </div>
  <div v-click="4" class="flex flex-col items-center">
    <img src="/logos/evostart.png" style="width: 80px; height: 80px; border-radius: 18px" />
    <div class="text-2xl font-bold mt-3" :style="{ color: '#9dd0ff' }">EvoStart</div>
  </div>
  <div v-click="5" class="flex flex-col items-center">
    <img src="/logos/rockledge.png" style="width: 80px; height: 80px; border-radius: 18px" />
    <div class="text-2xl font-bold mt-3" :style="{ color: $clicks >= 7 ? '#f87171' : '#9dd0ff' }">Rockledge</div>
  </div>
  <div v-click="6" class="flex flex-col items-center">
    <img src="/logos/linkr.png" style="width: 80px; height: 80px; border-radius: 18px" />
    <div class="text-2xl font-bold mt-3" :style="{ color: '#9dd0ff' }">Linkr</div>
  </div>
</div>

<div class="flex justify-center items-center gap-14 mt-6">
  <div>
    <div v-click="7" class="text-2xl" style="color:#f87171">3 critically vulnerable</div>
    <div v-click="8" class="text-2xl mt-2" style="color:#f87171">over 2 million vehicles exposed (est.)</div>
    <div v-click="9" class="text-4xl mt-6 font-bold" style="color:#4ade80">USENIX: accept</div>
  </div>
  <img v-click="9" src="/shots/ble-theft-auto-p1.jpg" style="height: 250px; border: 1px solid #333" />
</div>

---
---

# Everyone rolled their own auth

<div class="grid grid-cols-[180px_1fr] gap-x-8 gap-y-7 mt-10 text-2xl">
  <div v-click class="font-bold" style="color:#f87171">KARR</div>
  <div v-after>Same two hard-coded keys unlock every module</div>
  <div v-click class="font-bold" style="color:#f87171">CarLink</div>
  <div v-after>Anyone nearby can pair; AES key from sniffable values</div>
  <div v-click class="font-bold" style="color:#f87171">Rockledge</div>
  <div v-after>Credentials derivable from its own advertisements</div>
</div>

---
hide: true
---

# Takeaways

<v-clicks>

- BLE pairing doesn't fit many phones per car → vendors roll their own
- Home-made protocols misuse crypto
- No over-the-air updates → N-days stay forever
- Vulnerable cars travel: US systems found on other continents

</v-clicks>

<style>
.slidev-layout ul { font-size: 1.6rem; line-height: 1.5; margin-top: 2.5rem; }
.slidev-layout li { margin-bottom: 1.2rem; }
</style>

---
clicks: 4
---

# How we did it: by hand

<PipelineMap :step="$clicks" manual class="mt-4" />

---
---

# We need systematic security measurement

<v-clicks>

- BLE devices have real-world impact: cars, locks, medical devices
- Weak devices have been deployed at scale for years, never audited
- AI makes reverse engineering far cheaper, for us and for attackers

</v-clicks>

<style>
.slidev-layout ul { font-size: 1.6rem; line-height: 1.5; margin-top: 2.5rem; }
.slidev-layout li { margin-bottom: 1.2rem; }
</style>

---
layout: full
---

<div class="absolute inset-0 flex items-center justify-center" style="background:#121212">
  <img src="/shots/wired-karr.jpg" style="width: 100%; max-height: 100%; object-fit: contain" />
</div>

---
layout: full
---

<div class="absolute inset-0 flex items-center justify-center" style="background:#121212">
  <img src="/defcon/karr-talk-stage.jpg" style="height: 100%; max-width: none" />
</div>

---
layout: full
---

<div class="absolute inset-0 flex items-center justify-center" style="background:#121212">
  <img src="/defcon/team-selfie.jpg" style="height: 100%; max-width: none" />
</div>

---
hide: true
---

# The obvious next paper

<div class="grid grid-cols-2 gap-10 mt-2">
  <div class="flex flex-col items-center">
    <div class="paper">
      <div class="venue">Proceedings of Every Security Conference, 2026</div>
      <div class="ptitle">AutoBLE: LLM Agents Autonomously Discover Every BLE Vulnerability</div>
      <div class="authors">Yet Another Agent, Another Agent, A. Gent</div>
      <div class="abstract"><span v-for="w in [96, 100, 92, 99, 88, 97, 70]" :key="w" :style="{ width: w + '%' }" /></div>
      <div class="fig">Figure 1: our agent found a bug</div>
    </div>
    <div class="text-2xl mt-4 opacity-80">what we could write</div>
  </div>
  <div v-click class="flex flex-col items-center">
    <div style="width: 290px; height: 300px"><ToiletRoll /></div>
    <div class="text-2xl mt-4 opacity-80">what's already out there</div>
  </div>
</div>

<style>
.paper { width: 290px; height: 300px; background: #f4f1ea; color: #222; padding: 18px; border-radius: 4px; font-family: Georgia, serif; display: flex; flex-direction: column; gap: 10px; }
.venue { font-size: 10px; color: #777; text-align: center; }
.ptitle { font-size: 19px; font-weight: 700; text-align: center; line-height: 1.25; }
.authors { font-size: 12px; text-align: center; font-style: italic; }
.abstract { display: flex; flex-direction: column; gap: 6px; margin-top: 6px; }
.abstract span { height: 7px; background: #c9c3b6; border-radius: 2px; }
.fig { margin-top: auto; font-size: 11px; text-align: center; color: #666; border-top: 1px solid #ccc; padding-top: 8px; }
</style>

---
layout: full
clicks: 1
---

<div class="absolute inset-0 overflow-hidden flex items-center justify-center" style="background:#121212">
  <img src="/defcon/group.jpg" style="height: 100%; max-width: none; transform-origin: 30.4% 22.3%; transition: transform 1.8s cubic-bezier(0.65, 0, 0.35, 1)"
    :style="{ transform: $clicks >= 1 ? 'translate(19.6%, 27.7%) scale(5)' : 'none' }" />
</div>

---
layout: full
clicks: 1
---

<div class="absolute inset-0 overflow-hidden flex items-center justify-center" style="background:#121212">
  <img src="/defcon/talk.jpg" style="height: 100%; max-width: none; transform-origin: 32.5% 44%; transition: transform 1.8s cubic-bezier(0.65, 0, 0.35, 1)"
    :style="{ transform: $clicks >= 1 ? 'translate(17.5%, 6%) scale(3.7)' : 'none' }" />
</div>

---
layout: full
---

<div class="absolute inset-0 flex items-center justify-center" style="background:#121212">
  <img src="/defcon/repro.jpg" style="height: 100%; max-width: none" />
</div>

---
layout: center
class: text-center
hide: true
---

# The Internet's common assumption

<div v-click class="text-5xl mt-10 font-bold leading-tight">"if you're hackable,<br>you <span v-mark.green="1">will</span> be hacked"</div>

---
hide: true
---

# Bluetooth's common assumption

<StreetDevices class="mt-10" />

<div v-click class="text-5xl text-center mt-12 font-bold">"nobody will notice"</div>

---
layout: center
class: text-center
hide: true
---

# We want a <span style="color:#9dd0ff">Censys</span> for Bluetooth

---
layout: center
class: text-center
clicks: 1
---

<ScaleUp :step="$clicks" />

---
clicks: 2
---

# The goal: scan, and know what it is

<LensApp :step="$clicks" class="mt-2" />

---
clicks: 3
---

# Discover, attribute, remember, audit

<PipelineMap :step="$clicks" class="mt-4" />

---
---

# The apps tell us what's out there

<v-clicks>

- **What** devices are being scanned for
- **How** they are scanned for: names, UUIDs, company IDs
- **What's wrong** with them: how they authenticate

</v-clicks>

<div v-click class="text-2xl mt-10" style="color:#a78bfa">AI agents reverse-engineer the APKs automatically</div>

<style>
.slidev-layout ul { font-size: 1.6rem; line-height: 1.5; margin-top: 2.5rem; }
.slidev-layout li { margin-bottom: 1.2rem; }
</style>

---
layout: center
class: text-center
clicks: 4
---

# Our own scanner

<div class="mx-auto mt-2 overflow-hidden flex items-center justify-center" style="width: 880px; height: 440px">
  <img src="/shots/our-scanner.jpg" class="rounded-2xl" style="height: 440px; max-width: none; border: 3px solid #3a3a3a; transition: transform 1.2s cubic-bezier(0.65, 0, 0.35, 1), transform-origin 1.2s cubic-bezier(0.65, 0, 0.35, 1)"
    :style="(([fx, fy, z]) => ({ transformOrigin: `${fx * 100}% ${fy * 100}%`, transform: `translate(${(0.5 - fx) * 100}%, ${(0.5 - fy) * 100}%) scale(${z})` }))([[0.5,0.5,1],[0.5,0.225,2.3],[0.36,0.48,3],[0.5,0.63,2.5],[0.5,0.86,2.5]][Math.min($clicks, 4)])" />
</div>

---
---

# Why build our own scanner?

| | WiGLE | Our scanner |
|---|---|---|
| Coverage | <span style="color:#4ade80">worldwide, crowdsourced</span> | only where we go |
| What it keeps | name, location, time, company ID | <span style="color:#4ade80">the full raw advertisement</span> |
| Unnamed devices (91%) | <span style="color:#f87171">only MAC and company ID</span> | <span style="color:#4ade80">every byte they broadcast</span> |
| Queries | name search through an API | <span style="color:#4ade80">SQL over everything</span> |

<div v-click class="text-2xl mt-8">WiGLE tells us <strong>where</strong>; our scanner tells us <strong>what</strong></div>

<style>
.slidev-layout table { font-size: 1.3rem; margin-top: 1.5rem; width: 100%; }
.slidev-layout td, .slidev-layout th { padding: 0.75rem 1.1rem; white-space: nowrap; }
.slidev-layout td:first-child { color: #aaa; }
</style>

---
layout: center
---

# Scan

<SlidevVideo autoplay class="mx-auto rounded-lg mt-2" style="height: 420px">
  <source src="/anim/01-scan.mp4" type="video/mp4" />
</SlidevVideo>

---
layout: center
---

# What's inside an advertisement

<SlidevVideo autoplay class="mx-auto rounded-lg mt-2" style="height: 420px">
  <source src="/anim/02-parse.mp4" type="video/mp4" />
</SlidevVideo>

---
hide: true
---

# How do we classify all these advertisements?

<div class="text-2xl opacity-70 mt-4">group them by one field?</div>

<div class="grid grid-cols-[300px_1fr] gap-x-8 gap-y-4 mt-5 items-center text-3xl">
  <template v-for="(r, i) in [
    { f: 'the name?', why: 'often missing, generic, or renamed' },
    { f: 'manufacturer ID?', why: 'often missing, or widely shared' },
    { f: 'service UUID?', why: 'often missing, or a shared standard' },
    { f: 'MAC OUI?', why: 'usually random' },
    { f: 'GATT profile?', why: 'not broadcast, may not be legal 🙃' },
  ]" :key="i">
    <div v-click="i + 1" class="font-bold">{{ r.f }}</div>
    <div v-click="i + 1" class="opacity-80">{{ r.why }}</div>
  </template>
</div>

---

# Similar devices → similar advertisements

<div class="grid grid-cols-[170px_1fr] gap-x-6 gap-y-2 mt-6 items-center">
  <div v-click="1" class="text-3xl row-span-3 whitespace-nowrap">car</div>
  <AdStrip :tile="10" v-click="1" :parts="[{t:'flags',n:3},{t:'uuid',n:4},{t:'mfg',n:11},{t:'name',n:7}]" label='"VX-22"' />
  <AdStrip :tile="10" v-click="1" :parts="[{t:'flags',n:3},{t:'uuid',n:4},{t:'mfg',n:11},{t:'name',n:9}]" label='"VX-1A7F"' />
  <AdStrip :tile="10" v-click="1" :parts="[{t:'flags',n:3},{t:'uuid',n:4},{t:'mfg',n:11},{t:'name',n:6}]" label='"VX-9"' />

  <div v-click="2" class="text-3xl row-span-3 mt-3 whitespace-nowrap">watch</div>
  <AdStrip :tile="10" v-click="2" class="mt-3" :parts="[{t:'flags',n:3},{t:'uuid',n:4},{t:'name',n:6}]" label='"W-4F"' />
  <AdStrip :tile="10" v-click="2" :parts="[{t:'flags',n:3},{t:'uuid',n:4},{t:'name',n:9}]" label='"W-4F1C2"' />
  <AdStrip :tile="10" v-click="2" :parts="[{t:'flags',n:3},{t:'uuid',n:4},{t:'name',n:5}]" label='"W-7"' />

  <div v-click="3" class="text-3xl row-span-3 mt-3 whitespace-nowrap">tracker</div>
  <AdStrip :tile="10" v-click="3" class="mt-3" :parts="[{t:'flags',n:3},{t:'uuid',n:4},{t:'svc',n:12}]" />
  <AdStrip :tile="10" v-click="3" :parts="[{t:'flags',n:3},{t:'uuid',n:4},{t:'svc',n:12}]" />
  <AdStrip :tile="10" v-click="3" :parts="[{t:'flags',n:3},{t:'uuid',n:4},{t:'svc',n:12}]" />
</div>

---
layout: center
---

# Every product looks different

<SlidevVideo autoplay class="mx-auto rounded-lg mt-2" style="height: 420px">
  <source src="/anim/03-pile.mp4" type="video/mp4" />
</SlidevVideo>

---
layout: center
---

# Names are wildcards

<SlidevVideo autoplay class="mx-auto rounded-lg mt-2" style="height: 420px">
  <source src="/anim/04-wildcard.mp4" type="video/mp4" />
</SlidevVideo>

---
layout: center
---

# Same template → same cluster

<SlidevVideo autoplay class="mx-auto rounded-lg mt-2" style="height: 420px">
  <source src="/anim/05-cluster.mp4" type="video/mp4" />
</SlidevVideo>

---
layout: center
---

# Company ID → vendor

<SlidevVideo autoplay class="mx-auto rounded-lg mt-2" style="height: 420px">
  <source src="/anim/06-sig.mp4" type="video/mp4" />
</SlidevVideo>

---
layout: center
---

# Name pattern → app

<SlidevVideo autoplay class="mx-auto rounded-lg mt-2" style="height: 420px">
  <source src="/anim/07-appstore.mp4" type="video/mp4" />
</SlidevVideo>

---
layout: center
---

# The app's code matches

<SlidevVideo autoplay class="mx-auto rounded-lg mt-2" style="height: 420px">
  <source src="/anim/08-decompile.mp4" type="video/mp4" />
</SlidevVideo>

---
layout: center
---

# Check against what we saw

<SlidevVideo autoplay class="mx-auto rounded-lg mt-2" style="height: 420px">
  <source src="/anim/09-validate.mp4" type="video/mp4" />
</SlidevVideo>

---
layout: center
---

# Every cluster, in parallel

<SlidevVideo autoplay class="mx-auto rounded-lg mt-2" style="height: 420px">
  <source src="/anim/10-parallel.mp4" type="video/mp4" />
</SlidevVideo>

---
layout: center
---

# Remember it

<SlidevVideo autoplay class="mx-auto rounded-lg mt-2" style="height: 420px">
  <source src="/anim/11-knowledge.mp4" type="video/mp4" />
</SlidevVideo>

---
layout: center
---

# More data, more clusters

<SlidevVideo autoplay class="mx-auto rounded-lg mt-2" style="height: 420px">
  <source src="/anim/12-scale.mp4" type="video/mp4" />
</SlidevVideo>

---
layout: center
---

# From apps

<SlidevVideo autoplay class="mx-auto rounded-lg mt-2" style="height: 420px">
  <source src="/anim/13-apps.mp4" type="video/mp4" />
</SlidevVideo>

---
layout: center
---

# Validate with WiGLE

<SlidevVideo autoplay class="mx-auto rounded-lg mt-2" style="height: 420px">
  <source src="/anim/14-wigle.mp4" type="video/mp4" />
</SlidevVideo>

---
layout: center
---

# From places

<SlidevVideo autoplay class="mx-auto rounded-lg mt-2" style="height: 420px">
  <source src="/anim/15-hospitals.mp4" type="video/mp4" />
</SlidevVideo>

---
layout: center
---

# What's unusual there?

<SlidevVideo autoplay class="mx-auto rounded-lg mt-2" style="height: 420px">
  <source src="/anim/16-overrep.mp4" type="video/mp4" />
</SlidevVideo>

---
layout: center
---

# One knowledge base

<SlidevVideo autoplay class="mx-auto rounded-lg mt-2" style="height: 420px">
  <source src="/anim/17-converge.mp4" type="video/mp4" />
</SlidevVideo>

---
clicks: 2
---

# Audit: which ones are weak?

<AuditTriage :step="$clicks" class="mt-4" />

---
layout: center
---

# What an entry looks like

```md {1-10|12-18|all}
---
family: karr-module
product: KARR (dealer-installed vehicle module)
vendor: KARR Security
app: KARR Security app
fingerprint:
  name: { regex: "^QT [0-9A-F]{7,8}$" }
  mfr_data: { length: 6 }
confidence: high
---

# KARR module
Dealer-installed car security module, phone-app controlled.
Locks/unlocks doors, arms/disarms the immobilizer.
Broadcasts its name ("QT" + module ID) and mode,
plus 6 bytes of manufacturer data.
Site: [karrsecurity.com](https://karrsecurity.com/)
Android app: `com.whgos.swdscustomerapp`
```

---
layout: center
hide: true
---

# Look it up

<div class="grid grid-cols-[auto_auto_auto] gap-x-6 gap-y-10 mt-10 items-center">
  <AdStrip :tile="8" :parts="[{t:'flags',n:3},{t:'uuid',n:4},{t:'mfg',n:11},{t:'name',n:7}]" label='"VX-22"' />
  <div v-click="1" class="text-2xl opacity-70 whitespace-nowrap">→ knowledge base →</div>
  <div v-click="1" class="text-3xl font-semibold whitespace-nowrap">car module</div>

  <AdStrip v-click="2" :tile="8" :parts="[{t:'flags',n:3},{t:'uuid',n:4},{t:'mfg',n:11},{t:'name',n:6}]" label='"My Car"' />
  <div v-click="3" class="text-2xl opacity-70 whitespace-nowrap">→ knowledge base →</div>
  <div v-click="3" class="text-3xl font-semibold whitespace-nowrap">car module</div>
</div>

---
layout: center
class: text-center
---

# Our knowledge base today

<div class="grid grid-cols-3 gap-10 mt-12 mx-auto" style="width: 900px">
  <div v-click><div class="text-6xl font-bold">12.3M</div><div class="text-2xl mt-3 opacity-70">sightings</div></div>
  <div v-click><div class="text-6xl font-bold" style="color:#9dd0ff">252K</div><div class="text-2xl mt-3 opacity-70">distinct advertisements</div></div>
  <div v-click><div class="text-6xl font-bold" style="color:#4ade80">142</div><div class="text-2xl mt-3 opacity-70">product types identified</div></div>
</div>

<div class="text-lg mt-12 opacity-50">our scans, Jul 2025 to Aug 2026</div>

---
---

# What turned up: Healthcare

<style>
.kb-ex { display: flex; flex-direction: column; padding: 6px 0; border-top: 1px solid #2a2a2a; }
.kb-ex .m { font-family: ui-monospace, monospace; font-variant-ligatures: none; font-size: 1.05rem; color: #eee; }
.kb-ex .d { font-size: 0.95rem; color: #888; }
</style>

<div class="flex items-center gap-12 mt-4">
  <img src="/shots/kb-map-healthcare.jpg" class="rounded-lg" style="height: 420px; border: 1px solid #333" />
  <div class="text-left">
    <div class="text-8xl font-bold" style="color:#f87171">5</div>
    <div class="text-2xl mt-3">identifiable product types</div>
    <div class="mt-6">
      <div class="kb-ex"><span class="m">EmTag</span><span class="d">clinical asset tag</span></div>
      <div class="kb-ex"><span class="m">ResMed*</span><span class="d">CPAP machine</span></div>
      <div class="kb-ex"><span class="m">SoniShield</span><span class="d">cold-chain monitor</span></div>
      <div class="kb-ex"><span class="m">Gozio</span><span class="d">hospital wayfinding</span></div>
    </div>
  </div>
</div>

---
---

# What turned up: Enterprise

<style>
.kb-ex { display: flex; flex-direction: column; padding: 6px 0; border-top: 1px solid #2a2a2a; }
.kb-ex .m { font-family: ui-monospace, monospace; font-variant-ligatures: none; font-size: 1.05rem; color: #eee; }
.kb-ex .d { font-size: 0.95rem; color: #888; }
</style>

<div class="flex items-center gap-12 mt-4">
  <img src="/shots/kb-map-enterprise.jpg" class="rounded-lg" style="height: 420px; border: 1px solid #333" />
  <div class="text-left">
    <div class="text-8xl font-bold" style="color:#fbbf24">32</div>
    <div class="text-2xl mt-3">identifiable product types</div>
    <div class="mt-6">
      <div class="kb-ex"><span class="m">SensorSwitch*</span><span class="d">lighting control</span></div>
      <div class="kb-ex"><span class="m">CAREL</span><span class="d">HVAC control</span></div>
      <div class="kb-ex"><span class="m">PrimexClock</span><span class="d">synced wall clock</span></div>
      <div class="kb-ex"><span class="m">HID Seos</span><span class="d">door reader</span></div>
    </div>
  </div>
</div>

---
---

# What turned up: Vehicles

<style>
.kb-ex { display: flex; flex-direction: column; padding: 6px 0; border-top: 1px solid #2a2a2a; }
.kb-ex .m { font-family: ui-monospace, monospace; font-variant-ligatures: none; font-size: 1.05rem; color: #eee; }
.kb-ex .d { font-size: 0.95rem; color: #888; }
</style>

<div class="flex items-center gap-12 mt-4">
  <img src="/shots/kb-map-vehicles.jpg" class="rounded-lg" style="height: 420px; border: 1px solid #333" />
  <div class="text-left">
    <div class="text-8xl font-bold" style="color:#9dd0ff">26</div>
    <div class="text-2xl mt-3">identifiable product types</div>
    <div class="mt-6">
      <div class="kb-ex"><span class="m">Rivian*</span><span class="d">vehicle phone key</span></div>
      <div class="kb-ex"><span class="m">GM_PEPS_VKM</span><span class="d">GM phone key</span></div>
      <div class="kb-ex"><span class="m">OBDII</span><span class="d">diagnostic adapter</span></div>
      <div class="kb-ex"><span class="m">HarpBT*</span><span class="d">truck ELD</span></div>
    </div>
  </div>
</div>

---
---

# What turned up: Consumer IoT

<style>
.kb-ex { display: flex; flex-direction: column; padding: 6px 0; border-top: 1px solid #2a2a2a; }
.kb-ex .m { font-family: ui-monospace, monospace; font-variant-ligatures: none; font-size: 1.05rem; color: #eee; }
.kb-ex .d { font-size: 0.95rem; color: #888; }
</style>

<div class="flex items-center gap-12 mt-4">
  <img src="/shots/kb-map-consumer.jpg" class="rounded-lg" style="height: 420px; border: 1px solid #333" />
  <div class="text-left">
    <div class="text-8xl font-bold" style="color:#4ade80">79</div>
    <div class="text-2xl mt-3">identifiable product types</div>
    <div class="mt-6">
      <div class="kb-ex"><span class="m">Oral-B</span><span class="d">toothbrush</span></div>
      <div class="kb-ex"><span class="m">Ember*</span><span class="d">smart mug</span></div>
      <div class="kb-ex"><span class="m">Schlage*</span><span class="d">door lock</span></div>
      <div class="kb-ex"><span class="m">MyQ-*</span><span class="d">garage opener</span></div>
    </div>
  </div>
</div>

---
hide: true
---

# Match against known CVEs

<div class="flex flex-col gap-5 mt-10">
  <div v-click class="cve-row">
    <div><div class="p">KARR car alarm module</div><div class="m">QT*</div></div>
    <div class="arrow">→</div>
    <div><a class="hit" href="https://nvd.nist.gov/vuln/detail/CVE-2026-18411" target="_blank">CVE-2026-18411</a><div class="m">is the patch out in the field?</div></div>
  </div>
  <div v-click class="cve-row">
    <div><div class="p">Throttle controller</div><div class="m">Pedal Commander*</div></div>
    <div class="arrow">→</div>
    <div><div class="miss">no known CVE</div><div class="m">audit candidate</div></div>
  </div>
</div>

<style>
.cve-row { display: grid; grid-template-columns: 380px 60px 1fr; align-items: center; padding: 18px 0; border-bottom: 1px solid #2a2a2a; }
.cve-row .p { font-size: 1.6rem; color: #eee; }
.cve-row .m { font-family: ui-monospace, monospace; font-size: 1rem; color: #888; margin-top: 4px; }
.cve-row .arrow { font-size: 1.6rem; color: #888; }
.cve-row .hit { font-family: ui-monospace, monospace; font-size: 1.6rem; color: #f87171; text-decoration: underline; }
.cve-row .miss { font-size: 1.6rem; color: #fbbf24; }
</style>

---
layout: center
hide: true
---

# This one talks to your gas pedal

<div class="text-4xl mt-10 leading-loose">
  <div v-click>tune it from your <strong>phone</strong></div>
  <div v-click>…or switch the <strong>pedal off</strong></div>
</div>

<div v-click class="text-4xl mt-10" style="color:#9dd0ff">what if it's not your phone?</div>

---
hide: true
---

# Found something suspicious?

<v-clicks>

- Form a hypothesis from the app and the advertisements
- Validate it cheaply, without hardware
- Buy the real device
- Confirm on the device itself: the final proof, before disclosure

</v-clicks>

<style>
.slidev-layout ul { font-size: 1.6rem; line-height: 1.5; margin-top: 2.5rem; }
.slidev-layout li { margin-bottom: 1.2rem; }
</style>

---
hide: true
---

# Once BLE is visible, we can measure

<div class="grid grid-cols-2 gap-12 mt-12">
  <div v-click>
    <div class="text-3xl mt-4 font-bold">how many are out there?</div>
    <div class="text-xl mt-2 opacity-70">estimate deployment from what we see</div>
  </div>
  <div v-click>
    <div class="text-3xl mt-4 font-bold">did the fix actually ship?</div>
    <div class="text-xl mt-2 opacity-70">the same device, old advertisement → new advertisement</div>
  </div>
</div>

---
layout: center
class: text-center
---

# Make Bluetooth assume<br>"if you're hackable, you <span v-mark.green="1">will</span> be hacked"

<div v-click class="text-2xl mt-10 opacity-80">so let defenders find it first.</div>

---
layout: center
class: text-center
---

# Thanks! Questions?

<div class="text-2xl mt-8 opacity-80">Yibo Wei</div>
