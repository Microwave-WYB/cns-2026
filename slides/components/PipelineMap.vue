<script setup lang="ts">
// System overview as a data flow: data sources (cylinders) → processes (boxes) → the knowledge base.
// Edges are labelled with the data they carry and animate as flowing streams.
// step 0: sources → Discover → Attribute → knowledge base, step 1: public sources, AI agents, and the knowledge base feed Attribute,
// step 2: the knowledge base feeds known fingerprints back into Discover, step 3: entries go on to Audit.
defineProps<{ step: number }>()
const INPUTS = [{ y: 150, t: 'BLE scans' }, { y: 230, t: 'App stores' }, { y: 310, t: 'Places' }]
const SOURCES = [{ x: 463, t: 'Search' }, { x: 523, t: 'FCC' }, { x: 583, t: 'APKs' }, { x: 643, t: 'SIG' }]
const AGENTS = [520, 550, 580, 610, 640]
// a database cylinder: body plus a top ellipse, (x, y) is the top-left corner
const cyl = (x: number, y: number, w: number, h: number) => {
  const r = 9
  return `M${x} ${y + r} A${w / 2} ${r} 0 0 0 ${x + w} ${y + r} L${x + w} ${y + h - r} A${w / 2} ${r} 0 0 1 ${x} ${y + h - r} Z`
}
const top = (x: number, y: number, w: number) => `M${x} ${y + 9} A${w / 2} 9 0 0 1 ${x + w} ${y + 9}`
</script>

<template>
  <svg viewBox="0 0 900 440" class="map">
    <defs>
      <marker v-for="c in ['#888', '#4ade80']" :id="`ah${c.slice(1)}`" :key="c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" :fill="c" />
      </marker>
    </defs>

    <!-- data sources -->
    <g v-for="i in INPUTS" :key="i.t">
      <path :d="cyl(20, i.y - 30, 140, 60)" class="store" />
      <path :d="top(20, i.y - 30, 140)" class="store-top" />
      <text x="90" :y="i.y + 12" class="body">{{ i.t }}</text>
      <path :d="`M162 ${i.y} L195 ${i.y} Q205 ${i.y} 205 ${i.y < 230 ? i.y + 10 : i.y > 230 ? i.y - 10 : i.y} L205 230 L226 230`"
        v-if="i.y !== 230" class="flow" />
      <line v-else x1="162" y1="230" x2="226" y2="230" class="flow" marker-end="url(#ah888)" />
    </g>
    <line x1="205" y1="230" x2="226" y2="230" class="flow" marker-end="url(#ah888)" />

    <!-- Discover -->
    <rect x="230" y="180" width="150" height="100" rx="14" class="proc" style="stroke:#4ea8ff" />
    <text x="305" y="238" class="stage" style="fill:#4ea8ff">Discover</text>

    <!-- Discover → Attribute -->
    <line x1="382" y1="230" x2="456" y2="230" class="flow" marker-end="url(#ah888)" />
    <text x="419" y="218" class="edge">unknown</text>
    <text x="419" y="252" class="edge">devices</text>

    <!-- Attribute -->
    <rect x="460" y="140" width="240" height="180" rx="14" class="proc" style="stroke:#a78bfa" />
    <text x="580" y="178" class="stage" style="fill:#a78bfa">Attribute</text>

    <!-- step 1: public sources feed the AI agents -->
    <g class="fade" :class="{ on: step >= 1 }">
      <g v-for="src in SOURCES" :key="src.t">
        <rect :x="src.x" y="44" width="56" height="36" rx="7" class="src" />
        <text :x="src.x + 28" y="67" class="label">{{ src.t }}</text>
        <line :x1="src.x + 28" y1="82" :x2="src.x + 28" y2="136" class="flow" marker-end="url(#ah888)" />
      </g>
      <g v-for="x in AGENTS" :key="x">
        <circle :cx="x" cy="222" r="12" class="agent-bg" />
        <circle :cx="x" cy="222" r="12" class="agent-ring" />
        <text :x="x" y="226" class="agent-label">AI</text>
      </g>
      <text x="580" y="266" class="body" style="fill:#c4b5fd">AI agents</text>
      <text x="580" y="296" class="small">+ human review</text>
      <!-- the knowledge base is also an input: agents start from what is already known -->
      <line x1="756" y1="258" x2="704" y2="258" class="flow loop" marker-end="url(#ah4ade80)" />
      <text x="729" y="280" class="edge" style="fill:#4ade80">known</text>
    </g>

    <!-- Attribute → knowledge base -->
    <line x1="702" y1="226" x2="756" y2="226" class="flow" marker-end="url(#ah888)" />
    <text x="729" y="214" class="edge">profiles</text>

    <!-- knowledge base -->
    <path :d="cyl(760, 170, 120, 120)" class="store" style="stroke:#4ade80" />
    <path :d="top(760, 170, 120)" class="store-top" style="stroke:#4ade80" />
    <text x="820" y="228" class="body" style="fill:#4ade80">Knowledge</text>
    <text x="820" y="252" class="body" style="fill:#4ade80">base</text>

    <!-- step 3: knowledge-base entries go on to Audit -->
    <g class="fade" :class="{ on: step >= 3 }">
      <line x1="820" y1="166" x2="820" y2="122" class="flow" marker-end="url(#ah888)" />
      <rect x="742" y="40" width="156" height="80" rx="14" class="proc" style="stroke:#f87171" />
      <text x="820" y="76" class="stage" style="fill:#f87171">Audit</text>
      <text x="820" y="104" class="edge">CVE match · review</text>
    </g>

    <!-- step 2: known fingerprints flow back into Discover -->
    <g class="fade" :class="{ on: step >= 2 }">
      <path d="M820 292 L820 372 Q820 380 812 380 L313 380 Q305 380 305 372 L305 284" class="flow loop" marker-end="url(#ah4ade80)" />
      <text x="562" y="405" class="edge" style="fill:#4ade80">known fingerprints: only new devices go on</text>
    </g>
  </svg>
</template>

<style scoped>
.map { width: 900px; height: 440px; display: block; margin: 0 auto; }
.proc { fill: #181818; stroke-width: 2.5; }
.store { fill: #1d2530; stroke: #4ea8ff; stroke-width: 1.8; }
.store-top { fill: none; stroke: #4ea8ff; stroke-width: 1.8; }
.src { fill: #222; stroke: #777; stroke-width: 1.5; }
.stage { font: 600 26px Inter, system-ui, sans-serif; text-anchor: middle; }
.body { font: 500 18px Inter, system-ui, sans-serif; fill: #eee; text-anchor: middle; }
.label { font: 500 14px Inter, system-ui, sans-serif; fill: #ddd; text-anchor: middle; }
.small { font: 400 15px Inter, system-ui, sans-serif; fill: #999; text-anchor: middle; }
.edge { font: 400 13px Inter, system-ui, sans-serif; fill: #aaa; text-anchor: middle; }
.flow { fill: none; stroke: #888; stroke-width: 2; stroke-dasharray: 6 5; animation: flow .8s linear infinite; }
.flow.loop { stroke: #4ade80; }
.fade { opacity: 0; transition: opacity .5s; }
.fade.on { opacity: 1; }
.agent-bg { fill: #241c3a; }
.agent-ring { fill: none; stroke: #a78bfa; stroke-width: 3; stroke-dasharray: 38 38; transform-box: fill-box; transform-origin: center; animation: spin .5s linear infinite; }
.agent-label { font: 600 10px Inter, system-ui, sans-serif; fill: #ccc; text-anchor: middle; }
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes flow { to { stroke-dashoffset: -11; } }
</style>
