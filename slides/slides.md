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

<!--
DRAFT v1, content first, theme later. See OUTLINE.md.
Every slide: few, big words. Details go in these notes.
-->

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

<!--
Animation: Nishant (with a phone running WiGLE) on a city map; click: he walks the streets all over the map and signals pop up wherever he goes. The phone on the right fills with the names they picked up (examples of name formats from our wiki; the phone is a mock, not a screenshot). Schematic, not real data.
Say: they drove around with WiGLE, everywhere, and kept going "ooh… what's that?"
Photos: Aaron from his UCSD homepage (cseweb.ucsd.edu/~schulman), Nishant from cseweb.ucsd.edu/~nibhaska.
WiGLE: a crowdsourced wardriving database of Wi-Fi, cell and Bluetooth sightings with locations, collected by volunteers' phones.
Tone: affectionate. They did the hard, curious work; the joke is about scale, not about them.
-->

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

<!--
People use Bluetooth for very unexpected things, and someone has to find the really unexpected ones. Example: the gas pump skimmer, real photos from the paper: Figure 1 an internal Bluetooth skimmer wrapped in grey tubing to blend in with the cabling inside the fuel pump (detected by Bluetana in Tempe, AZ), Figure 2 the board of a skimmer recovered from a fuel station in Southern California.
Not from our scans but from Nishant's published paper (he is on the Step 1 slide): Bhaskar, Bland, Levchenko, Schulman, "Please Pay Inside: Evaluating Bluetooth-based Detection of Gas Pump Skimmers", USENIX Security 2019. They built the Bluetana app for inspectors. A perfect example of "a grad student dug in". Figures reproduced from the paper; keep the citation on screen.
Numbers only if asked: Bluetooth scans at 1,185 gas stations in six states; 64 Bluetooth skimmers found in four states, all recovered by law enforcement.
Next: Step 3, the manual research on one device.
-->

---
layout: center
class: text-center
clicks: 2
---

# Research

<Eureka :step="$clicks" class="mt-4" />

<!--
Animation: Nishant thinking (spinning loader, AI-app style "Thinking… / Working…" status); click: a light bulb, "Got it!" and "Thought for 2 years" (the joke: it looks like an AI agent calling tools, but it is a human PhD student, pre-AI; verify the duration before the talk); click: the first page of the paper (Please Pay Inside, USENIX Security 2019).
Step 3 is the slow, manual part: pick one interesting device, buy it, open it up, read its app and firmware, and find out what it really does; for Nishant that became the skimmer paper. One device at a time, by one person. That is where the old way stops scaling.
Leads into the next slide: one of them, a grad student dug into.
-->

---
layout: center
class: text-center
---

# We kept seeing "QT"

<div class="flex justify-center items-center gap-16 mt-4">
  <PhoneScan />
  <div v-click class="text-6xl font-bold">what is<br><span style="color:#9dd0ff; font-family: ui-monospace, monospace">QT</span>?</div>
</div>

<!--
It will be good if there's a place I can go to just to figure out what QT is
Callback to the opening demo: this is the same question, "what is this device?", for one name we kept seeing everywhere.
Say: wouldn't it be nice to have a tool where I type in a Bluetooth device and it tells me what it is? We didn't have one, so we did it the slow way (next slides).
Illustration of a phone BLE scanner app (not a real screenshot; serials and addresses masked).
-->

---
layout: center
class: text-center
---

# So what is QT?

<img src="/shots/google-what-is-qt.jpg" class="mx-auto mt-4 rounded-lg" style="height: 420px; border: 1px solid #333" />

<!--
Say: wouldn't it be nice to have a tool where I type in a Bluetooth device and it tells me what it is? There isn't one. Google "what is QT": a quart, "on the QT" (quietly), quantitative tightening, the Qt software framework. Nothing about a little box that keeps showing up on the street.
So we had to do it by hand: WiGLE → Google → FCC filing → user manual → the app. The next slides are exactly those steps, for one device, over many hours. The rest of the talk is about building that missing tool.
Screenshot: Google search "what is QT", logged out, desktop, captured 2026-10-19 via auto-browser.
-->

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

