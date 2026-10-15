# CNS Remotion — unreviewed architecture draft

A continuous 34-second, 1920×1080 / 30fps SVG narrative: scan → collect → cluster.
CNSIntro remains registered and unchanged. No opening/closing, APK, attribution,
simulation, review, remote assets, APIs, real datasets, music or voiceover.

## Run

```sh
npm ci
npm run typecheck
npm run check:playback
npm run build
npm run presenter -- --port 5173
```

Presenter binds only 127.0.0.1. No Tailnet or public exposure is configured here.
Studio remains `npm run dev`. Render: `npm run render:architecture`.
Still: `npx remotion still src/index.ts Architecture out/cluster.png --frame=1019`.

First click / Space / Right starts. While a segment is moving, advance reveals
its final frame and holds; the next advance begins the following segment.
Natural ends hold at frames 329, 659, 1019. Final advance never wraps.
Left / Previous goes to the previous segment start; R / Replay repeats current
segment; P / Pause toggles; F / Fullscreen uses the browser fullscreen API.
Controls are native keyboard-focusable buttons. Repeated keydown and duplicate
advances within 220ms are ignored. Continuous preview disables intermediate
holds, but still stops at frame 1019. There is no ended-event transition handler.

## Truthfulness / draft limitations

All addresses, packet bytes, cells, times and sightings are synthetic. ADV
payload is separated visually from source address and scanner-added RSSI,
timestamp and location metadata. GATT is intentionally omitted; it is not part
of passive ADV. Dots represent sightings, not unique devices or population
estimates. Similarity and family grouping are illustrative hypotheses, not
confirmed product identities; repeated sightings and address changes confound
identity. d07 is only a synthetic lineage marker. Dashed paths are proposed
connections, not a recording of a working pipeline.

This first draft uses deterministic invented group membership and a manually
laid-out similarity projection, not a clustering algorithm or performance
result. Full video rendering and independent visual/browser review were deferred
at the user's request for an immediate preview.

