import {C, CHAR, Glyph, MONO, Txt, lerp, p} from './kit';
import {DRIVE, EMITTERS, HERO, MAP, PACKET_FLIGHT, RANGE, ROADS, RX, HWY, bez, fmtAddr, fmtBytes, fmtTime, rxArrive, scannerAt, scannerT} from './data';

export const HWY_D = `M ${HWY[0].join(' ')} C ${HWY.slice(1).map((q) => q.join(' ')).join(', ')}`;

export const FEED = {x: 1384, y: 112, w: 496, top: 222, bottom: 1000, H: 52, size: 15};
const SHIFT = 6;
export const feedY = (f: number) => {
  const arrived = RX.filter((x) => rxArrive(x) <= f);
  const c = arrived.reduce((s, x) => s + Math.min(1, (f - rxArrive(x)) / SHIFT), 0);
  return arrived.map((x, i) => ({rx: x, y: FEED.bottom - (c - i) * FEED.H}));
};
export const FEED_BYTES = 15;
export const feedByteX = (j: number) => FEED.x + 16 + j * 3 * FEED.size * CHAR;
export const heroFeedY = () => feedY(DRIVE.end + 20).find((e) => e.rx === HERO)!.y;

/** The road map with emitters, scanner, packets and sighting trail. */
export const MapLayer = ({frame: f, intro = true}: {frame: number; intro?: boolean}) => {
  const reveal = intro ? p(f, 0, 34) : 1;
  const [sx, sy] = scannerAt(f);
  const [ax, ay] = bez(Math.min(1, scannerT(f) + 0.01));
  const heading = Math.atan2(ay - sy, ax - sx) * 180 / Math.PI;
  const received = RX.filter((x) => rxArrive(x) <= f);
  const heard = new Set(received.map((x) => x.e.id));
  return <g>
    <defs>
      <pattern id="dotgrid" width={32} height={32} patternUnits="userSpaceOnUse"><circle cx={2} cy={2} r={1.1} fill="#2a2a2a"/></pattern>
      <radialGradient id="range"><stop offset="0" stopColor={C.blue} stopOpacity={0.16}/><stop offset="0.75" stopColor={C.blue} stopOpacity={0.06}/><stop offset="1" stopColor={C.blue} stopOpacity={0}/></radialGradient>
      <clipPath id="mapclip"><rect x={MAP.x0} y={MAP.y0} width={MAP.x1 - MAP.x0} height={MAP.y1 - MAP.y0} rx={18}/></clipPath>
    </defs>
    <g clipPath="url(#mapclip)">
      <rect x={MAP.x0} y={MAP.y0} width={MAP.x1 - MAP.x0} height={MAP.y1 - MAP.y0} fill="url(#dotgrid)" opacity={reveal}/>
      {ROADS.map((d, i) => <path key={i} d={d} stroke={C.road} strokeWidth={12} fill="none" pathLength={1}
        strokeDasharray={1} strokeDashoffset={1 - reveal} strokeLinecap="round"/>)}
      <path d={HWY_D} stroke="#262626" strokeWidth={34} fill="none" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - reveal}/>
      <path d={HWY_D} stroke={C.hwyEdge} strokeWidth={1.2} fill="none" strokeDasharray="14 18" opacity={0.8 * reveal}/>
      {/* scanner range */}
      <circle cx={sx} cy={sy} r={RANGE} fill="url(#range)" opacity={p(f, DRIVE.start - 10, DRIVE.start + 10)}/>
      <circle cx={sx} cy={sy} r={RANGE} fill="none" stroke={C.blue} strokeOpacity={0.28} strokeDasharray="3 7"
        opacity={p(f, DRIVE.start - 10, DRIVE.start + 10)}/>
      {/* sighting trail: one dot per reception, at the scanner's position */}
      {received.map((x, i) => {
        const j = ((x.e.id * 7 + i * 13) % 11 - 5) * 1.6;
        return <circle key={i} cx={x.sx + j} cy={x.sy - j * 0.6} r={3.4} fill={C.blue} opacity={0.85 * p(f, rxArrive(x), rxArrive(x) + 8)}/>;
      })}
      {/* emitters + advertising ripples */}
      {EMITTERS.map((e) => {
        const appear = intro ? p(f, 8 + (e.id % 23) * 1.4, 26 + (e.id % 23) * 1.4) : 1;
        const age = (f + e.phase) % e.period;
        const ripple = age < 26 && f > 20 ? age / 26 : -1;
        const isHeard = heard.has(e.id);
        return <g key={e.id} transform={`translate(${e.x} ${e.y})`} opacity={appear}>
          {ripple >= 0 && <circle r={8 + ripple * 30} fill="none" stroke={C.blue} strokeWidth={1.4} opacity={(1 - ripple) * 0.55}/>}
          {isHeard && <circle r={16} fill="none" stroke={C.blueHi} strokeOpacity={0.35} strokeWidth={1}/>}
          <g transform={e.kind === 'car' ? 'rotate(-28)' : undefined}><Glyph kind={e.kind} color={isHeard ? C.blueHi : '#6b7f99'}/></g>
        </g>;
      })}
      {/* packets in flight */}
      {RX.filter((x) => f >= x.frame && f < rxArrive(x)).map((x, i) => {
        const k = (f - x.frame) / PACKET_FLIGHT;
        const px = lerp(x.e.x, sx, k), py = lerp(x.e.y, sy, k);
        const qx = lerp(x.e.x, sx, Math.max(0, k - 0.3)), qy = lerp(x.e.y, sy, Math.max(0, k - 0.3));
        return <g key={i}>
          <line x1={qx} y1={qy} x2={px} y2={py} stroke={C.blueHi} strokeWidth={2} strokeLinecap="round" opacity={0.7}/>
          <circle cx={px} cy={py} r={4} fill="#fff"/>
        </g>;
      })}
      {/* scanner vehicle */}
      <g transform={`translate(${sx} ${sy}) rotate(${heading})`} opacity={p(f, DRIVE.start - 14, DRIVE.start)}>
        <rect x={-22} y={-11} width={44} height={22} rx={8} fill="#1c1c1c" stroke="#fff" strokeWidth={2}/>
        <path d="M 6 -9 V 9" stroke="#fff" strokeWidth={1.6}/>
        <circle cx={-6} cy={0} r={3.5} fill={C.blue}/>
      </g>
    </g>
    <g opacity={p(f, DRIVE.start, DRIVE.start + 16)}>
      <Txt x={sx} y={sy - 30} anchor="middle" size={17} color={C.text} weight={550}>passive scanner</Txt>
    </g>
  </g>;
};

