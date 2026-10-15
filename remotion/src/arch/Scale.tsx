import {C, Txt, inOut, lerp, p} from './kit';
import {type Ad, STRIPS, parseAds, rand, templateKey} from './data';
import {UNMATCHED} from './Cluster';
import {StripView} from './Strip';
import {Field} from './Field';
import {KB, KBHeader, KBRow, type KBEntry, KB_ORDER, SEED_ENTRIES, SHRINK} from './Knowledge';

// Everything here is a synthetic illustration of the proposed system scaling up.
const g = rand(9090);
const bytes = (n: number) => Array.from({length: n}, () => Math.floor(g() * 256));
const ascii = (s: string) => [...s].map((c) => c.charCodeAt(0));
const randomAds = (withName: boolean): Ad[] => {
  const pl: number[] = [];
  if (g() < 0.7) pl.push(0x02, 0x01, 0x06);
  if (g() < 0.6) {const u = Math.floor(g() * 0xffff); pl.push(0x03, 0x03, u & 255, u >> 8);}
  if (g() < 0.8) {const c = Math.floor(g() * 0x0fff); const d = bytes(2 + Math.floor(g() * 10)); pl.push(d.length + 3, 0xff, c & 255, c >> 8, ...d);}
  if (g() < 0.25) pl.push(0x02, 0x0a, Math.floor(g() * 256));
  if (withName) {const s = ['SB-', 'PT', 'RG-', 'TH', 'ES-', 'K'][Math.floor(g() * 6)] + 'x'.repeat(1 + Math.floor(g() * 4)); pl.push(s.length + 1, 0x09, ...ascii(s));}
  if (!pl.length) pl.push(0x02, 0x01, 0x06, 0x05, 0xff, 0x11, 0x0e, ...bytes(2));
  return parseAds(pl.slice(0, 31));
};

const NAMES = ['Smart bulb', 'Pet tracker', 'Bike computer', 'Thermostat', 'E-scooter', 'Smart scale?', 'Door sensor', 'Electric toothbrush',
  'Smart plug', 'Garage opener', 'Tire pressure sensor', 'Bike lock?', 'Fitness band', 'Dash cam', 'Speaker', 'Kitchen thermometer?',
  'Key finder', 'Smart ring', 'Air purifier', 'Baby monitor?', 'Camera remote', 'Game controller', 'Smart doorbell', 'Parking sensor'];
const TILE = {x0: 600, y0: 226, w: 108, h: 104, gx: 118, gy: 112, cols: 4};
const tileAt = (j: number) => ({x: TILE.x0 + (j % TILE.cols) * TILE.gx, y: TILE.y0 + Math.floor(j / TILE.cols) * TILE.gy});
const NEW = NAMES.map((name, j) => {
  const ads = randomAds(g() < 0.6);
  const members = 3 + Math.floor(g() * 4);
  const base = 46 + j * 16;
  return {ads, key: templateKey(ads), name, members, arrive: Array.from({length: members}, (_, m) => base + m * 20 + Math.floor(g() * 8))};
});
// Some earlier noise gains enough sightings to form a cluster: reuse those templates for a few new clusters.
const PROMOTED = [{j: 5, k: 2}, {j: 10, k: 5}, {j: 16, k: 9}]; // k indexes the Cluster scene's noise
PROMOTED.forEach(({j, k}) => {NEW[j].ads = STRIPS[UNMATCHED[k]].ads; NEW[j].key = templateKey(NEW[j].ads);});
const promotedAt = (j: number) => PROMOTED.find((q) => q.j === j);
const formedAt = (j: number) => NEW[j].arrive[2] + 22;
const BATCHES = [170, 280, 390, 500];
const batchOf = (j: number) => BATCHES.find((b) => b >= formedAt(j))!;
const RESOLVE = 46; // frames from batch start until the result lands in the KB
const ENTRIES: KBEntry[] = [...SEED_ENTRIES, ...NEW
  .map((t, j) => ({j, at: batchOf(j) + RESOLVE}))
  .sort((a, b) => a.at - b.at || a.j - b.j)
  .map(({j}) => ({ads: NEW[j].ads, product: NEW[j].name, detail: 'synthetic', status: NEW[j].name.endsWith('?') ? 'candidate' as const : 'attributed' as const}))];
const entryAt = (i: number) => i < SEED_ENTRIES.length ? -1 : batchOf(NEW.findIndex((t) => t.name === ENTRIES[i].product)) + RESOLVE;

