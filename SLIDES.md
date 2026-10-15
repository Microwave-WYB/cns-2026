# Slide Plan

## Storytelling Principle

The README is the content repository; the slides should tell one visual story. Do not map README sections directly to slides. Each slide should communicate one idea, and most of the explanation should be spoken.

The talk follows one unknown BLE cluster from observation to product attribution, vulnerability investigation, disclosure, and remediation measurement.

## Act I: A Successful but Expensive Manual Investigation

### Slide 1 — Bluetooth Is Quietly Controlling the Physical World

**Visual:** A car, a phone, and a BLE signal connecting them.

**On-slide text:** Title only.

**Talk track:** Bluetooth is no longer limited to accessories. It can control safety- and security-critical functions in the physical world.

### Slide 2 — Some Car Owners Did Not Know This Device Existed

**Visual:** A KARR module hidden beneath a dashboard, connected to locks, ignition, and the immobilizer.

**On-slide labels:**

- Hidden module
- Vehicle control
- Always advertising

**Talk track:** Aftermarket BLE modules can be installed without the eventual owner understanding that an active wireless control system remains in the vehicle.

### Slide 3 — We First Saw It as an Unknown Signal on a Highway

**Visual:** A map with BLE observations and one unfamiliar cluster highlighted.

**On-slide text:** `Unknown BLE cluster`

**Talk track:** The investigation began with wireless observations rather than a known product or application.

### Slide 4 — Turning That Signal into a Product Took a Manual Investigation

**Visual:** Reveal the following pipeline one step at a time:

```text
Signal → FCC records → APK → Hardware
```

**Talk track:** We combined wardriving, public records, application reverse engineering, hardware acquisition, and protocol experimentation to identify and analyze the product.

### Slide 5 — We Investigated Six Representative Products

**Visual:** Six product cards. Highlight the three vulnerable products in red.

**On-slide text:**

```text
6 products        3 critically vulnerable
```

**Talk track:** This was a comprehensive investigation of representative products in the aftermarket BLE vehicle-control ecosystem.

### Slide 6 — The Vulnerabilities Had Physical Consequences

**Visual:** Three large icons showing vehicle functions.

**On-slide labels:**

```text
Unlock        Start        Immobilize
```

**Talk track:** Weaknesses in pairing, authentication, and encryption crossed directly into physical vehicle control.

### Slide 7 — A Six-Product Study Does Not Scale to an Ecosystem

**Visual:** Six investigated products on the left; a much larger field of unknown BLE products on the right.

**On-slide text:** `Manual research does not scale.`

**Talk track:** The investigation was successful, but every product required substantial manual discovery, reverse engineering, procurement, experimentation, and disclosure work.

## Act II: Turning an Investigation into a Continuous System

### Slide 8 — What If This Investigation Never Stopped?

**Visual:** A simple loop, introduced progressively:

```text
Observe → Investigate → Validate → Monitor
   ↑                                  ↓
   └──────────────────────────────────┘
```

**Talk track:** The research vision is to transform a one-time study into a continuous BLE security observatory.

### Slide 9 — We Search the Ecosystem from Both Ends

**Visual:** Two sources meeting in the middle.

```text
BLE Scanner                           AndroZoo
MAC, ADV, GATT                       Android APKs
      └──────────→ Knowledge Base ←──────────┘
```

**On-slide labels:**

- Physical world
- Software ecosystem
- Meet in the middle

**Talk track:** Wireless observations reveal deployed devices; Android applications reveal product identities and protocol semantics. Each side helps resolve the unknowns on the other.

### Slide 10 — An Agent Turns an Unknown Cluster into a Product Hypothesis

**Visual:** Follow the cluster from Slide 3.

```text
Unknown cluster → Agent research → Candidate product and APK
```

**Talk track:** The agent begins with observable features, searches for candidate products and applications, and downloads the most promising APKs for analysis.

### Slide 11 — The APK Contains the Fingerprint

**Visual:** Three to six lines of real decompiled APK code. Highlight only the relevant values.

**On-slide labels:**

- Name pattern
- UUID
- Manufacturer data

**Talk track:** Scan filters and parsing logic provide evidence that connects an application to a particular class of physical devices.

### Slide 12 — The Physical Dataset Tests the Hypothesis

**Visual:** Apply the recovered fingerprint to the observation database, producing a set of matched devices on a map or timeline.

```text
APK fingerprint → Observation database → Matching devices
```

**Talk track:** The system returns to the wireless dataset to test whether the proposed fingerprint consistently identifies the expected cluster.

### Slide 13 — Every Attribution Comes with Evidence

**Visual:** One compact product-attribution card containing:

```text
Product identity
Code evidence
Database matches
Confidence
```

**Talk track:** The LLM does not simply declare an answer. It produces an executable fingerprint, direct evidence with provenance, validation results, and a conclusion that a researcher can reproduce.

### Slide 14 — We Can Test Vulnerability Hypotheses Before Buying Hardware

