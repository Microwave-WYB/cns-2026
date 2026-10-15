import {C, MONO, Txt, inOut, p} from './kit';
import {STRIPS} from './data';
import {AD_COLOR, StripView} from './Strip';
import {GROUPS, U_GROUP, groupAt} from './Cluster';
import {Field, productOf} from './Field';

// One cluster investigated in depth inside a simulated agent workspace, then all others in parallel.
const FOCUS = {x: 80, top: 190};
const TPL = STRIPS[GROUPS[U_GROUP][0]].ads;
const prod = productOf(U_GROUP);
const n = GROUPS[U_GROUP].length;

const WIN = {x: 470, y: 150, w: 900, h: 720};
const CARD = {x: 1410, y: 150, w: 450, h: 720};
// tab windows (scene-relative frames)
const TAB = [[60, 180], [180, 310], [310, 450], [450, 560]] as const;
const DONE = [140, 290, 425, 530];
const T = {verdict: [560, 585], review: [600, 615], out: [660, 685], back: [675, 720], agents: [720, 735], resolve: 745, step: 14} as const;

const typed = (s: string, a: number, start: number, perChar = 3) => s.slice(0, Math.max(0, Math.floor((a - start) / perChar)));
const caret = (a: number) => (Math.floor(a / 12) % 2 ? '' : '▏');

const TABS = ['SIG numbers', 'App store', 'Decompiler', 'Observation DB'];
const URLS = ['bluetooth SIG · assigned numbers · company identifiers', 'app store · search', 'decompiler · vxlink.apk', 'observatory · query console'];

const Window = ({active}: {active: number}) => {
  const {x, y, w, h} = WIN;
  return <g>
    <rect x={x} y={y} width={w} height={h} rx={14} fill="#1c1c1c" stroke="#3a3a3a" strokeWidth={1.5}/>
    <path d={`M ${x} ${y + 56} V ${y + 14} a 14 14 0 0 1 14 -14 H ${x + w - 14} a 14 14 0 0 1 14 14 V ${y + 56} Z`} fill="#242424"/>
    {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => <circle key={c} cx={x + 26 + i * 24} cy={y + 28} r={7} fill={c} opacity={0.8}/>)}
    {TABS.map((t, i) => {
      const tx = x + 110 + i * 192;
      const on = i === active;
      return <g key={t}>
        <path d={`M ${tx} ${y + 56} V ${y + 18} a 8 8 0 0 1 8 -8 H ${tx + 176} a 8 8 0 0 1 8 8 V ${y + 56} Z`} fill={on ? '#1c1c1c' : 'none'}/>
        <Txt x={tx + 92} y={y + 42} size={20} anchor="middle" color={on ? C.text : C.faint} weight={on ? 650 : 450}>{t}</Txt>
      </g>;
    })}
    <rect x={x + 20} y={y + 72} width={w - 40} height={44} rx={22} fill="#181818" stroke="#333333"/>
    <Txt x={x + 46} y={y + 101} size={18} color={C.sub} mono>{URLS[active]}</Txt>
    <rect x={x + w - 130} y={y + 80} width={100} height={28} rx={14} fill={C.purple} fillOpacity={0.16} stroke={C.purple}/>
    <Txt x={x + w - 80} y={y + 100} size={16} anchor="middle" color={C.purple} weight={650}>agent</Txt>
  </g>;
};

// --- tab contents (inside WIN, below the URL bar) ---
const CX = WIN.x + 50, CY = WIN.y + 180;

