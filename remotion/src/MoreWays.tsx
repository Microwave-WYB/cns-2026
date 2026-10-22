import {AbsoluteFill, Sequence, useCurrentFrame} from 'remotion';
import {C, Glyph, MONO, SANS, Txt, inOut, lerp, p, useFonts} from './arch/kit';
import {type Ad, parseAds, rand} from './arch/data';
import {KBRow, type KBEntry, SEED_ENTRIES} from './arch/Knowledge';
import {StripView} from './arch/Strip';

// "More ways in": apps and places as extra sources of leads; WiGLE only validates.
// Everything shown is synthetic — no real hospital data, names, locations or counts.
export const MW = {apps: 480, places: 480, converge: 240};
export const MW_DURATION = MW.apps + MW.places + MW.converge;

// ---------------------------------------------------------------- synthetic entries
const ascii = (s: string) => [...s].map((c) => c.charCodeAt(0));
const ad = (o: {uuid?: number; mfg?: [number, number]; name?: string; svc?: number}): Ad[] => {
  const g = rand((o.uuid ?? 0) + (o.mfg?.[0] ?? 0) + (o.name?.length ?? 0) * 977);
  const pl = [0x02, 0x01, 0x06];
  if (o.uuid) pl.push(0x03, 0x03, o.uuid & 255, o.uuid >> 8);
  if (o.svc) pl.push(o.svc + 3, 0x16, 0x34, 0x12, ...Array.from({length: o.svc}, () => Math.floor(g() * 256)));
  if (o.mfg) pl.push(o.mfg[1] + 3, 0xff, o.mfg[0] & 255, o.mfg[0] >> 8, ...Array.from({length: o.mfg[1]}, () => Math.floor(g() * 256)));
  if (o.name) pl.push(o.name.length + 1, 0x09, ...ascii(o.name));
  return parseAds(pl);
};
type Lead = KBEntry & {src: 'app' | 'place'};
const APP_LEADS: Lead[] = [
  {ads: ad({uuid: 0xfee7, mfg: [0x0d12, 6], name: 'ES-4'}), product: 'E-scooter', detail: '', status: 'attributed', src: 'app'},
  {ads: ad({mfg: [0x0b77, 9]}), product: 'Bike computer', detail: '', status: 'attributed', src: 'app'},
  {ads: ad({uuid: 0xfff3, name: 'BULB'}), product: 'Smart bulb', detail: '', status: 'attributed', src: 'app'},
  {ads: ad({uuid: 0xfd2a, svc: 6}), product: 'Pet tracker', detail: '', status: 'attributed', src: 'app'},
  {ads: ad({mfg: [0x0e31, 4], name: 'TH-2'}), product: 'Thermostat', detail: '', status: 'attributed', src: 'app'},
  {ads: ad({uuid: 0xffb0, mfg: [0x0a90, 3]}), product: 'Kitchen scale', detail: '', status: 'attributed', src: 'app'},
];
const PLACE_LEADS: Lead[] = [
  {ads: ad({mfg: [0x0059, 8], name: 'EmTag'}), product: 'EmTag', detail: '', status: 'candidate', src: 'place'},
  {ads: ad({mfg: [0x038d, 6], name: 'ResMed 000000'}), product: 'ResMed', detail: '', status: 'candidate', src: 'place'},
  {ads: ad({mfg: [0x0c4e, 5], name: 'PrimexClock'}), product: 'PrimexClock', detail: '', status: 'candidate', src: 'place'},
];
const WIGLE_ROW = 0; // the app lead with a distinctive name, checked against WiGLE

