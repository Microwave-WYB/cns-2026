// Synthetic, deterministic scene data. Nothing here is a real observation.

export const rand = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const hex = (n: number) => n.toString(16).toUpperCase().padStart(2, '0');
const ascii = (s: string) => [...s].map((c) => c.charCodeAt(0));

// ---------------------------------------------------------------- families
export type Kind = 'phone' | 'tag' | 'watch' | 'buds' | 'lock' | 'car';
export type FamilyId = 'A' | 'B' | 'C' | 'D' | 'E' | 'U' | 'N';
export type Features = {layout: string; uuid: string; mfg: string; name: string; addr: 'rotating' | 'static'};

type Family = {kind: Kind; features: Features; payload: (r: () => number, seed: number) => number[]};
const bytes = (r: () => number, n: number) => Array.from({length: n}, () => Math.floor(r() * 256));
const FLAGS = [0x02, 0x01, 0x06];
const uuid16 = (u: number) => [0x03, 0x03, u & 0xff, u >> 8];
const mfg = (company: number, data: number[]) => [data.length + 3, 0xff, company & 0xff, company >> 8, ...data];
const name = (s: string) => [s.length + 1, 0x09, ...ascii(s)];

export const FAMILIES: Record<Exclude<FamilyId, 'N'>, Family> = {
  A: {kind: 'phone', features: {layout: 'F·M', uuid: '—', mfg: '0F3A', name: '—', addr: 'rotating'},
    payload: (r) => [...FLAGS, ...mfg(0x0f3a, bytes(r, 10))]},
  B: {kind: 'tag', features: {layout: 'F·S·SD', uuid: 'FE2C', mfg: '—', name: '—', addr: 'rotating'},
    payload: (r) => [...FLAGS, ...uuid16(0xfe2c), 11, 0x16, 0x2c, 0xfe, ...bytes(r, 8)]},
  C: {kind: 'watch', features: {layout: 'F·S·N', uuid: '180D', mfg: '—', name: 'W-##', addr: 'static'},
    payload: (_r, s) => [...FLAGS, ...uuid16(0x180d), ...name(['W-4', 'W-4F', 'W-4F1', 'W-4F1C2'][s % 4])]},
  D: {kind: 'buds', features: {layout: 'F·M·N', uuid: '—', mfg: '0B21', name: 'BUDS', addr: 'rotating'},
    payload: (r) => [...FLAGS, ...mfg(0x0b21, bytes(r, 6)), ...name('BUDS')]},
  E: {kind: 'lock', features: {layout: 'F·S·M·N', uuid: 'FFF0', mfg: '0C77', name: 'LK-##', addr: 'static'},
    payload: (r, s) => [...FLAGS, ...uuid16(0xfff0), ...mfg(0x0c77, bytes(r, 4)), ...name(['LK-7', 'LK-7A', 'LK-7A90'][s % 3])]},
  U: {kind: 'car', features: {layout: 'F·S·M·N', uuid: 'F0FF', mfg: '0A4B', name: 'VX-##', addr: 'static'},
    payload: (r, s) => [...FLAGS, ...uuid16(0xf0ff), ...mfg(0x0a4b, [0x01, ...bytes(r, 6)]), ...name(['VX-22', 'VX-1A7F', 'VX-9', 'VX-31C'][s % 4])]},
};

// ---------------------------------------------------------------- map geometry
export const HWY = [[30, 905], [470, 870], [790, 330], [1320, 240]] as const;
export const bez = (t: number, P: readonly (readonly [number, number])[] = HWY) => {
  const u = 1 - t;
  const w = [u * u * u, 3 * u * u * t, 3 * u * t * t, t * t * t];
  return [w.reduce((s, k, i) => s + k * P[i][0], 0), w.reduce((s, k, i) => s + k * P[i][1], 0)] as [number, number];
};
const normal = (t: number) => {
  const [x0, y0] = bez(Math.max(0, t - 0.005));
  const [x1, y1] = bez(Math.min(1, t + 0.005));
  const l = Math.hypot(x1 - x0, y1 - y0);
  return [-(y1 - y0) / l, (x1 - x0) / l];
};
export const ROADS = [
  'M 120 140 C 300 420 260 700 420 1040',
  'M 560 120 C 640 380 760 520 980 620 S 1240 820 1320 1000',
  'M 40 480 C 360 520 720 600 1320 560',
  'M 900 110 C 960 300 1040 420 1320 420',
];
export const MAP = {x0: 30, y0: 110, x1: 1320, y1: 1040};

