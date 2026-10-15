# Architecture demonstration — first prototype

## Scope and owner

Root coordinates; persistent writer implements in its isolated workspace; persistent reviewer independently reviews there. Only root installs reviewed files into this live project. Preserve ../README.md and ../SLIDES.md and the existing CNSIntro.

User scope update: implement ONLY scanning -> collection -> clustering, then hold on the completed cluster view for user feedback. Do not implement APK, attribution, simulation, review, opening or closing. English visual labels; no voiceover/music. Aim for 25–40 seconds excluding presenter pauses.

## Visual narrative

Use a continuous dark spatial canvas, SVG devices/roads, visible packet movement, field tokens, point clouds and evidence links. Camera pans/zooms and transformations should connect stages, not replace slides with heading/bullets. A recognizable selected cluster persists throughout. Keep text sparse and legible from the back of a room.

1. Scan: a moving scanner receives advertisements from multiple nearby device types. Radio wave arcs and packets make collection visible. Enlarge one packet into MAC, ADV, RSSI, timestamp/location. GATT is separately acquired through authorized active interaction, not inside a passive advertisement.
2. Collect: packets travel into a structured observation store. Show records accumulating with provenance and fields; do not merely draw a box named Database.
3. Cluster: records/points reorganize by advertisement structure and behavior into visible families; one unknown family stays highlighted. Similarity is a hypothesis, not identity proof.
Stop here. Final frame: several visible cluster families, one selected unknown family, and a concise indication that similarity does not establish product identity. No next-stage teaser or ending title card.

## Truthfulness

All scene data and code are synthetic examples and labeled illustrative. The system is a proposed architecture, not a recording of a working end-to-end pipeline. Use a small persistent 'Illustrative architecture' label and distinguish proposed connections (dashed). Do not show real MACs, location data, named product attribution, proven vulnerability or statistics without source evidence. Blue observations, purple agent analysis, yellow hypotheses, green validated example matches, orange human decisions; red only for explicitly hypothetical security concern.

## Playback

Add a minimal browser presenter using @remotion/player and Vite. Keep one continuous composition with a single exported segment table. Each segment plays to its last frame and holds; the next click/Space/Right begins the next range. Previous/Left and replay supported. Midsegment advance should skip to that segment's final frame, not race multiple transitions; repeated key events ignored. At the final segment remain at its end (no implicit wrap). Explicit pause and uninterrupted preview mode are useful if cheap. Fullscreen and clickable controls should work on desktop and touch. Avoid double handling Player clicks/space. No auto-play on page load. Player outFrame + moveToBeginningWhenEnded=false preferred over frame-event timing races. All animation derives from frames, not CSS time or random values.

## Evolving file plan

- src/Architecture.tsx: continuous frame-driven visuals.
- src/segments.ts: shared segment boundaries/labels.
- src/Root.tsx: retain CNSIntro, register Architecture composition.
- src/presenter.tsx, index.html, minimal styles if needed: presenter interaction.
- package.json / package-lock.json: matching @remotion/player 4.0.534 and minimal Vite dependency, scripts for presenter/build and Architecture render.
- tsconfig.json: only required adjustments.
- README.md: commands, controls, synthetic-data limitations.
- a small runnable playback-state check, if logic extracted; no large testing framework.

No unrelated abstraction, backend, external media/API, skill installer, or live project edits by agents. Coordinator owns scope changes.

## Acceptance

Typecheck and presenter production build pass; Architecture can render PNG frames and a full MP4. Inspect an overview contact sheet plus segment-ending frames, not code alone. Test click/keyboard next, hold at each end, previous/replay, final-end behavior and key-repeat protection in a browser if available. Reviewer checks content fidelity, GATT distinction, proposed/synthetic labels, segment bounds and presentation usability independently. Root installs after review, starts presenter bound only to Tailnet, and verifies HTTP and actual browser rendering.
