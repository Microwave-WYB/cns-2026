import {C, MONO, SANS, Txt, lerp} from './kit';
import {type Ad, type AdType, STRIPS, fmtBytes, rand} from './data';

export const AD_COLOR: Record<AdType, string> = {
  flags: '#a3a3a3',
  uuid: '#4ea8ff',
  svc: '#2fc7b4',
  mfg: '#5fd4e8',
  name: '#cbd5e1',
  tx: '#7c8db5',
};
const NAME_LABEL: Record<AdType, string> = {tx: 'Tx power', flags: 'Flags', uuid: 'Service UUID', svc: 'Service data', mfg: 'Manufacturer data', name: 'Local name'};
export const NAME_UNITS = 4;
const h2 = (n: number) => n.toString(16).toUpperCase().padStart(2, '0');
const valueOf = (a: Ad) => a.type === 'tx' ? `${a.bytes[2]} dBm` : a.type === 'flags' ? `0x${h2(a.bytes[2])}` : a.type === 'uuid' ? `0x${a.id}`
  : a.type === 'svc' ? `for 0x${a.id} · ${a.bytes.length - 4} B` : a.type === 'mfg' ? `company 0x${a.id} · ${a.bytes.length - 4} B`
  : a.label;
export const templateLabel = (ads: Ad[]) => ads.map((a) => a.type === 'tx' ? 'Tx' : a.type === 'flags' ? 'Flags' : a.type === 'uuid' ? `UUID ${a.id}`
  : a.type === 'svc' ? `Svc data ${a.bytes.length} B` : a.type === 'mfg' ? `Mfg ${a.id} · ${a.bytes.length} B` : 'Name *').join('  ·  ');

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const units = (a: Ad, norm: number) => a.type === 'name' ? lerp(a.bytes.length, NAME_UNITS, norm) : a.bytes.length;
/** Horizontal layout of each structure: [x0, width] in local coordinates. */
export const layout = (ads: Ad[], pitch: number, parse: number, sgap: number, norm = 0) => {
  let x = 0;
  return ads.map((a, i) => {
    if (i > 0) x += sgap * clamp01(parse - i);
    const x0 = x;
    x += units(a, norm) * pitch;
    return [x0, units(a, norm) * pitch] as const;
  });
};
export const stripWidth = (ads: Ad[], pitch: number, norm = 0, sgap = pitch * 0.45) => {
  const L = layout(ads, pitch, ads.length, sgap, norm);
  const [x0, w] = L[L.length - 1];
  return x0 + w;
};

/**
 * One advertisement as byte tiles, split into its AD structures.
 * parse: 0..ads.length — how many structures have been recognised (colours, gaps, labels).
 */