// ---------------------------------------------------------------- emitters
export type Emitter = {id: number; fam: FamilyId; kind: Kind; x: number; y: number; period: number; phase: number; seed: number};
const r = rand(20261012);
const KINDS: FamilyId[] = ['A', 'A', 'A', 'B', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'N', 'N', 'N', 'N'];
export const EMITTERS: Emitter[] = [];
const place = (fam: FamilyId, x: number, y: number) => {
  const kind = fam === 'N' ? (['tag', 'phone', 'buds'] as Kind[])[Math.floor(r() * 3)] : FAMILIES[fam].kind;
  EMITTERS.push({id: EMITTERS.length, fam, kind, x, y, period: 34 + Math.floor(r() * 40), phase: Math.floor(r() * 80), seed: 1 + EMITTERS.length});
};
// Unknown family: modules in vehicles parked along the highway.
[0.1, 0.22, 0.35, 0.47, 0.6, 0.73, 0.86].forEach((t, i) => {
  const [x, y] = bez(t);
  const [nx, ny] = normal(t);
  const d = (i % 2 ? 1 : -1) * (30 + r() * 26);
  place('U', x + nx * d, y + ny * d);
});
while (EMITTERS.length < 74) {
  const fam = KINDS[Math.floor(r() * KINDS.length)];
  let x: number, y: number;
  if (r() < 0.62) {
    const t = 0.02 + r() * 0.96;
    const [bx, by] = bez(t);
    const [nx, ny] = normal(t);
    const d = (r() < 0.5 ? -1 : 1) * (45 + r() * 190);
    x = bx + nx * d; y = by + ny * d;
  } else {
    x = MAP.x0 + 40 + r() * (MAP.x1 - MAP.x0 - 80);
    y = MAP.y0 + 40 + r() * (MAP.y1 - MAP.y0 - 80);
  }
  if (x < MAP.x0 + 20 || x > MAP.x1 - 20 || y < MAP.y0 + 20 || y > MAP.y1 - 20) continue;
  if (EMITTERS.some((e) => Math.hypot(e.x - x, e.y - y) < 34)) continue;
  place(fam, x, y);
}

// Unclusterable advertisers: each has its own arbitrary structure.
const noisePayload = (seed: number) => {
  const g = rand(seed * 2654435761);
  const parts: number[][] = [];
  if (g() < 0.6) parts.push(FLAGS);
  const pool: number[][] = [];
  if (g() < 0.5) pool.push(uuid16(Math.floor(g() * 0xffff)));
  if (g() < 0.35) pool.push([3 + Math.floor(g() * 6), 0x16, ...bytes(g, 2 + Math.floor(g() * 6))].map((v, i, a) => i === 0 ? a.length - 1 : v));
  if (g() < 0.75) pool.push(mfg(Math.floor(g() * 0x0fff), bytes(g, 1 + Math.floor(g() * 13))));
  if (g() < 0.4) pool.push([0x02, 0x0a, Math.floor(g() * 256)]);
  if (g() < 0.45) pool.push(name(['A1', 'TAG', 'SENS-9', 'Q', 'HUB-03X', 'm'][Math.floor(g() * 6)]));
  if (!pool.length) pool.push(mfg(0x0e00 + seed, bytes(g, 5)));
  pool.sort(() => g() - 0.5);
  let out = [...parts.flat(), ...pool.flat()];
  while (out.length > 31) out = out.slice(0, out.lastIndexOf(out[out.length - 1]));
  return out.length <= 31 ? out : [...FLAGS, ...mfg(0x0e00 + seed, bytes(g, 4))];
};