// ---------------------------------------------------------------- knowledge base panel
const KBP = {x: 1220, y: 150, w: 660, row: 46};
const SRC_LABEL = {scan: 'scans', app: 'apps', place: 'places'};
const KnowledgePanel = ({f}: {f: number}) => {
  const appIn = (i: number) => appKbIn(f, i);
  const placeIn = (i: number) => p(f, MW.apps + 340 + i * 12, MW.apps + 366 + i * 12, inOut);
  const conv = f - MW.apps - MW.places;
  const pulse = conv > 0 ? 0.5 + 0.5 * Math.sin(conv / 6) : 0;
  const rows: {e: KBEntry; src: keyof typeof SRC_LABEL; k: number; checked?: number}[] = [
    ...SEED_ENTRIES.map((e) => ({e, src: 'scan' as const, k: 1})),
    ...APP_LEADS.map((e, i) => ({e, src: 'app' as const, k: appIn(i), checked: i === WIGLE_ROW ? p(f, 404, 414) : 0})),
    ...PLACE_LEADS.map((e, i) => ({e, src: 'place' as const, k: placeIn(i)})),
  ];
  return <g>
    <Txt x={KBP.x} y={KBP.y + 22} size={30} color={C.text} weight={700}>Knowledge base</Txt>
    <rect x={KBP.x - 14} y={KBP.y + 44} width={KBP.w + 28} height={rows.length * KBP.row + 22} rx={14} fill="none"
      stroke={C.green} strokeOpacity={0.15 + 0.5 * pulse} strokeWidth={2}/>
    {rows.map(({e, src, k, checked}, i) => {
      const y = KBP.y + 56 + i * KBP.row;
      return <g key={i} opacity={k} transform={`translate(${(1 - k) * -300} 0)`}>
        <KBRow e={e} x={KBP.x} y={y} w={KBP.w} h={KBP.row} flash={1 - k}/>
        <Txt x={KBP.x + KBP.w - 14} y={y + KBP.row / 2 + 4} size={17} anchor="end"
          color={src === 'scan' ? C.blue : src === 'app' ? C.purple : C.yellow}>{SRC_LABEL[src]}</Txt>
        {checked ? <Txt opacity={checked} x={KBP.x + KBP.w - 90} y={y + KBP.row / 2 + 4} size={17} anchor="end" color={C.green} weight={700}>✓ WiGLE</Txt> : null}
      </g>;
    })}
  </g>;
};

// ---------------------------------------------------------------- section 1: apps
// One app in detail (decompile → find the BLE scan filter → read off the fingerprint → knowledge),
// then the same loop, fast, for the rest.
const rowY = (i: number) => 262 + i * 74;
const DETAIL_END = 225;
const rowStart = (n: number) => n === 0 ? 205 : 225 + (n - 1) * 22;
export const appKbIn = (f: number, n: number) => n === 0 ? p(f, 182, 205, inOut) : p(f, rowStart(n) + 14, rowStart(n) + 26, inOut);

// An APK file icon: a page with a folded corner and the Android head, 28x28 at (x, y).
const ApkIcon = ({x, y, s = 1}: {x: number; y: number; s?: number}) => <g transform={`translate(${x} ${y}) scale(${s})`}>
  <path d="M 3 0 H 19 L 26 7 V 28 H 3 Z" fill="#e8eaed"/>
  <path d="M 19 0 V 7 H 26" fill="#c3c7cc"/>
  <path d="M 7.5 21 A 7 7 0 0 1 21.5 21 Z" fill="#3ddc84"/>
  <path d="M 9.5 15.5 L 8 13 M 19.5 15.5 L 21 13" stroke="#3ddc84" strokeWidth={1.4} strokeLinecap="round"/>
  <circle cx={11.8} cy={18.6} r={0.9} fill="#e8eaed"/><circle cx={17.2} cy={18.6} r={0.9} fill="#e8eaed"/>
</g>;

// Decompiled source of the first (synthetic) app; lines 1-4 are the scan filter.
const CODE: {t: string; c: string}[][] = [
  [{t: 'ScanFilter', c: C.blueHi}, {t: ' filter = ', c: C.text}, {t: 'new', c: C.purple}, {t: ' ScanFilter.Builder()', c: C.text}],
  [{t: '    .setDeviceName(', c: C.text}, {t: '"ES-4"', c: C.green}, {t: ')', c: C.text}],
  [{t: '    .setServiceUuid(ParcelUuid.fromString(', c: C.text}, {t: '"0000fee7-…"', c: C.green}, {t: '))', c: C.text}],
  [{t: '    .setManufacturerData(', c: C.text}, {t: '0x0D12', c: C.yellow}, {t: ', …)', c: C.text}],
  [{t: '    .build();', c: C.text}],
  [{t: 'scanner.startScan(List.of(filter), settings, callback);', c: C.sub}],
];
const CP = {x: 100, y: 270, w: 1040, line: 40};