const SigTab = ({a}: {a: number}) => {
  const q = '0x0A4B';
  const hit = p(a, 108, 124);
  const rows: [string, string][] = [['0x0A48', 'Vendor G'], ['0x0A49', 'Vendor H'], ['0x0A4A', 'Vendor J'],
    ['0x0A4B', 'Vendor K'], ['0x0A4C', 'Vendor L'], ['0x0A4D', 'Vendor M']];
  return <g>
    <rect x={CX} y={CY} width={360} height={64} rx={12} fill="#181818" stroke={AD_COLOR.mfg} strokeWidth={2.5}/>
    <Txt x={CX + 24} y={CY + 44} size={34} color={AD_COLOR.mfg} mono>{typed(q, a, 76) + caret(a)}</Txt>
    <Txt x={CX + 390} y={CY + 42} size={24} color={C.sub}>company ID from the packet</Txt>
    {rows.map(([id, v], i) => {
      const y = CY + 150 + i * 64;
      const me = id === q;
      return <g key={id} opacity={me ? 1 : 1 - 0.7 * hit}>
        {me && <rect x={CX - 16} y={y - 44} width={WIN.w - 68} height={60} rx={10} fill={C.green} fillOpacity={0.14 * hit} stroke={C.green} strokeOpacity={hit}/>}
        <Txt x={CX} y={y} size={32} color={me && hit ? C.text : C.sub} mono>{id}</Txt>
        <Txt x={CX + 240} y={y} size={32} color={me && hit ? C.green : C.sub} weight={me ? 700 : 450}>{v}</Txt>
      </g>;
    })}
  </g>;
};

const StoreTab = ({a}: {a: number}) => {
  const res = p(a, 220, 238);
  const pick = p(a, 245, 258);
  const dl = p(a, 262, 284, (v) => v);
  const apps: [string, string][] = [['VX Link', 'Vendor K'], ['VX Cam Viewer', 'other developer'], ['Vortex Fit', 'other developer']];
  return <g>
    <rect x={CX} y={CY} width={360} height={64} rx={32} fill="#181818" stroke={AD_COLOR.name} strokeWidth={2.5}/>
    <Txt x={CX + 30} y={CY + 44} size={34} color={AD_COLOR.name} mono>{typed('VX-', a, 194, 5) + caret(a)}</Txt>
    <Txt x={CX + 390} y={CY + 42} size={24} color={C.sub}>name pattern from the packet</Txt>
    {apps.map(([name, dev], i) => {
      const y = CY + 100 + i * 134;
      const me = i === 0;
      return <g key={name} opacity={res * (me ? 1 : 1 - 0.65 * pick)}>
        <rect x={CX - 16} y={y} width={WIN.w - 68} height={116} rx={12} fill={me ? C.green : '#181818'} fillOpacity={me ? 0.1 * pick : 1}
          stroke={me ? C.green : '#333333'} strokeOpacity={me ? 0.3 + 0.7 * pick : 1}/>
        <rect x={CX + 6} y={y + 18} width={80} height={80} rx={18} fill={me ? '#1f5fae' : '#333333'}/>
        <Txt x={CX + 46} y={y + 70} size={28} anchor="middle" color="#fff" weight={700}>{name.slice(0, 2)}</Txt>
        <Txt x={CX + 112} y={y + 52} size={32} color={C.text} weight={650}>{name}</Txt>
        <Txt x={CX + 112} y={y + 90} size={22} color={C.sub}>{dev}</Txt>
        {me && <g opacity={pick}>
          <rect x={CX + 556} y={y + 34} width={240} height={50} rx={25} fill={C.blue}/>
          <rect x={CX + 556} y={y + 34} width={240 * dl} height={50} rx={25} fill={C.green}/>
          <Txt x={CX + 676} y={y + 67} size={22} anchor="middle" color="#06101d" weight={700}>{dl >= 1 ? 'APK ✓' : dl > 0 ? 'downloading…' : 'Download APK'}</Txt>
        </g>}
      </g>;
    })}
  </g>;
};