// ---------------------------------------------------------------- scanner + receptions
export const SCAN_END = 359; // end of the scan action; the segment then holds
export const RANGE = 175;
export const DRIVE = {start: 24, end: SCAN_END - 20, t0: 0.03, t1: 0.935};
export const scannerT = (frame: number) => {
  const k = Math.min(1, Math.max(0, (frame - DRIVE.start) / (DRIVE.end - DRIVE.start)));
  const s = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; // ease in-out
  return DRIVE.t0 + (DRIVE.t1 - DRIVE.t0) * (0.25 * s + 0.75 * k);
};
export const scannerAt = (frame: number) => bez(scannerT(frame));

export const addrFor = (e: Emitter, frame: number) => {
  const static_ = e.fam === 'C' || e.fam === 'E' || e.fam === 'U';
  const ar = rand(e.seed * 7919 + (static_ ? 0 : Math.floor((frame + e.phase * 3) / 140)));
  const b = bytes(ar, 6);
  b[0] = static_ ? b[0] | 0xc0 : (b[0] & 0x3f) | 0x40; // static random vs resolvable private
  return b;
};

export type Rx = {frame: number; e: Emitter; addr: number[]; payload: number[]; rssi: number; sx: number; sy: number};
export const RX: Rx[] = [];
for (let f = DRIVE.start; f <= SCAN_END - 12; f++) {
  const [sx, sy] = scannerAt(f);
  for (const e of EMITTERS) {
    if ((f + e.phase) % e.period !== 0) continue;
    const d = Math.hypot(e.x - sx, e.y - sy);
    if (d > RANGE) continue;
    const fam = e.fam === 'N' ? FAMILIES[(['A', 'B', 'D'] as const)[e.seed % 3]] : FAMILIES[e.fam];
    const pr = rand(e.seed * 104729 + (e.fam === 'U' ? 0 : f));
    let payload = fam.payload(pr, e.seed);
    if (e.fam === 'N') payload = noisePayload(e.seed);
    RX.push({frame: f, e, addr: addrFor(e, f), payload, rssi: -Math.round(48 + (d / RANGE) * 42), sx, sy});
  }
}
export const PACKET_FLIGHT = 10; // frames from emitter to scanner
export const rxArrive = (rx: Rx) => rx.frame + PACKET_FLIGHT;

export const fmtAddr = (a: number[]) => a.map(hex).join(':');
export const fmtBytes = (b: number[]) => b.map(hex);
export const fmtTime = (frame: number) => {
  const s = 7 + frame / 30; // synthetic clock
  return `21:43:${String(Math.floor(s)).padStart(2, '0')}.${Math.floor((s % 1) * 10)}`;
};
const CELLS = ['3F2A', '3F2B', '3F31', '3F32', '3F38', '3F39'];
export const cellOf = (rx: Rx) => CELLS[Math.min(CELLS.length - 1, Math.floor(scannerT(rx.frame) * CELLS.length))];

// The packet dissected in Collect: the last unknown-family reception before the scan ends.
export const HERO = [...RX].reverse().find((x) => x.e.fam === 'U' && rxArrive(x) <= SCAN_END - 4)!;

// ---------------------------------------------------------------- observation table
export const featuresOf = (rx: Rx): Features & {fam: FamilyId} => {
  if (rx.e.fam !== 'N') return {...FAMILIES[rx.e.fam].features, fam: rx.e.fam};
  return {layout: 'F·M', uuid: '—', mfg: hex((0x0100 + rx.e.seed * 13) >> 8 & 255) + hex((0x0100 + rx.e.seed * 13) & 255), name: '—', addr: 'rotating', fam: 'N'};
};
// Hero first, then the most recent receptions from other emitters (one per emitter).
export const ROWS: Rx[] = (() => {
  const out: Rx[] = [HERO];
  const seen = new Set([HERO.e.id]);
  const pool = RX.filter((x) => rxArrive(x) <= SCAN_END);
  // guarantee a second unknown-family record so grouping is visible
  const u2 = [...pool].reverse().find((x) => x.e.fam === 'U' && !seen.has(x.e.id));
  if (u2) {out.push(u2); seen.add(u2.e.id);}
  for (const x of [...pool].reverse()) {
    if (out.length >= 12) break;
    if (seen.has(x.e.id)) continue;
    seen.add(x.e.id);
    out.push(x);
  }
  // display order: chronological except hero pinned on top
  return [HERO, ...out.slice(1).sort((a, b) => a.frame - b.frame)];
})();