<!--
We don't know what they are

How can you go from what we scan locally to what this thing is
-->

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

<!--
The reverse direction: start from one device (an IP address) and ask what it is. Click 1: Censys has tagged it CAMERA / IOT and lists its open services: web (80), video stream (554 / RTSP) and a Hikvision recorder protocol (9020). Click 2: from the web server's response, the software is "Hikvision Web Server". So: this address is a Hikvision camera / recorder, on a residential ISP in Southern California.
This is exactly what we want for Bluetooth: hear one advertisement → what product, app and vendor is it (our "Look it up" step later).
Screenshot: Censys host page for one of the search results, logged out, captured 2026-10-19 via auto-browser; IP, reverse DNS, routing prefix, coordinates and URL blurred.
-->

---
clicks: 2
---

# Bluetooth devices: WiGLE

<ShotTour :step="$clicks" src="/shots/wigle-qt-search.jpg" :iw="2968" :ih="2026" :width="660" class="mt-4" :stops="[
  {},
  { x: 290, y: 520, s: 2.6, boxes: [{ x0: 33, y0: 611, x1: 398, y1: 665 }], caption: 'search: name QT %' },
  { x: 1113, y: 300, s: 2.4, boxes: [{ x0: 757, y0: 108, x1: 1475, y1: 186 }], caption: 'a name, a place, a date' },
]" />

<!--
Every dot is a Bluetooth device named "QT" + a module ID, in WiGLE's crowdsourced data for San Diego County (the WiGLE download we made for the BLE Theft Auto paper, name like "QT %"). They are everywhere: on every freeway, in every neighborhood. Say: "…and it was everywhere." Still no idea what it is: WiGLE only has the name.
The list on the right shows the name format only; serial numbers are masked (X), no real IDs on screen.
If asked: about 148,000 distinct WiGLE records (network IDs) in this map area; WiGLE locations are its own trilaterated estimates. Our own first-party scans also contain QT names in San Diego County (11 devices).
Map: © OpenStreetMap contributors (standard tiles, darkened with a CSS filter); data: WiGLE; rendered with Leaflet.
-->

---
layout: center
class: text-center
---

# The closest: wireless intrusion detection

<img src="/shots/bastille-home.jpg" class="mx-auto mt-4 rounded-lg" style="height: 300px; border: 1px solid #333" />

<div v-click class="text-3xl mt-8">flags <strong>suspicious devices</strong> in your own building</div>

---
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

<!--
This is everything one QT device tells us: a name, a MAC address, and an advertisement with three AD structures: name, flags, and manufacturer-specific data.
By the spec, the first two bytes of manufacturer data are the company ID assigned by the Bluetooth SIG (highlighted, little-endian: 0x3176).
Say: so what can we do with just this? Two obvious things to try.
Real advertisement from our scans (simi cluetooth DB, read-only); name serial and the last three MAC bytes masked.
-->

---
layout: center
class: text-center
clicks: 1
---

# The MAC address prefix

<img v-if="$clicks < 1" src="/shots/oui-lookup-408432.jpg" class="mx-auto mt-4 rounded-lg" style="height: 340px; border: 1px solid #333" />
<img v-else src="/shots/microchip-products.jpg" class="mx-auto mt-4 rounded-lg" style="height: 340px; border: 1px solid #333" />

<div v-click class="text-3xl mt-6 opacity-80">a chip maker, not a product</div>

<!--
The first three bytes of a public MAC address (the OUI) are registered with the IEEE. QT devices use Microchip prefixes (40:84:32, 44:B7:D0, 2C:FE:8B, …) and SST Taiwan (a Microchip subsidiary).
Say: so it has a Microchip Bluetooth chip inside. Like thousands of other products. Still no idea what it is.
If asked: our scans have about 1,700 QT devices; every OUI they use belongs to Microchip or SST. Source: IEEE OUI registry.
-->

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

