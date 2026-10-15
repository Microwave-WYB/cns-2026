import {C, Txt, inOut, lerp, p} from './kit';
import {GROUP_ORDER, HERO, STRIPS} from './data';
import {PILE, PILE_H, PILE_PITCH, StripView, stripWidth} from './Strip';

// ---------------------------------------------------------------- grouping by template
const byKey = new Map<string, number[]>();
STRIPS.forEach((s, i) => byKey.set(s.key, [...(byKey.get(s.key) ?? []), i]));
export const GROUPS = GROUP_ORDER.map((fam) => [...byKey.values()].find((m) => m.length > 1 && STRIPS[m[0]].rx.e.fam === fam)!).filter(Boolean);
export const UNMATCHED = [...byKey.values()].filter((m) => m.length === 1).flat();
export const COLS = [80, 700, 1320], ROWS = [176, 540], PITCH = 30, GH = 22, GU = 13;
export const groupAt = (gi: number) => ({x: COLS[gi % 3], top: ROWS[Math.floor(gi / 3)]});
export const TARGET: {x: number; y: number; order: number}[] = [];
let order = 0;
GROUPS.forEach((m, gi) => m.forEach((si, k) => {const {x, top} = groupAt(gi); TARGET[si] = {x, y: top + 46 + k * PITCH, order: order++};}));
// Noise: laid out loosely, deliberately not aligned.
const NOISE_Y = [878, 946];
export const NOISE_ROT: number[] = [];
{
  let ux = 80, row = 0;
  const half = UNMATCHED.reduce((s, si) => s + stripWidth(STRIPS[si].ads, GU, 1) + 70, 0) / 2;
  UNMATCHED.forEach((si, k) => {
    const w = stripWidth(STRIPS[si].ads, GU, 1);
    if (row === 0 && ux - 80 > half) {row = 1; ux = 130;}
    TARGET[si] = {x: ux, y: NOISE_Y[row] + ((k * 37) % 21 - 10), order: order++};
    NOISE_ROT[si] = ((k * 53) % 11 - 5) * 0.8;
    ux += w + 50 + ((k * 29) % 40);
  });
}
export const U_GROUP = GROUPS.findIndex((m) => STRIPS[m[0]].rx.e.fam === 'U');

// ---------------------------------------------------------------- the comparison pair
const nameLen = (si: number) => STRIPS[si].ads.find((a) => a.type === 'name')!.bytes.length;
const heroSi = STRIPS.findIndex((s) => s.rx.e.id === HERO.e.id);
const pairSi = GROUPS[U_GROUP].filter((si) => si !== heroSi).sort((a, b) => nameLen(b) - nameLen(a))[0];
const PAIR = [heroSi, pairSi];
const CMP = {x: 300, y: [450, 680], unit: 42, h: 48};

// Extra dwell once both names have become wildcards (frames are frozen during it).
export const NAME_HOLD_AT = 125, NAME_HOLD = 60;
export const Cluster = ({frame: raw}: {frame: number}) => {
  const g = raw < NAME_HOLD_AT ? raw : Math.max(NAME_HOLD_AT, raw - NAME_HOLD);
  const lift = p(g, 8, 48, inOut) * (1 - p(g, 140, 180, inOut)); // up to the comparison, then back into the pile
  const dim = p(g, 0, 30) * (1 - p(g, 140, 175));
  const normPair = p(g, 78, 118, inOut);
  const normAll = p(g, 175, 210, inOut);
  const headers = p(g, 317, 347);
  const cmpText = p(g, 30, 50) * (1 - p(g, 140, 160));
  const endX = CMP.x + Math.max(...PAIR.map((si) => stripWidth(STRIPS[si].ads, CMP.unit, normPair)));

  return <g>
    {/* pair comparison captions */}
    <g opacity={cmpText}>
      <Txt x={CMP.x} y={300} size={28} color={C.text} weight={600}>
        {normPair < 0.5 ? 'Same kind of device, but the names differ in length' : 'Name is a wildcard: ignore its value and its length'}
      </Txt>
      <line x1={endX + 10} x2={endX + 10} y1={CMP.y[0] - 50} y2={CMP.y[1] + 40} stroke={C.text} strokeDasharray="4 6"
        opacity={normPair}/>
    </g>

    {STRIPS.map((s, si) => {
      const t = TARGET[si];
      const q = PILE[si];
      const fly = p(g, 215 + t.order * 2.6, 283 + t.order * 2.6, inOut);
      const pi = PAIR.indexOf(si);
      let x: number, y: number, unit: number, h: number, rot: number, norm: number;
      if (pi >= 0) {
        const bx = lerp(q.x, CMP.x, lift), by = lerp(q.y, CMP.y[pi], lift);
        x = lerp(bx, t.x, fly); y = lerp(by, t.y, fly);
        unit = lerp(lerp(PILE_PITCH, CMP.unit, lift), GU, fly);
        h = lerp(lerp(PILE_H, CMP.h, lift), GH, fly);
        rot = q.rot * (1 - lift) * (1 - fly); norm = normPair;
      } else {
        x = lerp(q.x, t.x, fly); y = lerp(q.y, t.y, fly);
        unit = lerp(PILE_PITCH, GU, fly); h = lerp(PILE_H, GH, fly); rot = q.rot * (1 - fly); norm = normAll;
      }
      const unmatched = UNMATCHED.includes(si);
      if (unmatched) rot = lerp(rot, NOISE_ROT[si], fly);
      const detail = pi >= 0 ? lift * (1 - p(g, 150, 165)) : 0;
      return <StripView key={si} ads={s.ads} x={x} y={y} pitch={unit} h={h} rot={rot} norm={norm}
        parse={s.ads.length} solid={1 - detail} bytes={detail} labels={detail}
        opacity={pi >= 0 ? 1 : 1 - 0.9 * dim}/>;
    })}

    {/* group headers: every cluster starts out unidentified */}
    <g opacity={headers}>
      {GROUPS.map((m, gi) => {
        const {x, top} = groupAt(gi);
        return <g key={gi}>
          <Txt x={x} y={top + 12} size={24} color={C.text} weight={650}>{`Unknown cluster ${gi + 1}`}</Txt>
        </g>;
      })}
      <Txt x={80} y={840} size={24} color={C.sub} weight={650}>Noise</Txt>
    </g>
  </g>;
};
