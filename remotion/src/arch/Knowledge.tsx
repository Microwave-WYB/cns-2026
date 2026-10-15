import {C, Txt, inOut, lerp, p} from './kit';
import {type Ad, STRIPS} from './data';
import {StripView} from './Strip';
import {GROUPS, U_GROUP, groupAt} from './Cluster';
import {Field, productOf} from './Field';

export const KB = {x: 1120, y: 150, w: 760};
export const SHRINK = {s: 0.58, tx: 20, ty: 92};
// KB order: the deep-dive cluster first, then the rest.
export const KB_ORDER = [U_GROUP, ...GROUPS.map((_, gi) => gi).filter((gi) => gi !== U_GROUP)];

export type KBEntry = {ads: Ad[]; product: string; detail: string; status: 'attributed' | 'candidate'};
export const SEED_ENTRIES: KBEntry[] = KB_ORDER.map((gi) => {
  const pr = productOf(gi);
  return {ads: STRIPS[GROUPS[gi][0]].ads, product: pr.product, detail: `${pr.app} · ${pr.vendor}`, status: pr.status};
});

/** One knowledge-base row. h ≥ 70 shows the detail line; smaller rows are compact. */
export const KBRow = ({e, x, y, w, h, k = 1, flash = 0, count}: {e: KBEntry; x: number; y: number; w: number; h: number; k?: number; flash?: number; count?: string}) => {
  const col = e.status === 'attributed' ? C.green : C.yellow;
  const big = h >= 70;
  return <g opacity={k}>
    <rect x={x} y={y} width={w} height={h - 6} rx={8} fill="#1c1c1c" stroke={C.line}/>
    {flash > 0 && <rect x={x} y={y} width={w} height={h - 6} rx={8} fill={C.green} fillOpacity={0.14 * flash}/>}
    <circle cx={x + 18} cy={y + (h - 6) / 2} r={5} fill={col}/>
    <StripView ads={e.ads} x={x + 36} y={y + (big ? 26 : (h - 6) / 2)} pitch={big ? 8 : 6} h={big ? 16 : Math.min(16, h - 14)}
      parse={e.ads.length} solid={1} norm={1} sgap={big ? 4 : 2}/>
    {big ? <>
      <Txt x={x + 300} y={y + 36} size={26} color={col} weight={650}>{e.product}</Txt>
      <Txt x={x + 300} y={y + 70} size={e.status === 'candidate' ? 22 : 20} color={e.status === 'candidate' ? C.yellow : C.sub} weight={e.status === 'candidate' ? 650 : 400}>{e.status === 'candidate' ? 'needs more evidence' : e.detail}</Txt>
    </> : <Txt x={x + 250} y={y + (h - 6) / 2 + 7} size={20} color={col} weight={600}>{e.product}</Txt>}
    {count && <Txt x={x + w - 14} y={y + (h - 6) / 2 + 7} size={19} color={C.sub} anchor="end" mono>{count}</Txt>}
  </g>;
};

export const KBHeader = ({k = 1}: {k?: number}) => <g opacity={k}>
  <Txt x={KB.x} y={KB.y + 20} size={30} color={C.text} weight={700}>Knowledge base</Txt>
  <Txt x={KB.x} y={KB.y + 56} size={20} color={C.sub}>fingerprint  ↔  product  ↔  app  ↔  vendor</Txt>
</g>;

export const Knowledge = ({frame: k}: {frame: number}) => {
  const sh = p(k, 0, 40, inOut);
  const s = lerp(1, SHRINK.s, sh);
  const added = KB_ORDER.map((_, i) => p(k, 60 + i * 22, 96 + i * 22, inOut));
  return <g>
    <g transform={`translate(${SHRINK.tx * sh} ${SHRINK.ty * sh}) scale(${s})`}>
      <Field group={(gi) => ({investigate: 1, resolve: 1, opacity: 1 - 0.45 * added[KB_ORDER.indexOf(gi)]})}/>
    </g>
    <KBHeader k={p(k, 30, 56)}/>
    {SEED_ENTRIES.map((e, i) => {
      const gi = KB_ORDER[i];
      const {x, top} = groupAt(gi);
      const t = added[i];
      const sx = SHRINK.tx + x * SHRINK.s, sy = SHRINK.ty + top * SHRINK.s - 20;
      const ty = KB.y + 80 + i * 96;
      return <g key={i} transform={`translate(${lerp(sx - KB.x, 0, t)} ${lerp(sy - ty, 0, t)})`}>
        <KBRow e={e} x={KB.x} y={ty} w={KB.w} h={96} k={p(k, 60 + i * 22, 70 + i * 22)} flash={1 - p(k, 96 + i * 22, 130 + i * 22)}/>
      </g>;
    })}
    <g opacity={p(k, 210, 240)}>
      <Txt x={40} y={780} size={34} color={C.text} weight={650}>Known fingerprints are reused:</Txt>
      <Txt x={40} y={826} size={34} color={C.text} weight={650}>only new templates need investigating</Txt>
    </g>
  </g>;
};