<!--
Five QT devices, five different "manufacturer IDs". Every QT device we saw has a different one.
Click: we looked them up in the Bluetooth SIG company identifier list: none of them exists. The list currently ends around 0x1132; these are all far beyond it.
Say: either there are thousands of secret Bluetooth companies, or something is off. We only found out what was going on much later, when we took the app apart (keep the reveal for that slide).
Real values from our scans; Bluetooth SIG Assigned Numbers, company_identifiers.yaml, retrieved 2026-10-19.
-->

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

<!--
Every radio device sold in the US has an FCC ID, and the filing is public. So we searched the name plus "FCC ID". The first web result is the FCC filing 2ASRL-1069 and its user manual.
Screenshot: Google search for "QT FCC ID", logged out, desktop, captured 2026-10-19 (via auto-browser after a human passed Google's check). The AI Overview at the top is Google's, not ours.
-->

---
layout: center
class: text-center
---

# An FCC filing

<img src="/shots/fccid-qt.jpg" class="mx-auto mt-6 rounded-lg" style="height: 400px; border: 1px solid #333" />

<!--
The search led to FCC ID 2ASRL-1069: "QT Solutions Bluetooth Sensor" by QT Solutions PTY LTD. The filing includes a user manual.
Screenshot: fccid.io page for the filing, logged out, desktop browser (auto-browser), captured 2026-10-19.
-->

---
layout: center
class: text-center
clicks: 5
---

# Its user manual

<ManualZoom :step="$clicks" class="mx-auto mt-2" />

<!--
The user manual in that FCC filing, shown like a PDF viewer. It says what the thing is and what it does, in the vendor's own words.
Click 1, cover: "Congratulations on your purchase of the KARR BT system, designed with convenient, selectable features and a user friendly mobile app to provide you the best in electronic vehicle security." So it is a dealer-installed car security system (SWDS · KARR Security Systems · BT Series); the last page carries the same FCC ID, 2ASRL-1069.
Clicks 2-3, "KARR BT System Functions": "The KARR BT System App allows you to arm/lock or disarm/unlock …". The phone app is the car key; arming also engages the immobilizer (manual, page 2).
Clicks 4-5, "Settings": the app screenshot ("Unit Settings") shows the unit's name: "QT" plus a serial number. (The serial shown is the manual's own example.)
Say: the same name we saw on the street. Then the real work: reverse engineering the module and its app, and writing the paper (BLE Theft Auto: Evaluating the Security of Aftermarket BLE-based Automotive Remote Control Systems; Jerry Yu*, Yibo Wei*, et al.). Context: the phone app works like a wireless key fob; these systems often skip BLE's built-in authentication and encryption and roll their own application-layer security.
KARR, one slide only. The attack unlocks the car; it does not start it. The grad student who dug in was me (as a PhD). Do not go into BLE Theft Auto details. Optional aside: the car sits on the street, so "an attacker must be nearby" is not much comfort.
Source: user manual in FCC filing 2ASRL-1069 (fccid.io), retrieved 2026-10-19.
-->

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

<!--
We downloaded the KARR Android app and decompiled it. Authentication is a custom application-layer challenge-response over BLE: the module sends random challenge bytes, and the app answers with a hash of the challenge, the module name and mode (both broadcast in the advertisement, highlighted) and one of two hard-coded fixed keys: a dealer-level key (operate and configure) and a user-level key (operate only).
The same keys are in every copy of the app and work for every KARR module. No pairing by default, no encryption. So anyone with the keys can write an app that authenticates to every KARR module within range: the attack unlocks the car; it does not start it.
Code on the slide is a simplified illustration, not the decompiled source; the real keys are never shown.
Click (the reveal from "The manufacturer ID", highlights the color line): how the app reads the manufacturer data. It starts at byte 0: there is no company ID at all. d[0] and d[1] (highlighted line), the two bytes every scanner reads as a "company", carry a colour code (an integer enum: 1 ORANGE, 2 BLUE, 3 LIGHTGREEN, …); then mode, armed, snow mode and the car battery voltage (d[5] × 0.06 V). That is why every QT device shows a different, nonexistent company. Example 76 31 31 73 34 e8: colour ORANGE, battery 13.92 V.
The `if mode == Mode.DEALER` line connects the two blocks: the mode broadcast in the advertisement decides which hard-coded key the app uses (simplified: in the real app the dealer key is used for every mode except USER and VALET).
Simplified from our reverse engineering (qtclient, protocol.py QTAdData; decompiled FRMBLEDealerApp), not the original source. Disclosed to the vendor, who developed patches.
Source: BLE Theft Auto paper, KARR case study.
-->

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

