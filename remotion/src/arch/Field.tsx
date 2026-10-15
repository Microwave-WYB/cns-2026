import {C, Txt} from './kit';
import {PRODUCTS, STRIPS} from './data';
import {StripView} from './Strip';
import {GH, GROUPS, GU, NOISE_ROT, TARGET, UNMATCHED, groupAt} from './Cluster';

export type GroupState = {
  dx?: number; dy?: number; opacity?: number;
  // header: 0 unknown → 1 investigating → 2 resolved (attributed / candidate)
  investigate?: number; resolve?: number; pulse?: number; tag?: number;
};
const famOf = (gi: number) => STRIPS[GROUPS[gi][0]].rx.e.fam as keyof typeof PRODUCTS;
export const productOf = (gi: number) => PRODUCTS[famOf(gi)];

export const GroupHeader = ({gi, x, y, s}: {gi: number; x: number; y: number; s: GroupState}) => {
  const inv = (s.investigate ?? 0) * (1 - (s.resolve ?? 0));
  const res = s.resolve ?? 0;
  const prod = productOf(gi);
  const col = prod.status === 'attributed' ? C.green : C.yellow;
  const dots = '•••'.slice(0, 1 + Math.floor((s.pulse ?? 0) / 8) % 3);
  return <g>
    <g opacity={1 - Math.max(inv, res)}>
      <Txt x={x} y={y + 12} size={24} color={C.text} weight={650}>{`Unknown cluster ${gi + 1}`}</Txt>
    </g>
    <g opacity={inv}>
      <Txt x={x} y={y + 12} size={24} color={C.purple} weight={650}>{`agent investigating ${dots}`}</Txt>
    </g>
    <g opacity={res}>
      <Txt x={x} y={y + 12} size={24} color={col} weight={700}>{prod.product}</Txt>
      {prod.status === 'candidate' && <g>
        <rect x={x + 168} y={y - 14} width={250} height={36} rx={18} fill={C.yellow} fillOpacity={0.16} stroke={C.yellow} strokeWidth={2}/>
        <Txt x={x + 293} y={y + 11} size={20} color={C.yellow} anchor="middle" weight={700}>needs more evidence</Txt>
      </g>}
    </g>
  </g>;
};

/** The grouped end state of the Cluster scene, with per-group overrides. */
export const Field = ({group, noise = 1, noiseLabel = 1}: {group: (gi: number) => GroupState; noise?: number; noiseLabel?: number}) => <g>
  {GROUPS.map((m, gi) => {
    const s = group(gi);
    const {x, top} = groupAt(gi);
    const dx = s.dx ?? 0, dy = s.dy ?? 0;
    return <g key={gi} opacity={s.opacity ?? 1}>
      {m.map((si) => <StripView key={si} ads={STRIPS[si].ads} x={TARGET[si].x + dx} y={TARGET[si].y + dy} pitch={GU} h={GH}
        parse={STRIPS[si].ads.length} solid={1} norm={1}/>)}
      <GroupHeader gi={gi} x={x + dx} y={top + dy} s={s}/>
    </g>;
  })}
  <g opacity={noise}>
    {UNMATCHED.map((si) => <StripView key={si} ads={STRIPS[si].ads} x={TARGET[si].x} y={TARGET[si].y} pitch={GU} h={GH}
      rot={NOISE_ROT[si]} parse={STRIPS[si].ads.length} solid={1} norm={1}/>)}
    <g opacity={noiseLabel}>
      <Txt x={80} y={840} size={24} color={C.sub} weight={650}>Noise</Txt>
    </g>
  </g>
</g>;