const Apps = ({f}: {f: number}) => {
  const fadeAll = 1 - p(f, 450, 478);
  const wig = p(f, 350, 370) * (1 - p(f, 420, 440));
  const detail = 1 - p(f, DETAIL_END - 20, DETAIL_END);
  const g = rand(77);
  const dots = Array.from({length: 46}, () => {
    const cl = [[260, 70], [520, 50], [700, 80], [880, 60], [420, 140], [960, 150]][Math.floor(g() * 6)];
    return {x: 120 + cl[0] + (g() - 0.5) * 120, y: 760 + cl[1] + (g() - 0.5) * 60, d: g()};
  });
  const lead0 = APP_LEADS[0];
  const hl = p(f, 125, 145);
  const fp = p(f, 150, 175);
  return <g opacity={fadeAll}>
    <Txt x={80} y={150} size={40} color={C.text} weight={700}>From apps</Txt>
    <g opacity={p(f, 10, 30)}>
      <rect x={330} y={118} width={250} height={42} rx={21} fill="none" stroke={C.sub}/>
      <Txt x={455} y={147} size={22} color={C.sub} anchor="middle">AndroZoo</Txt>
      <rect x={600} y={118} width={330} height={42} rx={21} fill={C.blue} fillOpacity={0.16} stroke={C.blue} strokeWidth={2}/>
      <Txt x={765} y={147} size={22} color={C.blueHi} anchor="middle" weight={650}>permission: Bluetooth</Txt>
    </g>

    {/* one app in detail */}
    <g opacity={detail}>
      <g opacity={p(f, 30, 45)}>
        <ApkIcon x={100} y={196} s={1.6}/>
        <Txt x={160} y={230} size={26} color={C.text} weight={650}>com.example.scooter.apk</Txt>
        <Txt x={520} y={230} size={22} color={C.purple} opacity={p(f, 50, 62)}>→ decompile</Txt>
      </g>
      <g opacity={p(f, 52, 66)}>
        <rect x={CP.x} y={CP.y} width={CP.w} height={CODE.length * CP.line + 30} rx={14} fill="#181818" stroke="#333333"/>
        {CODE.map((line, i) => <text key={i} x={CP.x + 24} y={CP.y + 42 + i * CP.line} fontSize={23} fontFamily={MONO}
          style={{whiteSpace: 'pre'}} opacity={p(f, 62 + i * 9, 70 + i * 9)}>
          {line.map((seg, j) => <tspan key={j} fill={seg.c}>{seg.t}</tspan>)}
        </text>)}
        {/* the scan filter */}
        <rect x={CP.x + 12} y={CP.y + 14} width={960} height={4 * CP.line + 6} rx={8} fill={C.purple} fillOpacity={0.1 * hl}
          stroke={C.purple} strokeWidth={2} opacity={hl}/>
        <g opacity={hl}>
          <rect x={CP.x + CP.w - 180} y={CP.y - 18} width={170} height={36} rx={18} fill={C.bg} stroke={C.purple} strokeWidth={2}/>
          <Txt x={CP.x + CP.w - 95} y={CP.y + 8} size={20} color={C.purple} anchor="middle" weight={650}>scan filter</Txt>
        </g>
      </g>
      {/* the fingerprint read off the filter, and what the app is for */}
      <g opacity={fp}>
        <Txt x={CP.x} y={CP.y + CODE.length * CP.line + 90} size={22} color={C.sub}>fingerprint</Txt>
        <StripView ads={lead0.ads} x={CP.x + 140} y={CP.y + CODE.length * CP.line + 82} pitch={12} h={26} parse={lead0.ads.length} solid={1} norm={1} sgap={6}/>
        <Txt x={CP.x + 560} y={CP.y + CODE.length * CP.line + 92} size={28} color={C.purple}>→</Txt>
        <Txt x={CP.x + 610} y={CP.y + CODE.length * CP.line + 92} size={30} color={C.text} weight={700}>{lead0.product}</Txt>
      </g>
    </g>

    {/* the loop, repeated: app → scan filter → fingerprint → knowledge */}
    {APP_LEADS.map((lead, n) => {
      const s0 = rowStart(n);
      const y = rowY(n);
      const icon = p(f, s0, s0 + 6);
      const code = p(f, s0 + 4, s0 + 10);
      const out = p(f, s0 + 10, s0 + 18);
      return <g key={n} opacity={icon}>
        <ApkIcon x={100} y={y - 14}/>
        <g opacity={code}>
          {[0, 1, 2].map((j) => <rect key={j} x={148} y={y - 14 + j * 10} width={j === 1 ? 60 : 72} height={6} rx={3}
            fill={j === 1 ? C.purple : '#474747'}/>)}
        </g>
        <g opacity={out}>
          <Txt x={240} y={y + 8} size={26} color={C.purple}>→</Txt>
          <StripView ads={lead.ads} x={290} y={y} pitch={10} h={22} parse={lead.ads.length} solid={1} norm={1} sgap={5}/>
          <Txt x={640} y={y + 9} size={26} color={C.text} weight={650}>{lead.product}</Txt>
        </g>
      </g>;
    })}
    <g opacity={p(f, 236, 252) * (1 - p(f, 420, 440))}>
      <rect x={920} y={232} width={180} height={40} rx={20} fill={C.purple} fillOpacity={0.16} stroke={C.purple}/>
      <Txt x={1010} y={259} size={20} color={C.purple} anchor="middle" weight={650}>agents</Txt>
    </g>

    {/* WiGLE validates the one with a distinctive name */}
    <g opacity={wig}>
      <rect x={90} y={rowY(WIGLE_ROW) - 34} width={740} height={64} rx={12} fill="none" stroke={C.green} strokeWidth={2}/>
      <Txt x={100} y={738} size={26} color={C.text} weight={650}>WiGLE check</Txt>
      <Txt x={300} y={738} size={22} color={C.sub}>name + manufacturer ID + location</Txt>
      <rect x={100} y={760} width={1040} height={200} rx={14} fill="#181818" stroke="#333333"/>
      {dots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r={6} fill={C.green}
        opacity={p(f, 364 + d.d * 40, 372 + d.d * 40)}/>)}
      <Txt x={1120} y={940} size={22} color={C.green} anchor="end" weight={700} opacity={p(f, 404, 414)}>✓ exists in the wild</Txt>
    </g>
  </g>;
};

