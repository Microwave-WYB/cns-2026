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

# Step 1: drive around and scan

<div class="grid grid-cols-2 gap-12 mt-6 text-center">
  <div v-motion :initial="{ x: -200, opacity: 0 }" :enter="{ x: 0, opacity: 1 }">
    <img src="/people/aaron.jpg" class="avatar" />
    <div class="text-2xl mt-3">Aaron Schulman</div>
  </div>
  <div v-motion :initial="{ x: 200, opacity: 0 }" :enter="{ x: 0, opacity: 1, transition: { delay: 250 } }">
    <img src="/people/nishant.jpg" class="avatar" />
    <div class="text-2xl mt-3">Nishant Bhaskar</div>
  </div>
</div>

<div v-click class="text-4xl text-center mt-10">WiGLE, everywhere</div>
<div v-click class="text-3xl text-center mt-6 opacity-80">"ooh… what's <em>that</em>?"</div>

<style>
.avatar { width: 150px; height: 150px; border-radius: 9999px; object-fit: cover; object-position: 50% 18%; margin: 0 auto; border: 3px solid #4ea8ff; }
</style>

<!--
Photos: Aaron from his UCSD homepage (cseweb.ucsd.edu/~schulman), Nishant from cseweb.ucsd.edu/~nibhaska.
Tone: affectionate. They did the hard, curious work; the joke is about scale, not about them.
-->

---

# Step 2: so many interesting devices

<Pile class="mt-6" />

<div class="grid grid-cols-2 gap-12 mt-10 text-2xl">
  <div v-click>a few → <strong>grad students</strong> dig in</div>
  <div v-click>the rest → <strong>undergrads</strong> 🫠</div>
</div>

---
layout: center
class: text-center
---

# One of them, a grad student dug into…

<div v-click class="text-4xl mt-12">…a hidden module that let us<br><span v-mark.red="2">unlock someone's car</span></div>

<!--
KARR, one slide only. The attack unlocks the car; it does not start it. The grad student was me (as a PhD). Do not go into BLE Theft Auto details.
Optional aside: the car sits on the street, so "an attacker must be nearby" is not much comfort.
-->

---
layout: center
class: text-center
---

# That became BLE Theft Auto

<div class="text-2xl mt-4 opacity-70">Evaluating the Security of Aftermarket BLE-based Automotive Remote Control Systems</div>

<div class="text-3xl mt-12 space-y-5">
  <div v-click>your phone app is the car key</div>
  <div v-click>added after the car is sold, by dealers or owners</div>
  <div v-click>vendors roll their own security</div>
</div>

<div class="text-lg mt-12 opacity-50">Jerry Yu*, Yibo Wei*, et al.</div>

<!--
Context for the audience: aftermarket BLE remote-control systems for cars. The phone app works like a wireless key fob; these systems often skip BLE's built-in authentication and encryption and implement their own application-layer security, which is a new attack surface.
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

# The Internet's default assumption

<div v-click class="text-5xl mt-10 font-bold">"you <span v-mark.green="1">will</span> be found"</div>


<!--
Say: So nobody dares to run a server naked.
Frame as a difference in assumptions and pressure, not a quantitative "the Internet is X times safer" claim.
Remote reachability is part of it too; BLE "needs proximity", but devices sit on streets and in parking lots.
-->

---

# Bluetooth's default assumption

<StreetDevices class="mt-10" />

<div v-click class="text-5xl text-center mt-12 font-bold">"nobody will notice"</div>


<!--
Say: Besides the vendor and the user, nobody knows what these are.
-->

---
layout: center
class: text-center
---

# Obscurity is dead

<div v-click class="text-3xl mt-10 opacity-80">AI makes reverse engineering cheap and fast</div>

<div v-click class="text-5xl mt-10 font-bold">If it's discoverable,<br><span v-mark.orange="3">assume it's already discovered.</span></div>

<!--
This also answers "aren't you helping attackers?": we assume they already are looking. The question is whether defenders can see too.
-->

---
layout: center
class: text-center
---

# Let defenders see first

<div v-click class="text-4xl mt-10">step 1: a <strong>BLE knowledge base</strong></div>

<div v-click class="text-2xl mt-8 opacity-70">every device we hear → a fingerprint → a product → an app → a vendor</div>

---
layout: center
---

# Listen

<SlidevVideo autoplay class="mx-auto rounded-lg mt-2" style="height: 420px">
  <source src="/anim/01-scan.mp4" type="video/mp4" />
</SlidevVideo>

<!--
A scanner drives around and records every advertisement it hears. Passive: nothing is sent to the devices. Advertisement bytes vs. what the receiver adds (signal strength, time, place) are different things. All data in these videos is synthetic.
-->

---

# Our scans vs WiGLE

<div class="grid grid-cols-[1fr_380px_1fr] gap-6 mt-8 items-center">
  <div v-click="1">
    <div class="text-4xl font-bold whitespace-nowrap" style="color:#9dd0ff">our scans</div>
    <div class="text-3xl mt-6"><strong>deep</strong></div>
    <div class="text-2xl opacity-80 mt-2">the full advertisement:<br>every structure, every byte</div>
    <div class="text-2xl opacity-60 mt-6">only where we drive</div>
  </div>
  <DepthBreadth :step="$clicks" />
  <div v-click="2">
    <div class="text-4xl font-bold" style="color:#4ade80">WiGLE</div>
    <div class="text-3xl mt-6"><strong>wide</strong></div>
    <div class="text-2xl opacity-80 mt-2">crowdsourced, worldwide</div>
    <div class="text-2xl opacity-60 mt-6">only name + manufacturer ID + location</div>
  </div>
</div>


<!--
Say: Deep × wide → complementary.
Why not just our own data? Ours is deep: the raw advertisement, so we can cluster and fingerprint precisely, but only where our scanners have been.
WiGLE is wide: crowdsourced from all over the world, but each record has only the name, manufacturer ID and location.
So we discover and fingerprint with our data, and use WiGLE to check, quickly and broadly, that a device exists in the wild and where.
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

# What an entry looks like

```md {1|2-5|6-11|7|8-10|11|12-13|16-19}
---
family: karr-module
product: KARR (dealer-installed vehicle module)
vendor: KARR Security
app: KARR Security app
fingerprint:
  name: { regex: "^QT [0-9A-F]{7,8}$" }
  company_id: none    # field reused for module data, not a SIG ID
  mfr_data: 6 bytes, per-module
  service_uuids: none
  shape: [name, flags, mfr(6)]    # triage only
confidence: high
evidence: [paper, real_devices, vendor_disclosure]
---

# KARR module
Advertises its name and mode; no pairing by default.
Fixed keys shared by all modules, no encryption.
Disclosed to the vendor, who developed patches.
```

<!--
This is a real entry, built only from what is already public (our BLE Theft Auto paper; the QT name prefix was presented at DEF CON). The values shown are the publicly disclosed ones, checked against our own scan aggregates (no device-level data). The talk-wide rule is no numbers or IDs on screen; this slide is the deliberate exception.
Entries are plain Markdown files kept in git. They are compiled into the lookup index, which is the "Look it up" step.
1. Frontmatter: one entry per product family.
2. Identity: product, vendor and app. This is what a match tells us.
3. The fingerprint block: everything we match new advertisements against.
4. The name is a regex, not a wildcard: "QT " plus 7-8 uppercase hex characters. KARR names normally cannot be renamed anyway.
5. company_id, mfr_data, service_uuids: the "company id" bytes vary per module and are not a Bluetooth SIG company ID, so a single field is unreliable (ties back to "How do we classify all these advertisements?"). There is no stability field: an entry lists several independent features, so if one changes (e.g. a renamed device elsewhere) the others still match.
6. The shape is for triage only: it told us which pile to investigate, it is not matched on.
7. Confidence and evidence: the published paper, real devices tested, vendor disclosure.
8. The body: what it is and what we found (the advertisement carries the module name and mode; no pairing by default; a challenge-response with fixed keys shared across all modules; no encryption). Readable by the next student or agent.
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

# More data, more clusters

<SlidevVideo autoplay class="mx-auto rounded-lg mt-2" style="height: 420px">
  <source src="/anim/12-scale.mp4" type="video/mp4" />
</SlidevVideo>

<!--
Known fingerprints are recognized instantly (the Look it up step); only new templates need investigating, in batches, by agents.
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
class: text-center
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

# Make Bluetooth assume<br>"you <span v-mark.green="1">will</span> be found"

<div v-click class="text-2xl mt-10 opacity-80">by the defenders first.</div>

---
layout: center
class: text-center
---

# Thanks! Questions?