// ---------------------------------------------------------------- embedding
export const SCATTER = {x0: 790, y0: 150, x1: 1850, y1: 900};
type Blob = {cx: number; cy: number; sx: number; sy: number; rot: number; bend: number; n: number};
export const BLOBS: Record<Exclude<FamilyId, 'N'>, Blob> = {
  A: {cx: 1080, cy: 330, sx: 105, sy: 42, rot: -0.35, bend: 0.0028, n: 96},
  B: {cx: 1590, cy: 270, sx: 58, sy: 36, rot: 0.5, bend: 0, n: 52},
  C: {cx: 1720, cy: 560, sx: 34, sy: 66, rot: 0.15, bend: 0, n: 40},
  D: {cx: 1270, cy: 600, sx: 74, sy: 34, rot: 0.42, bend: -0.004, n: 48},
  E: {cx: 950, cy: 690, sx: 30, sy: 20, rot: -0.2, bend: 0, n: 16},
  U: {cx: 1500, cy: 800, sx: 30, sy: 15, rot: -0.12, bend: 0, n: 15},
};
const gauss = (g: () => number) => {
  const u = Math.max(1e-6, g());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * g());
};
export type Pt = {fam: FamilyId; x: number; y: number; x0: number; y0: number; delay: number; row?: number};
export const POINTS: Pt[] = (() => {
  const g = rand(77);
  const pts: Pt[] = [];
  const start = () => [SCATTER.x0 + g() * (SCATTER.x1 - SCATTER.x0), SCATTER.y0 + g() * (SCATTER.y1 - SCATTER.y0)];
  (Object.keys(BLOBS) as (keyof typeof BLOBS)[]).forEach((fam) => {
    const b = BLOBS[fam];
    for (let i = 0; i < b.n; i++) {
      const u = gauss(g) * b.sx, v = gauss(g) * b.sy + b.bend * u * u;
      const [x0, y0] = start();
      pts.push({fam, x: b.cx + u * Math.cos(b.rot) - v * Math.sin(b.rot), y: b.cy + u * Math.sin(b.rot) + v * Math.cos(b.rot), x0, y0, delay: g()});
    }
  });
  for (let i = 0; i < 34; i++) {
    const [x0, y0] = start();
    const [x, y] = start();
    pts.push({fam: 'N', x, y, x0, y0, delay: g()});
  }
  // bind each table row to one point of its family
  ROWS.forEach((rx, row) => {
    const fam = featuresOf(rx).fam;
    const p = pts.find((q) => q.fam === fam && q.row === undefined && (fam !== 'N' || (q.x > 900 && q.y > 450)));
    if (p) p.row = row;
  });
  return pts;
})();