<!--
How the app decides who may open which car. It scans every KARR module nearby, asks the vendor's API for the list of vehicles this user's account owns, and loops: if the scanned device is in that list, the app lets the user connect.
Say: the check lives only in the app. The module never asks who you are, only for the shared hard-coded key from the previous slide. A client that skips this loop can talk to every module in range.
Simplified illustration of the decompiled app's logic, not the original source.
-->

---
layout: center
---

# First submission: one product. The reviews:

<div v-click class="mx-auto mt-10 text-left" style="max-width: 760px">
  <div class="text-xl opacity-60">Reviewer #2</div>
  <div class="text-4xl mt-4 leading-snug">"Only one vulnerability.<br><span v-mark.red="2">Lacks scientific novelty.</span>"</div>
  <div class="text-lg opacity-50 mt-6">(paraphrased)</div>
</div>

<!--
True story (paraphrased): the first submission found one vulnerable product and was rejected for lacking scientific novelty.
-->

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
    <div v-click="8" class="text-2xl mt-2" style="color:#f87171">~2.9 million vehicles exposed (est.)</div>
    <div v-click="9" class="text-4xl mt-6 font-bold" style="color:#4ade80">USENIX: accept</div>
  </div>
  <img v-click="9" src="/shots/ble-theft-auto-p1.jpg" style="height: 250px; border: 1px solid #333" />
</div>