// Incoming stream: known fingerprints, members of new templates, and noise.
type Flow = {t0: number; y0: number; ads: Ad[]; dest: 'kb' | 'tile' | 'noise'; idx: number};
const FLOWS: Flow[] = [];
const knownIdx = KB_ORDER.map((_, i) => i);
for (let t = 40; t < 500; t += 11) { // stop early so everything has landed before the clip ends
  const r = g();
  if (r < 0.62) {
    const i = knownIdx[Math.floor(g() * knownIdx.length)];
    FLOWS.push({t0: t, y0: 330 + g() * 640, ads: SEED_ENTRIES[i].ads, dest: 'kb', idx: i});
  } else if (r < 0.8) FLOWS.push({t0: t, y0: 330 + g() * 640, ads: randomAds(g() < 0.4), dest: 'noise', idx: FLOWS.length});
}
NEW.forEach((tpl, j) => tpl.arrive.forEach((t, m) => {
  const y0 = 330 + g() * 640;
  if (m > 0 || !promotedAt(j)) FLOWS.push({t0: t - 50, y0, ads: tpl.ads, dest: 'tile', idx: j}); // a promoted cluster's first member is the old noise strip
}));
const DRIFT = 44, ROUTE = 26;
const NOISE_SLOT = (i: number) => ({x: 600 + (i * 97) % 440, y: 930 + (i * 53) % 60, rot: ((i * 31) % 13 - 6)});

const ROW_H = 40;
const PINNED_END = KB.y + 80 + 6 * ROW_H; // the six seed entries stay pinned; new entries scroll below
const ROWS_VISIBLE = Math.floor((1000 - PINNED_END) / ROW_H);
const rowY = (i: number) => KB.y + 80 + i * ROW_H;