const CODE: {t: string; hl?: [string, string, string]}[] = [
  {t: 'new ScanFilter.Builder()'},
  {t: '  .setServiceUuid(UUID_F0FF)', hl: ['UUID_F0FF', AD_COLOR.uuid, 'UUID']},
  {t: '  .setManufacturerData(0x0A4B)', hl: ['0x0A4B', AD_COLOR.mfg, 'Mfg ID']},
  {t: '  .build();'},
  {t: 'if (name.startsWith("VX-"))', hl: ['"VX-"', AD_COLOR.name, 'Name']},
  {t: '  connect(device);'},
];
const CodeTab = ({a}: {a: number}) => {
  const show = p(a, 318, 338);
  const marks = [350, 375, 400];
  let m = 0;
  const x0 = WIN.x + 40;
  return <g opacity={show}>
    <Txt x={x0} y={WIN.y + 172} size={22} color={C.sub} mono>ble/ScanManager.java</Txt>
    {CODE.map((l, i) => {
      const y = WIN.y + 250 + i * 76;
      let hk = 0;
      if (l.hl) {hk = p(a, marks[m], marks[m] + 12); m++;}
      const [pre, post] = l.hl ? l.t.split(l.hl[0]) : [l.t, ''];
      return <g key={i}>
        {l.hl && <rect x={x0 - 10} y={y - 42} width={WIN.w - 60} height={60} rx={8} fill={l.hl[1]} fillOpacity={0.13 * hk}/>}
        <text x={x0} y={y} fontFamily={MONO} fontSize={30} fill="#c9d5e6" xmlSpace="preserve">
          {pre}{l.hl && <tspan fill={hk ? l.hl[1] : '#c9d5e6'} fontWeight={hk ? 700 : 400}>{l.hl[0]}</tspan>}{post}
        </text>
        {l.hl && <g opacity={hk}>
          <rect x={WIN.x + WIN.w - 170} y={y - 34} width={140} height={44} rx={22} fill={l.hl[1]} fillOpacity={0.2} stroke={l.hl[1]} strokeWidth={2}/>
          <Txt x={WIN.x + WIN.w - 100} y={y - 4} size={22} anchor="middle" color={l.hl[1]} weight={700}>{l.hl[2]}</Txt>
        </g>}
      </g>;
    })}
  </g>;
};

const DbTab = ({a}: {a: number}) => {
  const cmd = 'match VX fingerprint';
  const res = p(a, 488, 500);
  const cnt = Math.round(n * p(a, 492, 520, (v) => v));
  return <g>
    <Txt x={CX} y={CY + 30} size={32} color={C.sub} mono>{'> '}<tspan fill={C.text}>{typed(cmd, a, 458, 1)}</tspan>{caret(a)}</Txt>
    <g opacity={res}>
      <Txt x={CX} y={CY + 140} size={30} color={C.sub}>cluster 6</Txt>
      <Txt x={CX} y={CY + 230} size={84} color={C.green} weight={700} mono>{`${cnt}/${n}`}</Txt>
      <Txt x={CX + 260} y={CY + 230} size={34} color={C.green} weight={600}>match</Txt>
      <Txt x={CX} y={CY + 340} size={30} color={C.sub}>everything else</Txt>
      <Txt x={CX} y={CY + 430} size={84} color={C.text} weight={700} mono>0</Txt>
      <Txt x={CX + 90} y={CY + 430} size={34} color={C.sub} weight={600}>match</Txt>
    </g>
  </g>;
};

const Check = ({y, k, label, value}: {y: number; k: number; label: string; value: string}) => <g>
  <circle cx={CARD.x + 46} cy={y - 10} r={18} fill={k > 0.5 ? C.green : 'none'} stroke={k > 0.5 ? C.green : C.faint} strokeWidth={2}/>
  {k > 0.5 && <Txt x={CARD.x + 46} y={y - 1} size={22} anchor="middle" color="#06101d" weight={800}>✓</Txt>}
  <Txt x={CARD.x + 80} y={y - 14} size={20} color={C.sub}>{label}</Txt>
  <Txt x={CARD.x + 80} y={y + 20} size={28} color={k > 0.5 ? C.text : C.faint} weight={650}>{k > 0.5 ? value : '…'}</Txt>
</g>;

