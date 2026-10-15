# Toward a Continuous, Ecosystem-Scale Bluetooth Security Observatory

## Central Thesis

Bluetooth security research should move from manual, one-off product investigations to continuous, ecosystem-scale security monitoring.

This talk begins with our study of six representative aftermarket automotive BLE products and uses it to motivate a broader research agenda: a scalable system that discovers Bluetooth products, understands how they work, identifies security failures, prioritizes findings for researchers, and measures whether fixes reach deployed devices.

## Talk Outline

### 1. Opening: An Invisible Ecosystem in the Air

- Begin with KARR, an aftermarket BLE module hidden beneath a vehicle's dashboard.
- Many vehicle owners did not know that the module was installed, yet it continuously advertised over BLE and could control door locks, ignition, and the immobilizer.
- Our investigation began not with the product itself, but with an unfamiliar cluster of BLE signals observed on highways.
- Opening question: **How much can we learn about the security of the physical world by listening to Bluetooth?**

### 2. Case Study: BLE Theft Auto

- Explain why aftermarket automotive BLE systems are security-critical:
  - Smartphone applications act as vehicle remotes.
  - Aftermarket modules cross the vehicle's existing security boundary.
  - Vendors implement proprietary application-layer pairing, authentication, and encryption.
- Present the manual investigation workflow:

  ```text
  Wardriving
      -> Cluster advertisements
      -> Identify candidate products
      -> Find and reverse engineer APKs
      -> Purchase hardware
      -> Analyze protocols
      -> Validate attacks
      -> Estimate deployment
      -> Responsibly disclose vulnerabilities
  ```

- Summarize the study:
  - We comprehensively studied six representative products in the aftermarket BLE vehicle-control ecosystem.
  - We analyzed their pairing, authentication, and encryption mechanisms.
  - We found critical vulnerabilities in three products.
  - We demonstrated that crowdsourced wireless observations could help locate vulnerable products.
  - We used sequential MAC address allocation to estimate real-world deployment.
  - Our disclosures led vendors to develop and deploy mitigations.

### 3. The Scaling Problem

- Six products already required substantial manual effort in product discovery, app reverse engineering, hardware acquisition, protocol analysis, experimentation, and disclosure.
- The Bluetooth ecosystem contains far more products, applications, versions, and shared software components than researchers can investigate manually.
- Products and protocols continue to change after a study is published.
- A one-time investigation usually cannot determine whether a mitigation is actually deployed in the physical world.
- Motivating question: **Can we turn this manual investigation workflow into a continuous research system?**

### 4. Vision: A BLE Security Observatory

The proposed system covers the complete research lifecycle:

```text
Observe -> Cluster -> Attribute -> Analyze
        -> Validate -> Alert -> Disclose -> Monitor
```

It investigates the ecosystem from two complementary directions.

#### 4.1 From the Physical World to Software

- Use our BLE scanners to collect MAC addresses, advertisements, GATT profiles, locations, and timestamps.
- Cluster structurally and behaviorally similar devices.
- Ask an agent to investigate an unknown cluster and identify candidate products and applications.
- Download and reverse engineer candidate APKs.
- Extract attribution evidence and executable fingerprints.
- Query the observation database to validate the proposed product-to-signal association.

#### 4.2 From Software to the Physical World

- Begin with the large Android application corpus available through AndroZoo.
- Use manifest metadata, permissions, BLE APIs, and other static features to identify likely Bluetooth applications.
- Reverse engineer those applications to extract fingerprints and protocol behavior.
- Search the wireless observation database for matching physical devices.

The two directions meet in the middle:

> We search from both ends---millions of wireless observations and millions of Android applications---and connect software to devices in the physical world.

### 5. Evidence-Driven Product Attribution

An agent can combine several forms of evidence:

- MAC OUI assignments
- Assigned service UUIDs and manufacturer IDs
- Device-name patterns
- Advertisement field structure and ordering
- Manufacturer-data parsing logic
- GATT services and characteristics
- Scan filters and connection logic recovered from APKs
- Public product, vendor, developer, and regulatory information

The LLM should not simply declare a product identity. Each attribution should produce:

- An executable fingerprint
- Direct supporting evidence and provenance
- Database validation results
- A confidence estimate
- A reproducible explanation that a researcher can review

Over time, these results form a shared BLE ecosystem knowledge base:

```text
Signal <-> Fingerprint <-> Product <-> Application
       <-> Vendor <-> Shared SDK <-> Protocol <-> Vulnerability
```

### 6. Agent-Driven Security Investigation

After attributing a product, agents can investigate its:

- Pairing and enrollment
- Authentication and authorization
- Encryption and key management
- Replay protection and protocol freshness
- Update and revocation mechanisms
- Shared libraries, SDKs, developers, and supply-chain relationships

The goal is not merely to apply an LLM to one reverse-engineering task. The goal is to connect discovery, attribution, reverse engineering, validation, impact measurement, and remediation monitoring into one systematic pipeline.

### 7. Pre-Hardware Vulnerability Validation with BLE Simulation

- Convert reverse-engineered protocol hypotheses into executable Lua BLE scripts.
- Support both central and peripheral behavior.
- Test interactions in three configurations:

  ```text
  Official application -> Emulated peripheral
  Emulated central     -> Emulated peripheral
  Emulated central     -> Real peripheral
  ```

