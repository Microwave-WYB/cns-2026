---
title: Toward a Continuous, Ecosystem-Scale Bluetooth Security Observatory
colorSchema: dark
transition: fade
mdc: true
---

# Toward a Continuous, Ecosystem-Scale<br>Bluetooth Security Observatory

CNS 2026

<!--
DRAFT v1, content first, theme later. See OUTLINE.md.
Every slide: few, big words. Details go in these notes.
-->

---
layout: center
class: text-center
---

# How BLE security research<br>used to be done at UCSD

<div v-click class="text-2xl opacity-60 mt-6">(a documentary)</div>

---
clicks: 1
---

# Step 1: drive around and scan

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

# Step 2: find out what's out there

<div class="grid grid-cols-[1fr_1.4fr] gap-6 mt-6 items-center">
  <img src="/shots/skimmer-tape.jpg" class="rounded-lg w-full" style="border: 1px solid #333" />
  <img src="/shots/skimmer-board.jpg" class="rounded-lg w-full" style="border: 1px solid #333" />
</div>

<div v-click class="text-4xl mt-6" style="color:#f87171">a gas pump <strong>skimmer</strong></div>
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
---

# Step 3: research

<div class="text-4xl mt-10 leading-loose">
  <div v-click>pick one</div>
  <div v-click>buy it</div>
  <div v-click>take it apart</div>
  <div v-click><strong>what can it really do?</strong></div>
</div>

<!--
Step 3 is the slow, manual part: pick one interesting device, buy it, open it up, read its app and firmware, and find out what it really does. One device at a time, by one person. That is where the old way stops scaling.
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
Illustration of a phone BLE scanner app (not a real screenshot; serials and addresses masked). Wherever we scanned, the list was full of "QT" followed by a module ID. Nobody on the team knew what it was. Curiosity, not a plan.
-->

---
layout: center
class: text-center
---

# So we checked WiGLE…

<div class="flex justify-center gap-6 mt-4 items-stretch">
  <img src="/shots/qt-wigle-sd.jpg" class="rounded-xl" style="height: 430px" />
  <div class="rounded-xl px-5 py-3 text-left" style="background:#161616; border:1px solid #2a2a2a; font-family: ui-monospace, monospace; font-variant-ligatures: none; color:#9dd0ff; font-size: 17px; line-height: 1.55; overflow: hidden; height: 430px">
    <div>QT XXXXXXXX</div>
    <div>QT XXXXXXX</div>
    <div>QT XXXXXXXX</div>
    <div>QT XXXXXXXX</div>
    <div>QT XXXXXXX</div>
    <div>QT XXXXXXXX</div>
    <div>QT XXXXXXX</div>
    <div>QT XXXXXXXX</div>
    <div>QT XXXXXXXX</div>
    <div>QT XXXXXXX</div>
    <div>QT XXXXXXXX</div>
    <div>QT XXXXXXXX</div>
    <div>QT XXXXXXX</div>
    <div class="opacity-50">…</div>
  </div>
</div>

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

# So we googled it

<img src="/shots/google-qt-fcc.jpg" class="mx-auto mt-6 rounded-lg" style="height: 400px; border: 1px solid #333" />

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

# So we took the app apart

<div class="mx-auto mt-10 text-left rounded-xl px-6 py-4" style="width: 760px; background:#1c1c1c; border:1px solid #2f2f2f; font-family: ui-monospace, monospace; font-variant-ligatures: none; font-size: 20px; line-height: 1.7; white-space: pre">
  <div><span style="color:#6b6b6b">// challenge-response, simplified; keys redacted</span></div>
  <div>response = hash(challenge, <span style="color:#9dd0ff">name</span>, <span style="color:#9dd0ff">mode</span>, <span style="color:#f87171">KEY</span>)</div>
  <div><span style="color:#f87171">DEALER_KEY</span> = <span style="display:inline-block; width: 10em; height: 0.9em; background:#3a3a3a; border-radius: 3px; vertical-align: middle"></span>&nbsp;&nbsp;<span style="color:#6b6b6b">// hard-coded</span></div>
  <div><span style="color:#f87171">USER_KEY</span>&nbsp;&nbsp;&nbsp;= <span style="display:inline-block; width: 10em; height: 0.9em; background:#3a3a3a; border-radius: 3px; vertical-align: middle"></span>&nbsp;&nbsp;<span style="color:#6b6b6b">// hard-coded</span></div>
</div>


<!--
We downloaded the KARR Android app and decompiled it. Authentication is a custom application-layer challenge-response over BLE: the module sends random challenge bytes, and the app answers with a hash of the challenge, the module name and mode (both broadcast in the advertisement, highlighted) and one of two hard-coded fixed keys: a dealer-level key (operate and configure) and a user-level key (operate only).
The same keys are in every copy of the app and work for every KARR module. No pairing by default, no encryption. So anyone with the keys can write an app that authenticates to every KARR module within range: the attack unlocks the car; it does not start it.
Code on the slide is a simplified illustration, not the decompiled source; the real keys are never shown. Disclosed to the vendor, who developed patches.
Source: BLE Theft Auto paper, KARR case study.
-->