export const Attribute = ({frame: a}: {frame: number}) => {
  const move = p(a, 0, 40, inOut) * (1 - p(a, T.back[0], T.back[1], inOut));
  const others = 1 - p(a, 0, 30) * (1 - p(a, T.back[0], T.back[1]));
  const detail = p(a, 30, 55) * (1 - p(a, T.out[0], T.out[1]));
  const cur = TAB.findIndex(([s, e]) => a >= s && a < e);
  const active = cur >= 0 ? cur : a < TAB[0][0] ? 0 : 3;
  const fadeTab = (i: number) => p(a, TAB[i][0], TAB[i][0] + 12) * (i === 3 ? 1 : 1 - p(a, TAB[i][1] - 8, TAB[i][1]));
  const verdict = p(a, T.verdict[0], T.verdict[1]);
  const {x: ux, top: ut} = groupAt(U_GROUP);
  const agents = p(a, T.agents[0], T.agents[1]);
  const col = verdict > 0.5 ? C.green : C.yellow;

  return <g>
    <Field noise={others} noiseLabel={others} group={(gi) => {
      if (gi === U_GROUP) return {dx: (FOCUS.x - ux) * move, dy: (FOCUS.top - ut) * move, investigate: p(a, 20, 40), resolve: verdict, pulse: a, tag: 1 - move};
      const at = T.resolve + (gi < U_GROUP ? gi : gi - 1) * T.step;
      return {opacity: others, investigate: agents, resolve: p(a, at + 30, at + 44), pulse: a};
    }}/>


    <g opacity={detail}>
      <Window active={active}/>
      <g opacity={fadeTab(0)}><SigTab a={a}/></g>
      <g opacity={fadeTab(1)}><StoreTab a={a}/></g>
      <g opacity={fadeTab(2)}><CodeTab a={a}/></g>
      <g opacity={fadeTab(3)}><DbTab a={a}/></g>

      {/* attribution card */}
      <rect x={CARD.x} y={CARD.y} width={CARD.w} height={CARD.h} rx={14} fill="#1a1a1a" stroke={col} strokeOpacity={0.85} strokeWidth={2}/>
      <rect x={CARD.x + 28} y={CARD.y + 28} width={164} height={36} rx={18} fill={col} fillOpacity={0.16} stroke={col}/>
      <Txt x={CARD.x + 110} y={CARD.y + 53} size={17} anchor="middle" weight={700} color={col} spacing={1}>{verdict > 0.5 ? 'ATTRIBUTED' : 'HYPOTHESIS'}</Txt>
      <Txt x={CARD.x + 28} y={CARD.y + 118} size={34} weight={700} color={verdict > 0.5 ? C.text : C.faint}>
        {verdict > 0.5 ? 'Aftermarket' : 'Cluster 6'}</Txt>
      <Txt x={CARD.x + 28} y={CARD.y + 160} size={34} weight={700} color={verdict > 0.5 ? C.text : C.faint}>
        {verdict > 0.5 ? 'vehicle module' : 'unknown product'}</Txt>
      <StripView ads={TPL} x={CARD.x + 28} y={CARD.y + 210} pitch={14} h={24} parse={TPL.length} solid={1} norm={1} sgap={6}/>
      <Check y={CARD.y + 300} k={p(a, DONE[0], DONE[0] + 6)} label="vendor" value={prod.vendor}/>
      <Check y={CARD.y + 385} k={p(a, DONE[1], DONE[1] + 6)} label="app" value={prod.app}/>
      <Check y={CARD.y + 470} k={p(a, DONE[2], DONE[2] + 6)} label="app code" value="matches template"/>
      <Check y={CARD.y + 555} k={p(a, DONE[3], DONE[3] + 6)} label="sightings" value={`${n}/${n} match`}/>
      <g opacity={p(a, T.review[0], T.review[1])} transform={`translate(${CARD.x + 28} ${CARD.y + 620})`}>
        <rect width={CARD.w - 56} height={60} rx={10} fill="none" stroke={C.text} strokeOpacity={0.85} strokeDasharray="6 5"/>
        <Txt x={(CARD.w - 56) / 2} y={39} size={22} color={C.text} anchor="middle" weight={650}>✓ reviewed by a researcher</Txt>
      </g>
    </g>
  </g>;
};