export const Scale = ({frame: s}: {frame: number}) => {
  const intro = p(s, 0, 36, inOut);
  const rowH = lerp(96, ROW_H, intro);
  const landed = (f: Flow) => f.t0 + DRIFT + ROUTE;
  const visibleEntries = ENTRIES.map((_, i) => i < SEED_ENTRIES.length || s >= entryAt(i));
  const batchActive = BATCHES.some((b) => s >= b && s < b + RESOLVE);
  const shown = ENTRIES.reduce((acc, _, i) => acc + (i < SEED_ENTRIES.length ? 0 : p(s, entryAt(i), entryAt(i) + 16, inOut)), 0);
  const scroll = Math.max(0, shown - ROWS_VISIBLE) * ROW_H;

  return <g>
    {/* previous scene fades out */}
    <g opacity={1 - intro} transform={`translate(${SHRINK.tx} ${SHRINK.ty}) scale(${SHRINK.s})`}>
      <Field group={() => ({investigate: 1, resolve: 1, opacity: 0.55})}/>
    </g>
    <g opacity={1 - p(s, 0, 20)}>
      <Txt x={40} y={780} size={34} color={C.text} weight={650}>Known fingerprints are reused:</Txt>
      <Txt x={40} y={826} size={34} color={C.text} weight={650}>only new templates need investigating</Txt>
    </g>

    {/* zone headers and counters */}
    <g opacity={p(s, 20, 44)}>
      <Txt x={60} y={196} size={26} color={C.text} weight={650}>Incoming</Txt>
      <Txt x={TILE.x0} y={196} size={26} color={C.text} weight={650}>New clusters</Txt>
      <Txt x={TILE.x0} y={918} size={22} color={C.faint}>noise</Txt>
      <line x1={540} x2={540} y1={220} y2={1000} stroke={C.line} strokeDasharray="4 6"/>
    </g>
    {batchActive && <g>
      <rect x={TILE.x0 + 200} y={170} width={260} height={36} rx={18} fill={C.purple} fillOpacity={0.16} stroke={C.purple}/>
      <Txt x={TILE.x0 + 330} y={195} size={20} color={C.purple} anchor="middle" weight={650}>agents investigating</Txt>
    </g>}

    {/* new-template tiles */}
    {NEW.map((tpl, j) => {
      const {x, y} = tileAt(j);
      const have = tpl.arrive.filter((t) => s >= t + 2).length;
      if (!have) return null;
      const formed = have >= 3;
      const b = batchOf(j);
      const inv = s >= b && s < b + RESOLVE;
      const done = s >= b + RESOLVE;
      const cand = tpl.name.endsWith('?');
      const stroke = done ? (cand ? C.yellow : C.green) : inv ? C.purple : formed ? C.text : C.faint;
      return <g key={j} opacity={done ? 0.45 : 1}>
        <rect x={x} y={y} width={TILE.w} height={TILE.h} rx={8} fill="#1a1a1a" stroke={stroke} strokeOpacity={formed ? 0.9 : 0.5}
          strokeDasharray={formed ? undefined : '4 4'} strokeWidth={inv ? 2 : 1}/>
        {tpl.arrive.slice(0, have).map((_, m) => <StripView key={m} ads={tpl.ads} x={x + 8} y={y + 18 + m * 13} pitch={3.6} h={8}
          parse={tpl.ads.length} solid={1} norm={1} sgap={2}/>)}
        {done && <Txt x={x + TILE.w - 8} y={y + TILE.h - 10} size={16} color={stroke} anchor="end" weight={700}>{cand ? '?' : '✓'}</Txt>}
      </g>;
    })}

    {/* the earlier noise sits in the noise bin; some of it later joins a new cluster */}
    {UNMATCHED.map((si, k) => {
      const n = NOISE_SLOT(500 + k * 7);
      const appear = p(s, 20, 44);
      const pr = PROMOTED.find((q) => q.k === k);
      const ads = STRIPS[si].ads;
      if (!pr) return <StripView key={k} ads={ads} x={n.x} y={n.y} pitch={4} h={7} rot={n.rot} parse={ads.length} solid={1} norm={1}
        sgap={2} opacity={0.45 * appear}/>;
      const t1 = NEW[pr.j].arrive[0];
      if (s >= t1 + 2) return null; // drawn inside the tile from now on
      const lit = p(s, t1 - 64, t1 - 44); // the noise strip lights up…
      const mv = p(s, t1 - 38, t1, inOut); // …then flies into its new cluster
      const {x, y} = tileAt(pr.j);
      return <StripView key={k} ads={ads} x={lerp(n.x, x + 8, mv)} y={lerp(n.y, y + 18, mv)} pitch={lerp(4, 3.6, mv)} h={lerp(7, 8, mv)}
        rot={n.rot * (1 - mv)} parse={ads.length} solid={1} norm={1} sgap={2} opacity={lerp(0.45, 1, lit) * appear}
        outline={lit > 0 && mv < 1 ? `rgba(255,255,255,${lit})` : undefined}/>;
    })}

    {/* flows */}
    {FLOWS.map((f, i) => {
      if (s < f.t0 || (f.dest === 'kb' && s > landed(f))) return null;
      const d = p(s, f.t0, f.t0 + DRIFT, (x) => x);
      const r = p(s, f.t0 + DRIFT, landed(f), inOut);
      let tx: number, ty: number, rot = 0, pitch = lerp(6, 4, r);
      if (f.dest === 'kb') {tx = KB.x + 36; ty = rowY(f.idx) + ROW_H / 2 - 3; pitch = lerp(6, 5, r);}
      else if (f.dest === 'tile') {
        if (s >= landed(f) + 2) return null; // drawn inside the tile from now on
        const {x, y} = tileAt(f.idx); const m = NEW[f.idx].arrive.indexOf(f.t0 + 50);
        tx = x + 8; ty = y + 18 + m * 13; pitch = lerp(6, 3.6, r);
      } else {const n = NOISE_SLOT(f.idx); tx = n.x; ty = n.y; rot = n.rot;}
      const x = lerp(lerp(60, 470, d), tx, r), y = lerp(f.y0, ty, r);
      const col = f.dest === 'kb' && r > 0 ? C.green : undefined;
      return <g key={i} opacity={f.dest === 'noise' ? lerp(1, 0.4, r) : 1}>
        <StripView ads={f.ads} x={x} y={y} pitch={pitch} h={lerp(10, 7, r)} rot={rot * r} parse={f.ads.length} solid={1} norm={1}
          sgap={2} outline={col}/>
      </g>;
    })}

    {/* knowledge base, growing */}
    <KBHeader/>
    <defs><clipPath id="kbclip"><rect x={KB.x - 10} y={PINNED_END} width={KB.w + 20} height={1010 - PINNED_END}/></clipPath></defs>
    <g clipPath="url(#kbclip)">
    {ENTRIES.map((e, i) => {
      if (!visibleEntries[i]) return null;
      const seed = i < SEED_ENTRIES.length;
      const at = entryAt(i);
      const hits = seed ? FLOWS.filter((f) => f.dest === 'kb' && f.idx === i && s >= landed(f)) : [];
      const lastHit = hits.length ? landed(hits[hits.length - 1]) : -99;
      const y = seed ? KB.y + 80 + i * rowH : rowY(i) - scroll;
      const row = <KBRow key={i} e={e} x={KB.x} y={y} w={KB.w} h={seed ? rowH : ROW_H} k={seed ? 1 : p(s, at, at + 10)}
        flash={seed ? 1 - p(s, lastHit, lastHit + 12) : 1 - p(s, at, at + 30)}
/>;
      return seed ? null : row;
    })}
    </g>
    {ENTRIES.slice(0, SEED_ENTRIES.length).map((e, i) => {
      const hits = FLOWS.filter((f) => f.dest === 'kb' && f.idx === i && s >= landed(f));
      const lastHit = hits.length ? landed(hits[hits.length - 1]) : -99;
      return <KBRow key={`seed${i}`} e={e} x={KB.x} y={KB.y + 80 + i * rowH} w={KB.w} h={rowH}
        flash={1 - p(s, lastHit, lastHit + 12)}/>;
    })}

  </g>;
};