---
layout: center
---

# First submission: one product. The reviews:

<div v-click class="mx-auto mt-10 rounded-xl p-8 text-left" style="max-width: 760px; background:#1c1c1c; border:1px solid #3a3a3a">
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

<div class="flex justify-center gap-3 mt-12">
  <div v-for="(n, i) in ['KARR', 'CarLink', 'DS4', 'EvoStart', 'Rockledge', 'Linkr']" :key="n" v-click="i + 1"
    class="rounded-xl flex items-center justify-center text-xl font-bold"
    :style="{ width: '128px', height: '96px', background: '#1c1c1c', border: '2px solid ' + (['KARR', 'CarLink', 'Rockledge'].includes(n) && $clicks >= 7 ? '#f87171' : '#4ea8ff') }">{{ n }}</div>
</div>

<div v-click="7" class="text-3xl mt-8" style="color:#f87171">3 critically vulnerable</div>
<div v-click="8" class="text-3xl mt-3" style="color:#f87171">~2.9 million vehicles exposed (est.)</div>
<div v-click="9" class="text-5xl mt-8 font-bold" style="color:#4ade80">USENIX: accept</div>

<!--
Say: n = 6 → science.
Same investigation, six representative aftermarket systems; critical pairing/authentication vulnerabilities in three: KARR, CarLink, Rockledge; two of them dealer-installed, exposing an estimated 2.9 million vehicles (paper's estimate). Accepted. The lesson we took: more is more scientific.
-->

---
layout: center
class: text-center
---

# If 6 is science…

<div v-click class="text-8xl mt-10 font-bold">imagine 6,000</div>

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

# Internet-wide measurement already exists

<div class="grid grid-cols-3 gap-6 mt-8">
  <a v-for="c in [
    { name: 'Censys', img: '/shots/censys.jpg', url: 'https://www.censys.com/', line: 'Map Internet hosts and services' },
    { name: 'Shodan', img: '/shots/shodan.jpg', url: 'https://www.shodan.io/', line: 'Search exposed devices and services' },
    { name: 'Shadowserver', img: '/shots/shadowserver.jpg', url: 'https://dashboard.shadowserver.org/', line: 'Scan and report exposures to defenders' },
  ]" :key="c.name" :href="c.url" target="_blank" rel="noopener noreferrer" class="block" style="border-bottom: none">
    <img :src="c.img" class="w-full rounded-lg" style="aspect-ratio: 16 / 10; object-fit: cover; object-position: top; border: 1px solid #333" />
    <div class="text-2xl font-bold mt-4" style="color:#9dd0ff">{{ c.name }}</div>
    <div class="text-lg mt-1 opacity-80">{{ c.line }}</div>
  </a>
</div>

<!--
Examples of established Internet measurement infrastructure, not identical services:
- Censys: repeated Internet-wide scanning and structured observations of publicly reachable hosts and services. https://docs.censys.com/docs/internet-scanning
- Shodan: a search engine for Internet-connected devices, collecting service banners and metadata. https://help.shodan.io/the-basics/what-is-shodan
- Shadowserver: Internet-wide scanning with exposure reports for network owners and defenders; not a public search engine. https://www.shadowserver.org/what-we-do/data-collection/
Screenshots: Censys Platform host search for 8.8.8.8 (platform.censys.io, logged out), shodan.io homepage, dashboard.shadowserver.org (public dashboard), captured 2026-10-15.
Coverage, scan frequency and access models differ. Do not claim every device or every service is measured continuously.
The speaker supplies the transition from the previous slide; no extra slide about student turnover or one-off discovery is needed.
-->

---
layout: center
class: text-center
---

# The Internet's common assumption

<div v-click class="text-5xl mt-10 font-bold leading-tight">"if you're hackable,<br>you <span v-mark.green="1">will</span> be hacked"</div>


<!--
Say: So nobody dares to run a server naked.
Frame as a difference in assumptions and pressure, not a quantitative "the Internet is X times safer" claim.
Remote reachability is part of it too; BLE "needs proximity", but devices sit on streets and in parking lots.
-->

---

# Bluetooth's common assumption

<StreetDevices class="mt-10" />

<div v-click class="text-5xl text-center mt-12 font-bold">"nobody will notice"</div>


<!--
Say: Besides the vendor and the user, nobody knows what these are.
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
---

<div class="absolute inset-0 flex items-center justify-center" style="background:#121212">
  <img src="/defcon/talk.jpg" style="height: 100%; max-width: none" />
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
---