/** Receiver log: the raw stream as the scanner sees it. */
export const Feed = ({frame: f, fadeOthers = 0, heroGlow = 0, heroOpacity = 1, extra = [HERO]}: {frame: number; fadeOthers?: number; heroGlow?: number; heroOpacity?: number; extra?: typeof RX}) => {
  const entries = feedY(Math.min(f, DRIVE.end + 20));
  const panel = p(f, 14, 40);
  return <g opacity={panel}>
    <defs><clipPath id="feedclip"><rect x={FEED.x} y={FEED.top} width={FEED.w} height={FEED.bottom - FEED.top}/></clipPath>
      <linearGradient id="feedfade" x1={0} y1={0} x2={0} y2={1}>
        <stop offset="0" stopColor={C.bg} stopOpacity={1}/><stop offset="0.16" stopColor={C.bg} stopOpacity={0}/></linearGradient></defs>
    <g opacity={1 - fadeOthers}>
      <Txt x={FEED.x} y={FEED.y + 50} size={26} color={C.text} weight={650}>Receiver log</Txt>
      <line x1={FEED.x} x2={FEED.x + FEED.w} y1={FEED.top - 12} y2={FEED.top - 12} stroke={C.line}/>
    </g>
    <g clipPath="url(#feedclip)" fontFamily={MONO} fontSize={FEED.size}>
      {entries.filter((e) => e.y > FEED.top - FEED.H && e.y < FEED.bottom).map(({rx, y}) => {
        const hero = extra.includes(rx);
        const fresh = 1 - p(f, rxArrive(rx), rxArrive(rx) + 20);
        const b = fmtBytes(rx.payload);
        return <g key={`${rx.frame}-${rx.e.id}`} opacity={hero ? heroOpacity : 1 - fadeOthers}>
          <rect x={FEED.x} y={y + 2} width={FEED.w} height={FEED.H - 6} rx={6}
            fill={hero && heroGlow ? "#ffffff" : C.blue} opacity={hero && heroGlow ? 0.12 * heroGlow : fresh * 0.14}/>
          {hero && heroGlow > 0 && <rect x={FEED.x} y={y + 2} width={FEED.w} height={FEED.H - 6} rx={6} fill="none" stroke="#ffffff" strokeOpacity={heroGlow}/>}
          <text x={FEED.x + 16} y={y + 21} fill={C.sub}>{fmtTime(rx.frame)}<tspan dx={14} fill={C.blueHi}>{fmtAddr(rx.addr)}</tspan></text>
          <text x={FEED.x + FEED.w - 14} y={y + 21} fill={C.sub} textAnchor="end">{rx.rssi} dBm</text>
          <text x={FEED.x + 16} y={y + 42} fill="#aebfd6">{b.slice(0, FEED_BYTES).join(' ')}{b.length > FEED_BYTES ? ' …' : ''}</text>
        </g>;
      })}
      <rect x={FEED.x} y={FEED.top} width={FEED.w} height={(FEED.bottom - FEED.top)} fill="url(#feedfade)" opacity={1 - fadeOthers}/>
    </g>
  </g>;
};

export const Scan = ({frame}: {frame: number}) => <g>
  <MapLayer frame={frame}/>
  <Feed frame={frame}/>
</g>;