- Before purchasing hardware, use emulation to investigate whether:
  - The official application accepts an emulated or spoofed peripheral.
  - Pairing lacks required physical confirmation.
  - Credentials or keys are fixed, shared, or predictable.
  - Authentication, replay protection, or protocol state can be bypassed.
  - The recovered protocol is sufficiently complete to exercise a suspected vulnerability.
- Use real hardware for final confirmation of device-side behavior, end-to-end impact, and responsible disclosure.

> Hardware acquisition should become the final confirmation step, rather than the beginning of every investigation.

### 8. Scaling with Agent Research Teams

Once the investigation pipeline is stable and reproducible, independent product investigations can run concurrently:

- Cluster-triage agents
- Product-attribution agents
- APK-discovery agents
- Reverse-engineering agents
- Fingerprint-extraction agents
- Protocol-emulation agents
- Vulnerability-validation agents
- Cross-product and shared-SDK correlation agents

All agents contribute to and reuse a shared evidence base. A protocol, SDK, fingerprint, or security failure learned from one product can accelerate the investigation of related products.

The system evolves through three stages:

1. **Human-led:** Researchers manually investigate a small number of products.
2. **Agent-assisted:** Agents gather evidence, reverse engineer software, and run preliminary experiments under researcher supervision.
3. **Agent-scaled:** Teams of agents investigate many product clusters concurrently while researchers focus on high-impact findings and consequential decisions.

### 9. Human Oversight and Actionable Security Alerts

Researchers remain responsible for reviewing agent-generated alerts. Each alert should include:

- Product, application, and version information
- The vulnerability hypothesis and trigger
- Relevant code and protocol evidence
- An executable product fingerprint
- BLE simulation results
- Real-world observation matches
- Estimated deployment and potential impact
- Confidence, uncertainties, and known limitations
- Recommended hardware and next validation steps

Researchers decide whether to:

- Reject or merge an alert
- Ask agents to gather additional evidence
- Purchase and test hardware
- Confirm security impact
- Contact affected vendors
- Begin responsible disclosure

> The system does not automate vulnerability disclosure. It automates evidence collection and investigation, then presents researchers with actionable, reviewable alerts.

### 10. Measuring Deployment and Remediation

The observatory can measure impact beyond the devices directly observed by scanners.

#### 10.1 Deployment-Scale Estimation

- Identify products that allocate MAC addresses sequentially.
- Use observed address patterns and a calibrated statistical model to estimate the deployed population.
- Estimate the number of affected devices, the deployment rate, and the sizes of different product or manufacturing cohorts.
- Report assumptions and uncertainty rather than treating the largest observed address as an exact sales count.

#### 10.2 Device-Level Remediation Measurement

- Distinguish vulnerable and patched versions using changes in advertisements or other observable fingerprints.
- Track the signals emitted by the same stable MAC address at different times.
- Observe individual devices transitioning from a vulnerable fingerprint to a patched fingerprint.
- Measure:
  - Patch adoption
  - Time to remediation
  - Geographic or cohort-level differences
  - Rollbacks or inconsistent transitions
  - The long tail of devices that remain vulnerable
  - Whether newly deployed devices still use the vulnerable version

KARR provides a motivating example because its old and new versions produce distinguishable advertisements.

> We do not merely observe that a new protocol becomes more common. We observe individual devices transition from a vulnerable fingerprint to a patched fingerprint.

Together, deployment estimation and longitudinal tracking answer:

> How many vulnerable devices were deployed, how quickly are they being patched, and how many remain vulnerable today?

### 11. Research Questions and Evaluation

The research agenda should evaluate:

- **Coverage:** How much of the observable BLE and Android application ecosystems can the system classify?
- **Attribution:** How accurate, explainable, and reproducible are product fingerprints?
- **Agent performance:** How much analyst time and effort does the pipeline save?
- **Simulation value:** How many hypotheses can be validated or rejected before purchasing hardware?
- **Scalability:** How does investigation throughput change as the agent team grows?
- **Knowledge reuse:** How effectively do findings transfer across products that share developers, SDKs, or protocols?
- **Security value:** Can the system discover previously unknown vulnerabilities and insecure practices?
- **Measurement accuracy:** How well do deployment and remediation estimates agree with available ground truth?
- **Safety and ethics:** How should the system manage privacy, sensitive artifacts, active testing, and responsible disclosure?

### 12. Closing: Following the Complete Vulnerability Lifecycle

Return to the KARR story:

```text
Observe an unknown signal
    -> Identify the product
    -> Discover and validate a vulnerability
    -> Estimate its deployment
    -> Responsibly disclose it
    -> Observe deployed devices transition to the fix
```

The final vision is a continuous system that discovers Bluetooth products, understands how they work, identifies security failures, and measures whether the physical world is actually repaired.

> Disclosure is not the end of a vulnerability study. We should measure whether remediation reaches the physical world.

## Suggested Narrative Device

Rather than presenting the future system as a list of components, follow one unknown BLE cluster through the entire investigation. Show how it moves from observation, to APK discovery, attribution, reverse engineering, simulation, hardware validation, alert review, disclosure, and finally remediation measurement. The architecture will emerge naturally from the investigation story.

## Items to Resolve

- Talk length and expected audience
- Desired balance between the completed automotive study and the future research agenda
- Whether to present KARR throughout the talk or introduce a hypothetical new cluster for the future pipeline
- The final deployment-impact figure to use consistently across the paper, website, and talk
- How much implementation detail to include for the scanner, knowledge base, agent orchestration, and Lua BLE runtime