// Convex hull, pushed outward, as a smooth closed path.
export const hullPath = (fam: FamilyId, pad = 18) => {
  const P = POINTS.filter((p) => p.fam === fam).map((p) => [p.x, p.y] as [number, number]);
  P.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o: number[], a: number[], b: number[]) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lo: number[][] = [], hi: number[][] = [];
  for (const p of P) {while (lo.length >= 2 && cross(lo[lo.length - 2], lo[lo.length - 1], p) <= 0) lo.pop(); lo.push(p);}
  for (const p of [...P].reverse()) {while (hi.length >= 2 && cross(hi[hi.length - 2], hi[hi.length - 1], p) <= 0) hi.pop(); hi.push(p);}
  const H = [...lo.slice(0, -1), ...hi.slice(0, -1)];
  const cx = H.reduce((s, p) => s + p[0], 0) / H.length, cy = H.reduce((s, p) => s + p[1], 0) / H.length;
  const Q = H.map(([x, y]) => {const l = Math.hypot(x - cx, y - cy) || 1; return [x + (x - cx) / l * pad, y + (y - cy) / l * pad];});
  const n = Q.length;
  let d = `M ${Q[0][0].toFixed(1)} ${Q[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = Q[(i - 1 + n) % n], p1 = Q[i], p2 = Q[(i + 1) % n], p3 = Q[(i + 2) % n];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return {d: d + ' Z', top: Math.min(...Q.map((q) => q[1])), bottom: Math.max(...Q.map((q) => q[1])), left: Math.min(...Q.map((q) => q[0])), right: Math.max(...Q.map((q) => q[0])), cx, cy};
};

// ---------------------------------------------------------------- AD structures and templates
export type AdType = 'flags' | 'uuid' | 'svc' | 'mfg' | 'name' | 'tx';
export type Ad = {type: AdType; bytes: number[]; id: string; label: string};
const TYPE: Record<number, AdType> = {0x01: 'flags', 0x03: 'uuid', 0x16: 'svc', 0xff: 'mfg', 0x09: 'name', 0x0a: 'tx'};
export const parseAds = (payload: number[]): Ad[] => {
  const out: Ad[] = [];
  for (let i = 0; i < payload.length;) {
    const len = payload[i];
    const bytesAd = payload.slice(i, i + len + 1);
    const type = TYPE[payload[i + 1]];
    const d = bytesAd.slice(2);
    const id = type === 'uuid' || type === 'svc' || type === 'mfg' ? hex(d[1]) + hex(d[0]) : '';
    const label = type === 'tx' ? 'Tx power' : type === 'flags' ? 'Flags' : type === 'uuid' ? `UUID ${id}` : type === 'svc' ? 'Service data'
      : type === 'mfg' ? `Mfg ${id}` : `"${String.fromCharCode(...d)}"`;
    out.push({type, bytes: bytesAd, id, label});
    i += len + 1;
  }
  return out;
};
// Template: AD types in order, their lengths and identifiers. Name: neither value nor length matters.
export const templateKey = (ads: Ad[]) => ads.map((a) => a.type === 'name' ? 'name:*' : `${a.type}:${a.bytes.length}:${a.id}`).join('|');

export type Strip = {rx: Rx; ads: Ad[]; key: string};
// One strip per heard emitter (latest reception), in order of first hearing.
export const STRIPS: Strip[] = (() => {
  const latest = new Map<number, Rx>();
  for (const x of RX) if (rxArrive(x) <= SCAN_END) latest.set(x.e.id, x);
  return [...latest.values()].sort((a, b) => a.frame - b.frame).map((rx) => {
    const ads = parseAds(rx.payload);
    return {rx, ads, key: templateKey(ads)};
  });
})();
export const GROUP_ORDER: FamilyId[] = ['A', 'B', 'C', 'D', 'E', 'U'];

// ---------------------------------------------------------------- attribution (all synthetic)
export type Product = {product: string; app: string; vendor: string; status: 'attributed' | 'candidate'};
export const PRODUCTS: Record<Exclude<FamilyId, 'N'>, Product> = {
  A: {product: 'Smartphone proximity beacon', app: 'OS companion service', vendor: 'Vendor A', status: 'attributed'},
  B: {product: 'Item tracker tag', app: 'TagFind', vendor: 'Vendor B', status: 'attributed'},
  C: {product: 'Fitness watch', app: 'W-Fit', vendor: 'Vendor C', status: 'attributed'},
  D: {product: 'Wireless earbuds', app: 'Buds Connect', vendor: 'Vendor D', status: 'attributed'},
  E: {product: 'Smart lock?', app: 'two candidate apps', vendor: 'unresolved', status: 'candidate'},
  U: {product: 'Aftermarket vehicle module', app: 'VX Link', vendor: 'Vendor K', status: 'attributed'},
};