# We want a <span style="color:#9dd0ff">Censys</span> for Bluetooth

<!--
Ties back to the Internet measurement slide: the Internet has Censys / Shodan / Shadowserver, so defenders see what is exposed first. We want the same for Bluetooth.
First step: a BLE knowledge base: every device we hear → a fingerprint → a product → an app → a vendor.
-->

---
layout: center
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
WiGLE is a crowdsourced wardriving database of Wi-Fi, cell and Bluetooth sightings with locations; we already met it in the opening story. Screenshot: the map area of the public wigle.net landing page, logged out (cropped to avoid the stats numbers), captured 2026-10-18.
The natural first move, once we know what we want to build, is to look at WiGLE. It is a great crowdsourced map; here is what it exposes for our purpose (not a criticism).
- For Bluetooth it basically keeps a name and a MAC address, plus location (slide: "no advertisement data"). Not the advertisement contents: no manufacturer data, no UUIDs, no structure.
- Names can only be matched with simple wildcards. If a product's name does not fit a wildcard, you cannot find it.
- If the MAC address is random, there is basically nothing to match on.
- The API is not convenient for complex queries.
So we decided to build our own scanner and database; that is the next step, Listen.
WiGLE is still useful later, for validation (see "Validate with WiGLE"): a quick, broad check that a device exists in the wild and where. Deep (ours) and wide (WiGLE) are complementary. No numbers here.
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

# Listen

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
Second way in: start from software. Filter the AndroZoo metadata by Bluetooth permissions before downloading anything; only those APKs are analyzed. Agents extract each app's scan fingerprint and what it controls.
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
-->

---
layout: center
---

# What an entry looks like

```md {1|2-5|6-8|7|8|9|12-18}
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
Entries are plain Markdown files kept in git. They are compiled into the lookup index, which is the "Look it up" step.
1. Frontmatter: one entry per product family.
2. Identity: product, vendor and app. This is what a match tells us.
3. The fingerprint block: everything we match new advertisements against.
4. The name is a regex, not a wildcard: "QT " plus 7-8 uppercase hex characters. KARR names normally cannot be renamed anyway.
5. mfr_data: only the length is matched. The first two bytes vary per module and are not a Bluetooth SIG company ID, so we don't use them; this is why a single field is unreliable (ties back to "How do we classify all these advertisements?"). There is no stability field: an entry lists several independent features, so if one changes (e.g. a renamed device elsewhere) the others still match. A fingerprint lists only features that actually match.
6. Confidence: high, because of the published paper and real-device testing. There is no evidence field; provenance lives in the git history and the linked paper.
7. The body: what a human reads: what the device is, what it is used for, what it broadcasts, plus reference links (vendor site cited in the paper; Android package from a Google Play search listing). Links live in the body because they are for humans; frontmatter only holds what the matcher reads. No FCC ID could be found publicly; it would go in the body when known. Paper wording: a dealership pre-installed security system that allows users to lock/unlock doors and arm/disarm the immobilizer. The paper says the advertisements contain the module name and mode; we do not claim which bytes hold the mode. The advertisement structure (name, flags, 6 bytes of manufacturer data) is what first put these modules in one pile (triage); it is described in the text, not stored as a matching field. General rule: frontmatter = what the matcher reads, body = what a human reads.
Context, notes only (do not put on the slide): the paper found no pairing by default, a challenge-response with fixed keys shared across all modules, and no encryption; we disclosed to the vendor, who developed patches.
-->

---
layout: center
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
---

# What turned up

<WikiScroll class="mx-auto mt-2" style="width: 900px" />

<!--
Every product family in our research wiki so far, scrolling: left is the name pattern, right is what it is. Each wiki entry also matches on company field / service UUIDs, not shown here. Early, medium-confidence attributions from our own scans; candidates, not authenticated identities. No device-level identifiers: these are family-level fingerprints.
Point out a few as they scroll by: a heated coffee mug (Ember), a smart-bed cooler (Eight Sleep Pod), a laundry payment box (PayRange BluKey), truck air suspension (Air Lift), a trucker's electronic logging device (Xirgo HarpBT; ELDs are legally required in US trucks), a garage opener (Chamberlain myQ), a gas-pedal controller (Pedal Commander).
If asked: 109 families listed here (wiki pages with a structured "How to recognize it" block, minus rollup/unknown pages; near-identical families such as several generic LED controllers and two Dreo pages merged for the slide).
-->

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
layout: center
class: text-center
hide: true
---

# Found something suspicious?

<div class="flex justify-center items-center gap-8 text-3xl mt-12">
  <div v-click>hypothesis</div>
  <div v-click>→ validate</div>
  <div v-click>→ buy the real device</div>
</div>


<div v-click class="text-3xl mt-10">on the device we bought: read its GATT → <span v-mark.green="5">the final proof</span></div>

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