<!--
Say: n = 6 → science.
Same investigation, six representative aftermarket systems; critical pairing/authentication vulnerabilities in three: KARR, CarLink, Rockledge; two of them dealer-installed, exposing an estimated 2.9 million vehicles (paper's estimate). Accepted. The lesson we took: more is more scientific.
-->

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

<!--
Say: Not yet another LLM security paper.
Two-panel meme. Left: the paper we "could" write by scaling up with agents. Right: the toilet roll printed with such titles. The joke is about the sheer volume, not about anyone's specific work.
Pivot: agents are a tool here, not the contribution. The contribution is a continuous, systematic observatory: a reusable knowledge base and measurement of deployment and repair.
All titles are made up.
-->

---
layout: full
clicks: 1
---

<div class="absolute inset-0 overflow-hidden flex items-center justify-center" style="background:#121212">
  <img src="/defcon/group.jpg" style="height: 100%; max-width: none; transform-origin: 30.4% 22.3%; transition: transform 1.8s cubic-bezier(0.65, 0, 0.35, 1)"
    :style="{ transform: $clicks >= 1 ? 'translate(19.6%, 27.7%) scale(5)' : 'none' }" />
</div>

<!--
DEF CON. Click: zoom in on the second person from the left: a random guy we met at DEF CON. He reproduced our KARR attack with AI in about 20 minutes.
-->

---
layout: full
clicks: 1
---

<div class="absolute inset-0 overflow-hidden flex items-center justify-center" style="background:#121212">
  <img src="/defcon/talk.jpg" style="height: 100%; max-width: none; transform-origin: 32.5% 44%; transition: transform 1.8s cubic-bezier(0.65, 0, 0.35, 1)"
    :style="{ transform: $clicks >= 1 ? 'translate(17.5%, 6%) scale(3.7)' : 'none' }" />
</div>

<!--
Then he gave a talk at DEF CON about it: "2026.07: KARR Security", showing the press coverage of our paper.
-->

---
layout: full
---

<div class="absolute inset-0 flex items-center justify-center" style="background:#121212">
  <img src="/defcon/repro.jpg" style="height: 100%; max-width: none" />
</div>

<!--
His slide: "Works on sim, confirmed also on real signals in Las Vegas". His own tool decodes the KARR advertisements.
The point: AI makes reverse engineering cheap and fast. If it's discoverable, assume it's already discovered.
This also answers "aren't you helping attackers?": we assume they already are looking. The question is whether defenders can see too.
-->

---
layout: center
class: text-center
hide: true
---

# The Internet's common assumption

<div v-click class="text-5xl mt-10 font-bold leading-tight">"if you're hackable,<br>you <span v-mark.green="1">will</span> be hacked"</div>


<!--
Say: So nobody dares to run a server naked.
Frame as a difference in assumptions and pressure, not a quantitative "the Internet is X times safer" claim.
Remote reachability is part of it too; BLE "needs proximity", but devices sit on streets and in parking lots.
-->

---
hide: true
---

# Bluetooth's common assumption

<StreetDevices class="mt-10" />

<div v-click class="text-5xl text-center mt-12 font-bold">"nobody will notice"</div>


<!--
Say: Besides the vendor and the user, nobody knows what these are.
-->

---
layout: center
class: text-center
hide: true
---

# We want a <span style="color:#9dd0ff">Censys</span> for Bluetooth

<!--
Ties back to the Internet measurement slide: the Internet has Censys / Shodan / Shadowserver, so defenders see what is exposed first. We want the same for Bluetooth.
First step: a BLE knowledge base: every device we hear → a fingerprint → a product → an app → a vendor.
-->

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
hide: true
---

# Why not just use WiGLE?

<div class="grid grid-cols-[1.2fr_1fr] gap-10 mt-6 items-center">
  <img src="/shots/wigle.jpg" class="rounded-lg" style="aspect-ratio: 16 / 10; object-fit: cover; object-position: top; border: 1px solid #333" />
  <div class="text-2xl leading-loose whitespace-nowrap">
    <div v-click>Bluetooth: <strong>no advertisement data</strong></div>
    <div v-click>names: <strong>wildcards</strong> only</div>
    <div v-click>random MACs: <strong>nothing to match</strong></div>
    <div v-click>API: <strong>no complex queries</strong></div>
  </div>
</div>

<!--
Introduce problem first then why wigle isn't solving it yet
-->

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

<!--
Clicks zoom in: 1 the live list of devices, 2 one device (name and address), 3 general information (signal, time, location, accuracy), 4 the raw advertisement broken into AD structures.
So we built our own scanner: an Android app that records every advertisement in full, not just a name and a MAC. Here: a Govee thermometer (Govee_H6199_…), with signal strength, time, location, and the raw advertisement broken into its AD structures (flags, name, manufacturer data).
Screenshot from our app, captured 2026-10-19; device ID, coordinates, the last three MAC bytes, the name suffix and the name (0x09) bytes in the raw data are blurred.
-->

---
layout: center
---

# Scan

<SlidevVideo autoplay class="mx-auto rounded-lg mt-2" style="height: 420px">
  <source src="/anim/01-scan.mp4" type="video/mp4" />
</SlidevVideo>

<!--
So we listen ourselves. A scanner drives around and records every advertisement it hears. Passive: nothing is sent to the devices. Advertisement bytes vs. what the receiver adds (signal strength, time, place) are different things. All data in these videos is synthetic.
-->

---
layout: center
---

# What's inside an advertisement

<SlidevVideo autoplay class="mx-auto rounded-lg mt-2" style="height: 420px">
  <source src="/anim/02-parse.mp4" type="video/mp4" />
</SlidevVideo>

<!--
An advertisement is a list of AD structures: length · type · value. Walk through one: flags, service UUID, manufacturer data (company ID), local name.
-->

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


<!--
Say: No single field is enough, but together they form a shape.
Goal: classify a huge number of advertisements into product groups. The obvious first idea: group by one field.
- Name: many devices don't advertise one; defaults from the chip/module, user renames, serial numbers.
- Name, manufacturer ID and service UUID are all optional: many advertisements simply don't carry them.
- MAC OUI: many BLE devices use random addresses (no OUI); a public OUI usually names the radio/module maker.
- Manufacturer (company) ID: identifies a Bluetooth SIG member, often the chipset vendor, not the finished product.
- UUID: standard services and SDK-default UUIDs are shared by many vendors.
- GATT profile: the app defines its GATT service/characteristic UUIDs explicitly, a near-certain fingerprint. But GATT isn't broadcast: you must actively connect, and doing that to other people's devices at scale may not be legal. So we only read GATT at the very end, on a device we bought (see the validation slide).
But all of these come back later as clues for attribution (company ID → vendor, name → app, UUID → code). Alone they can't classify; together the structure is distinctive.
-->

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

<!--
Say: The shape is how we sort quickly, not the final answer.
Core assumption of the triage step: the same kind of device sends the same shape of advertisement, which structures, in which order, how long. The structure is usually fixed in firmware; names and a few bytes change. Clustering by shape is cheap: it sorts the flood of advertisements into piles and decides which pile to investigate next. The specific fingerprint (vendor ID, fixed bytes, private UUIDs, name pattern) is extracted only after a pile has been investigated.
Advertisements are highly structured (typed fields in a fixed layout), so the structure itself is the feature; no learned embedding needed. If asked: related ML work either does supervised re-identification across MAC randomisation (byte n-grams) or learns physical-layer RF fingerprints, i.e. hardware identity, not product structure.
Limitation (say it): different products built on the same chip or SDK can look alike, so a shared shape is only a candidate pile, and investigation still has to confirm what it is.
Synthetic examples.
-->

---
layout: center
---

# Every product looks different

<SlidevVideo autoplay class="mx-auto rounded-lg mt-2" style="height: 420px">
  <source src="/anim/03-pile.mp4" type="video/mp4" />
</SlidevVideo>

<!--
Different products use different types, orders and sizes. Collected together, it's a mess.
-->

---
layout: center
---

# Names are wildcards

<SlidevVideo autoplay class="mx-auto rounded-lg mt-2" style="height: 420px">
  <source src="/anim/04-wildcard.mp4" type="video/mp4" />
</SlidevVideo>

<!--
Two sightings of the same kind of device, names of different length. Byte-for-byte they don't match; treat the name as a wildcard and they do. In practice which fields are variable is a choice: service data can vary in length, sometimes only the set of fields matters, not the order. Different strategies over-split or over-merge different products, so we try several.
-->

---
layout: center
---

# Same template → same cluster

<SlidevVideo autoplay class="mx-auto rounded-lg mt-2" style="height: 420px">
  <source src="/anim/05-cluster.mp4" type="video/mp4" />
</SlidevVideo>

<!--
Group by template. Every cluster starts out unknown. Some advertisers never cluster: noise.
-->

---
layout: center
---

# Company ID → vendor

<SlidevVideo autoplay class="mx-auto rounded-lg mt-2" style="height: 420px">
  <source src="/anim/06-sig.mp4" type="video/mp4" />
</SlidevVideo>

<!--
The agent's first lead: the manufacturer data's company ID, looked up in the Bluetooth SIG assigned numbers. (A company ID can be a chipset vendor, not the brand, it's a lead, not proof.)
-->

---
layout: center
---

# Name pattern → app

<SlidevVideo autoplay class="mx-auto rounded-lg mt-2" style="height: 420px">
  <source src="/anim/07-appstore.mp4" type="video/mp4" />
</SlidevVideo>

<!--
The name pattern finds the companion app; download the APK.
-->

---
layout: center
---

# The app's code matches

<SlidevVideo autoplay class="mx-auto rounded-lg mt-2" style="height: 420px">
  <source src="/anim/08-decompile.mp4" type="video/mp4" />
</SlidevVideo>

<!--
The decompiled scan code filters on exactly this UUID, company ID and name prefix, the app was written for this device.
(Foreshadow: the code also contains the GATT service/characteristic UUIDs, which we can only check at the very end, on a device we own.)
-->

---
layout: center
---

# Check against what we saw

<SlidevVideo autoplay class="mx-auto rounded-lg mt-2" style="height: 420px">
  <source src="/anim/09-validate.mp4" type="video/mp4" />
</SlidevVideo>

<!--
Turn that into a fingerprint and query the observations: it matches every sighting in the cluster and nothing else. A researcher reviews before it counts.
-->

---
layout: center
---

# Every cluster, in parallel

<SlidevVideo autoplay class="mx-auto rounded-lg mt-2" style="height: 420px">
  <source src="/anim/10-parallel.mp4" type="video/mp4" />
</SlidevVideo>

<!--
The same investigation runs for all clusters at once. Some stay 'needs more evidence', that's fine.
-->

---
layout: center
---

# Remember it

<SlidevVideo autoplay class="mx-auto rounded-lg mt-2" style="height: 420px">
  <source src="/anim/11-knowledge.mp4" type="video/mp4" />
</SlidevVideo>

<!--
Every answer becomes a reusable entry: fingerprint ↔ product ↔ app ↔ vendor. Knowledge doesn't leave when a student graduates.
Each entry stores a specific fingerprint (vendor ID, fixed bytes in the manufacturer data, private UUIDs, name pattern) linked to the product, app and vendor, not the raw shape. The shape was only for triage.
-->

---
layout: center
---

# More data, more clusters

<SlidevVideo autoplay class="mx-auto rounded-lg mt-2" style="height: 420px">
  <source src="/anim/12-scale.mp4" type="video/mp4" />
</SlidevVideo>

<!--
Known fingerprints are recognized instantly (we'll see how lookup works in a moment); only new templates need investigating, in batches, by agents.
Some of yesterday's noise (one-off advertisements) gets enough sightings to form a cluster of its own: noise strips light up and fly into new clusters.
-->

---
layout: center
---

# From apps

<SlidevVideo autoplay class="mx-auto rounded-lg mt-2" style="height: 420px">
  <source src="/anim/13-apps.mp4" type="video/mp4" />
</SlidevVideo>

<!--
Second way in: start from software. Take apps with the Bluetooth permission (AndroZoo). One in detail: decompile it, find the BLE scan filter (the name, service UUID and manufacturer ID the app looks for), read the fingerprint off it, and what the app controls tells us the product: new knowledge. Then the same loop again and again, run by agents. Synthetic example (com.example.scooter, ES-4).
-->

---
layout: center
---

# Validate with WiGLE

<SlidevVideo autoplay class="mx-auto rounded-lg mt-2" style="height: 420px">
  <source src="/anim/14-wigle.mp4" type="video/mp4" />
</SlidevVideo>

<!--
WiGLE has no raw advertisements, but it has name, manufacturer ID and location. When a name is distinctive, it's a fast check that the device exists in the wild. WiGLE validates; it is not a source of leads here.
-->

---
layout: center
---

# From places

<SlidevVideo autoplay class="mx-auto rounded-lg mt-2" style="height: 420px">
  <source src="/anim/15-hospitals.mp4" type="video/mp4" />
</SlidevVideo>

<!--
Third way in: start from a place type. In the car-alarm work we used OpenStreetMap motorways to find in-vehicle devices. Same idea: hospitals with an emergency department. (Synthetic data on screen.)
-->

---
layout: center
---

# What's unusual there?

<SlidevVideo autoplay class="mx-auto rounded-lg mt-2" style="height: 420px">
  <source src="/anim/16-overrep.mp4" type="video/mp4" />
</SlidevVideo>

<!--
Phones and earbuds are everywhere. What is over-represented near hospitals compared with elsewhere becomes a new lead, a candidate, not an identification.
The three names are real name patterns from our hospital-region WiGLE research (newcluetooth wiki): EmTag (Enovate clinical asset tag), ResMed + 6 digits (compatible with the ResMed AirMini pairing name), PrimexClock (Primex synchronized clock/repeater). They are candidates: no observation proves a particular hospital owns or uses them. The bar heights are illustrative, not measured counts; the map and dots are synthetic.
-->

---
layout: center
---

# One knowledge base

<SlidevVideo autoplay class="mx-auto rounded-lg mt-2" style="height: 420px">
  <source src="/anim/17-converge.mp4" type="video/mp4" />
</SlidevVideo>

<!--
Scans, apps and places all feed the same knowledge base; WiGLE helps validate along the way.

Overview the whole thing
-->

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

<!--
This is a real entry, built only from what is already public (our BLE Theft Auto paper; the QT name prefix was presented at DEF CON). The values shown are the publicly disclosed ones, checked against our own scan aggregates (no device-level data). The talk-wide rule is no numbers or IDs on screen; this slide is the deliberate exception.
Highlights: the frontmatter (what the matcher reads) → the body (what a human reads) → everything.
Entries are plain Markdown files kept in git. They are compiled into the lookup index, which is the "Look it up" step.
- Frontmatter: one entry per product family.
- Identity: product, vendor and app. This is what a match tells us.
- The fingerprint block: everything we match new advertisements against.
- The name is a regex, not a wildcard: "QT " plus 7-8 uppercase hex characters. KARR names normally cannot be renamed anyway.
- mfr_data: only the length is matched. The first two bytes vary per module and are not a Bluetooth SIG company ID, so we don't use them; this is why a single field is unreliable (ties back to "How do we classify all these advertisements?"). There is no stability field: an entry lists several independent features, so if one changes (e.g. a renamed device elsewhere) the others still match. A fingerprint lists only features that actually match.
- Confidence: high, because of the published paper and real-device testing. There is no evidence field; provenance lives in the git history and the linked paper.
- The body: what a human reads: what the device is, what it is used for, what it broadcasts, plus reference links (vendor site cited in the paper; Android package from a Google Play search listing). Links live in the body because they are for humans; frontmatter only holds what the matcher reads. No FCC ID could be found publicly; it would go in the body when known. Paper wording: a dealership pre-installed security system that allows users to lock/unlock doors and arm/disarm the immobilizer. The paper says the advertisements contain the module name and mode; we do not claim which bytes hold the mode. The advertisement structure (name, flags, 6 bytes of manufacturer data) is what first put these modules in one pile (triage); it is described in the text, not stored as a matching field. General rule: frontmatter = what the matcher reads, body = what a human reads.
Context, notes only (do not put on the slide): the paper found no pairing by default, a challenge-response with fixed keys shared across all modules, and no encryption; we disclosed to the vendor, who developed patches.
-->

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

<!--
A new advertisement arrives; we match it against the fingerprints stored in the knowledge base and get a product label. Second example: the owner renamed the device to "My Car", and it is still recognized through the other fields.
Several fields are matched together (vendor ID, fixed bytes, private UUIDs, name pattern), so a renamed device is still recognized; no single field decides.
Advertisements we cannot match become the next investigation list. This ties to "only new templates need investigating".
Say: this is an early prototype on our own scan data; we built it this week. Synthetic example on the slide.
Numbers only if asked, and say they are preliminary: roughly half of the non-Apple advertisement types already match a knowledge-base entry; with the name removed, more than 80% of name-matched rows still match the same family.
-->

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

<!--
Pedal Commander: an aftermarket drive-by-wire throttle controller that sits between the accelerator pedal sensor and the vehicle control module.
Its app talks over Bluetooth and offers modes (Eco / City / Sport / Sport+). An anti-theft feature in the app can temporarily disable the gas pedal. Pairing uses a six-digit serial printed on the unit.
We only saw it rarely in our scans, and we have NOT analyzed its security. Phrase it strictly as a question: it is a lead, like KARR was. Next: hypothesis, validate, buy the device.
No product photo: the vendor site redirects our headless browser, so none was captured.
-->

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

<!--
Say: The knowledge base tells us which device is worth buying.
Keep it short. Earlier checks can rule out many hypotheses cheaply; real hardware is always the final confirmation, before any disclosure.
-->

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

<!--
Deployment: e.g. products that hand out MAC addresses sequentially let us estimate population, with stated assumptions and uncertainty.
Remediation: when patched versions advertise differently, we can watch individual devices switch.
Point at the end: disclosure is not the end, we can check whether the physical world actually got fixed.
-->

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