export const StripView = ({ads, x, y, pitch, h, rot = 0, parse = 0, norm = 0, solid = 0, bytes = 0, tags = 0, labels = 0,
  bg = 1, opacity = 1, outline, sgap = pitch * 0.45, cursor = -1}: {
  ads: Ad[]; x: number; y: number; pitch: number; h: number; rot?: number; parse?: number; norm?: number; solid?: number;
  bytes?: number; tags?: number; labels?: number; bg?: number; opacity?: number; outline?: string; sgap?: number; cursor?: number;
}) => {
  const L = layout(ads, pitch, parse, sgap, norm);
  const gap = Math.max(1, pitch * 0.13);
  const tw = pitch - gap;
  const r = Math.min(7, tw * 0.18);
  const font = pitch * 0.5;
  return <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={opacity}>
    {outline && <rect x={-6} y={-h / 2 - 6} width={L[L.length - 1][0] + L[L.length - 1][1] + 10} height={h + 12} rx={6}
      fill="none" stroke={outline} strokeWidth={2}/>}
    {ads.map((a, i) => {
      const [x0, w] = L[i];
      const k = clamp01(parse - i);
      const col = AD_COLOR[a.type];
      const isName = a.type === 'name';
      const tileScale = isName ? w / (a.bytes.length * pitch) : 1;
      const bracket = labels * clamp01((parse - i) * 1.6 - 0.3);
      return <g key={i}>
        <g opacity={isName ? 1 - norm : 1}>
          {fmtBytes(a.bytes).map((b, j) => {
            const role = j === 0 ? 'len' : j === 1 ? 'type' : 'val';
            const tx = x0 + j * pitch * tileScale;
            const fillOp = k * lerp(role === 'type' ? 0.36 : role === 'len' ? 0 : 0.18, role === 'len' ? 0.45 : 0.92, solid);
            return <g key={j}>
              <rect x={tx} y={-h / 2} width={tw * tileScale} height={h} rx={r} opacity={bg} fill="#262626" stroke="#353535" strokeWidth={solid ? 0 : 1}/>
              <rect x={tx} y={-h / 2} width={tw * tileScale} height={h} rx={r} fill={col} fillOpacity={fillOp}
                stroke={col} strokeOpacity={k * (1 - solid) * 0.9} strokeDasharray={role === 'len' ? '3 3' : undefined}/>
              {bytes > 0 && <text x={tx + tw * tileScale / 2} y={font * 0.36} fontFamily={MONO} fontSize={font} textAnchor="middle"
                fill={k && role === 'len' ? C.sub : k ? '#f2f7ff' : '#cfe3ff'} opacity={bytes}>{b}</text>}
              {tags > 0 && role !== 'val' && <text x={tx + tw / 2} y={-h / 2 - 12} fontFamily={SANS} fontSize={14} textAnchor="middle"
                fill={C.sub} opacity={tags * k}>{role}</text>}
            </g>;
          })}
        </g>
        {isName && norm > 0 && <g opacity={norm}>
          <rect x={x0} y={-h / 2} width={w - gap} height={h} rx={r} fill={col} fillOpacity={lerp(0.22, 0.92, solid)}
            stroke={col} strokeDasharray="5 4" strokeWidth={1.5}/>
          {pitch >= 6 && <text x={x0 + (w - gap) / 2} y={Math.max(9, font) * 0.36} fontFamily={SANS} fontWeight={650} fontSize={Math.max(9, font * 0.9)}
            textAnchor="middle" fill={solid > 0.5 ? '#0a1424' : '#f2f7ff'}>{pitch > 20 ? 'Name *' : '*'}</text>}
        </g>}
        {bracket > 0 && <g opacity={bracket}>
          <path d={`M ${x0} ${h / 2 + 12} v 8 H ${x0 + w - gap} v -8`} fill="none" stroke={col} strokeWidth={2}/>
          <Txt x={x0} y={h / 2 + 50} size={19} color={col} weight={600}>{NAME_LABEL[a.type]}</Txt>
          <Txt x={x0} y={h / 2 + 77} size={18} color={C.text} mono>{isName && norm > 0.5 ? 'any value, any length' : valueOf(a)}</Txt>
        </g>}
      </g>;
    })}
    {cursor >= 0 && cursor < ads.length && (() => {
      const i = Math.floor(cursor);
      const [x0, w] = L[i];
      const k = clamp01((cursor - i) * 2);
      return <rect x={x0 - 6} y={-h / 2 - 6} width={(w - gap) * k + 12} height={h + 12} rx={10} fill="none" stroke="#fff" strokeWidth={2} opacity={0.75}/>;
    })()}
  </g>;
};

// Messy pile: every heard advertiser, scattered.
export const PILE = (() => {
  const r = rand(4242);
  const cols = 5, rows = Math.ceil(STRIPS.length / cols);
  const order = STRIPS.map((_, i) => i).sort(() => r() - 0.5);
  const pos: {x: number; y: number; rot: number}[] = [];
  order.forEach((si, k) => {
    const c = k % cols, rr = Math.floor(k / cols);
    pos[si] = {x: 80 + c * 362 + (r() - 0.5) * 80, y: 175 + rr * (830 / rows) + (r() - 0.5) * 34, rot: (r() - 0.5) * 16};
  });
  return pos;
})();
export const PILE_PITCH = 10, PILE_H = 20;