// ---------------------------------------------------------------- section 2: places
const HOSP = [{x: 200, y: 360, er: true}, {x: 520, y: 300, er: true}, {x: 380, y: 560, er: false}, {x: 600, y: 700, er: true}, {x: 210, y: 780, er: false}];
const DEV = (() => {
  const g = rand(31337);
  return Array.from({length: 60}, () => {
    const h = HOSP[Math.floor(g() * HOSP.length)];
    const a = g() * Math.PI * 2, r = 20 + g() * 60;
    return {x: h.x + Math.cos(a) * r, y: h.y + Math.sin(a) * r, er: h.er, kind: (['tag', 'phone', 'buds', 'watch', 'tag', 'tag'] as const)[Math.floor(g() * 6)], d: g()};
  });
})();
const BARS: {label: string; kind: 'phone' | 'buds' | 'tag' | 'watch'; near: number; else_: number; hot: boolean}[] = [
  {label: 'phones', kind: 'phone', near: 0.9, else_: 0.85, hot: false},
  {label: 'earbuds', kind: 'buds', near: 0.6, else_: 0.62, hot: false},
  {label: 'EmTag', kind: 'tag', near: 0.8, else_: 0.06, hot: true},
  {label: 'ResMed', kind: 'tag', near: 0.55, else_: 0.05, hot: true},
  {label: 'PrimexClock', kind: 'watch', near: 0.4, else_: 0.04, hot: true},
];