**Visual:** Begin with the first connection, then reveal the remaining validation path.

```text
Official app     → Emulated peripheral
Emulated central → Emulated peripheral
Emulated central → Real peripheral
```

Place the Lua BLE runtime underneath the emulated components.

**Talk track:** The agent converts its protocol hypothesis into executable Lua scripts. Application-side behavior and many protocol-design flaws can be investigated before committing to hardware purchases. Real hardware remains the final confirmation step.

### Slide 15 — Stable Workflows Can Scale into Agent Teams

**Visual:** Many independent cluster or APK jobs entering the same pipeline and producing a small number of alerts.

```text
Clusters/APKs → Parallel agent investigations → Alerts
```

**Talk track:** Once evidence formats, experiments, and decision points are reproducible, investigation throughput can grow by running more research agents concurrently. Shared fingerprints, SDKs, and protocol knowledge reduce repeated work.

### Slide 16 — Researchers Review Evidence, Not Millions of Devices

**Visual:** A single simplified alert card presented to a researcher.

**Alert card fields:**

- Suspected vulnerability
- Evidence and experiment
- Estimated impact
- Confidence
- Recommended next step

**Talk track:** Researchers review alerts, request additional evidence, approve hardware purchases, confirm impact, and manage responsible disclosure. The system scales evidence collection and investigation, not consequential security decisions.

## Act III: New Measurement Capabilities

### Slide 17 — Sparse Observations Can Reveal Deployment Scale

**Visual:** A few observed MAC addresses placed within a larger sequential address range, followed by a population estimate.

```text
Observed devices → Sequential allocation model → Estimated population
```

**Talk track:** For products with sequentially assigned MAC addresses, a calibrated model can estimate deployment beyond the devices directly observed by our scanners.

### Slide 18 — The Same Device Can Tell Us When It Was Patched

**Visual:** A timeline for one stable MAC address.

```text
MAC A   old ADV   old ADV   new ADV   new ADV
          ●─────────●─────────●─────────●
                  vulnerable       patched
```

**Talk track:** When vulnerable and patched versions produce distinguishable advertisements, repeated observations of the same device provide device-level evidence of remediation.

### Slide 19 — Disclosure Is Not the End

**Visual:** A complete lifecycle loop.

```text
Discover → Validate → Disclose → Measure Repair
    ↑                                  ↓
    └──────────────────────────────────┘
```

**Talk track:** We should measure whether mitigations reach deployed devices, how long adoption takes, and how many vulnerable devices remain.

### Slide 20 — From Six Products to a Continuously Monitored Ecosystem

**Visual:** Return to the car from Slide 1, then zoom out to a larger map of Bluetooth product categories, applications, vendors, protocols, and deployed devices.

**On-slide text:**

> Discover what Bluetooth controls. Understand how it works. Find what fails. Measure whether it is repaired.

**Talk track:** Restate the vision: move Bluetooth security research from manual, one-off investigations to continuous, ecosystem-scale monitoring.

## Shorter 15-Slide Version

For a shorter talk, combine:

- Slides 5 and 6: products and physical consequences
- Slides 10 and 11: agent investigation and APK evidence
- Slides 12 and 13: database validation and evidence-backed attribution
- Slides 15 and 16: agent scaling and human review
- Slides 19 and 20: lifecycle and closing vision

## Visual Language

Use the same colors throughout the deck:

- **Blue:** Real-world BLE observations
- **Purple:** Agent investigation
- **Yellow:** Unverified hypothesis
- **Green:** Validated evidence or remediation
- **Orange:** Human review or decision
- **Red:** Vulnerability or vulnerable device

Distinguish completed work from the proposed research system:

- **Solid lines:** Demonstrated in existing work
- **Dashed lines:** Proposed capability

## Text and Layout Rules

- Use a conclusion as the slide headline, not a topic label.
- Limit each slide to one idea.
- Prefer one dominant visual over several small figures.
- Use no more than three short labels on most slides.
- Do not place explanatory paragraphs on slides.
- Show only three to six lines when presenting code.
- Build complex diagrams progressively instead of revealing every component at once.
- Put technical details, qualifications, and transitions in speaker notes.
- Reuse the same unknown cluster throughout the talk so the audience follows an investigation rather than an architecture diagram.

## Assets to Collect

- A clear photo or diagram of the KARR module beneath a dashboard
- A highway BLE observation map
- The six-product comparison visual from the paper
- A minimal pairing/authentication/encryption result graphic
- A short, readable example of APK scan-filter or manufacturer-data parsing code
- A cluster-to-product attribution example
- A Lua central/peripheral interaction screenshot or diagram
- A sequential MAC allocation plot
- A device-level old-to-new advertisement transition
- A remediation adoption curve

## Open Decisions

- Final talk duration
- Audience familiarity with BLE and systems security
- Whether the future pipeline follows KARR retrospectively or a separate unknown cluster
- Which capabilities can be shown with real prototype results rather than conceptual diagrams
- The final deployment-impact figure used across the paper, website, and talk