const Places = ({f}: {f: number}) => {
  const show = p(f, 0, 30) * (1 - p(f, 450, 478));
  const er = p(f, 60, 90);
  const buf = p(f, 100, 130);
  const cmp = p(f, 200, 230);
  return <g opacity={show}>
    <Txt x={80} y={150} size={40} color={C.text} weight={700}>From places</Txt>
    <rect x={350} y={118} width={240} height={42} rx={21} fill="none" stroke={C.sub}/>
    <Txt x={470} y={147} size={22} color={C.sub} anchor="middle">OpenStreetMap</Txt>
    <g opacity={er}>
      <rect x={610} y={118} width={470} height={42} rx={21} fill={C.yellow} fillOpacity={0.12} stroke={C.yellow} strokeWidth={2}/>
      <Txt x={845} y={147} size={22} color={C.yellow} anchor="middle" weight={650}>hospitals with an emergency department</Txt>
    </g>

    {/* stylized city */}
    <rect x={80} y={210} width={640} height={720} rx={16} fill="#181818" stroke="#333333"/>
    {[300, 470, 640, 820].map((y) => <line key={y} x1={80} x2={720} y1={y} y2={y + 30} stroke="#262626" strokeWidth={10}/>)}
    {[180, 340, 500, 640].map((x) => <line key={x} x1={x} x2={x + 40} y1={210} y2={930} stroke="#262626" strokeWidth={10}/>)}
    {HOSP.map((h, i) => {
      const dim = h.er ? 1 : 1 - 0.75 * er;
      return <g key={i} opacity={p(f, 20 + i * 6, 40 + i * 6) * dim}>
        {h.er && <circle cx={h.x} cy={h.y} r={90 * buf} fill={C.blue} fillOpacity={0.08} stroke={C.blue} strokeOpacity={0.5} strokeDasharray="5 6"/>}
        <rect x={h.x - 26} y={h.y - 26} width={52} height={52} rx={10} fill={h.er ? '#c0392b' : '#474747'}/>
        <Txt x={h.x} y={h.y + 12} size={32} color="#fff" anchor="middle" weight={800}>H</Txt>
      </g>;
    })}
    {DEV.filter((d) => d.er).map((d, i) => <g key={i} transform={`translate(${d.x} ${d.y})`} opacity={p(f, 130 + d.d * 60, 140 + d.d * 60)}>
      <Glyph kind={d.kind} color={C.blueHi}/>
    </g>)}

    {/* near hospitals vs elsewhere */}
    <g opacity={cmp}>
      <Txt x={780} y={250} size={26} color={C.text} weight={650}>near hospitals vs elsewhere</Txt>
      <rect x={780} y={268} width={22} height={14} rx={3} fill={C.blue}/><Txt x={810} y={282} size={18} color={C.sub}>hospitals</Txt>
      <rect x={920} y={268} width={22} height={14} rx={3} fill="#6b6b6b"/><Txt x={950} y={282} size={18} color={C.sub}>elsewhere</Txt>
      {BARS.map((b, i) => {
        const y = 330 + i * 110;
        const grow = p(f, 220 + i * 10, 260 + i * 10, inOut);
        const hot = b.hot ? p(f, 290 + i * 8, 306 + i * 8) : 0;
        return <g key={b.label}>
          {b.hot && <rect x={770} y={y - 14} width={400} height={96} rx={10} fill="none" stroke={C.yellow} strokeOpacity={hot} strokeWidth={2}/>}
          <g transform={`translate(${800} ${y + 18})`}><Glyph kind={b.kind} color={b.hot ? C.yellow : C.sub}/></g>
          <Txt x={830} y={y + 26} size={24} color={b.hot ? C.text : C.sub} weight={600}>{b.label}</Txt>
          <rect x={990} y={y + 6} width={170 * b.near * grow} height={18} rx={4} fill={C.blue}/>
          <rect x={990} y={y + 34} width={170 * b.else_ * grow} height={18} rx={4} fill="#6b6b6b"/>
        </g>;
      })}
      <Txt x={780} y={900} size={24} color={C.yellow} weight={650} opacity={p(f, 320, 340)}>over-represented → new leads</Txt>
    </g>
  </g>;
};

// ---------------------------------------------------------------- section 3: everything converges
const Converge = ({f}: {f: number}) => {
  const k = p(f, 0, 30);
  const SRC = [
    {label: 'Our scans', glyph: 'car' as const, color: C.blue, y: 330},
    {label: 'Apps', glyph: 'phone' as const, color: C.purple, y: 560},
    {label: 'Places', glyph: 'tag' as const, color: C.yellow, y: 790},
  ];
  return <g opacity={k}>
    {SRC.map((s, i) => {
      const a = p(f, 20 + i * 14, 50 + i * 14);
      const dash = (f * 3) % 40;
      return <g key={s.label} opacity={a}>
        <rect x={110} y={s.y - 60} width={300} height={120} rx={18} fill="#1c1c1c" stroke={s.color} strokeWidth={2}/>
        <g transform={`translate(${170} ${s.y}) scale(2.2)`}><Glyph kind={s.glyph} color={s.color}/></g>
        <Txt x={230} y={s.y + 12} size={34} color={C.text} weight={700}>{s.label}</Txt>
        <path d={`M 420 ${s.y} C 800 ${s.y}, 900 560, 1190 560`} fill="none" stroke={s.color} strokeWidth={4} strokeDasharray="14 12" strokeDashoffset={-dash} opacity={0.8}/>
      </g>;
    })}
  </g>;
};

export const MoreWays = () => {
  useFonts();
  const f = useCurrentFrame();
  return <AbsoluteFill style={{backgroundColor: C.bg, fontFamily: SANS}}>
    <svg viewBox="0 0 1920 1080" width="100%" height="100%">
      <Sequence name="From apps" durationInFrames={MW.apps} layout="none"><Apps f={f}/></Sequence>
      <Sequence name="From places" from={MW.apps} durationInFrames={MW.places} layout="none"><Places f={f - MW.apps}/></Sequence>
      <Sequence name="Converge" from={MW.apps + MW.places} layout="none"><Converge f={f - MW.apps - MW.places}/></Sequence>
      <Sequence name="Knowledge base" layout="none"><KnowledgePanel f={f}/></Sequence>
    </svg>
  </AbsoluteFill>;
};
