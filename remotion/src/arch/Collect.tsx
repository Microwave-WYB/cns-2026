import {C, CHAR, MONO, Txt, inOut, lerp, p} from './kit';
import {FEED, FEED_BYTES, Feed, MapLayer, feedByteX, feedY} from './Scan';
import {DRIVE, HERO, SCAN_END, STRIPS, fmtBytes, type Rx} from './data';
import {SEGMENTS} from '../segments';
import {PILE, PILE_H, PILE_PITCH, StripView} from './Strip';

// Three example lines taken from the receiver log.
const visible = feedY(DRIVE.end + 20).filter((e) => e.y > FEED.top && e.y < FEED.bottom - 10);
const pick = (fam: string) => visible.find((e) => e.rx.e.fam === fam && e.rx !== HERO)!;
export const EXAMPLES = [visible.find((e) => e.rx === HERO)!, pick('A'), pick('C')];
const stripOf = (rx: Rx) => STRIPS.findIndex((s) => s.rx.e.id === rx.e.id);

const EX = {x: 150, y: [318, 566, 814], pitch: 46, h: 52};
const T_FLY = 18, T_HERO = 96, HERO_STEP = 30, T_REST = 236, T_PILE = 300;

export const Collect = ({frame: g}: {frame: number}) => {
  const f = SEGMENTS[1].start + g;
  const toPile = p(g, T_PILE, T_PILE + 60, inOut);
  const detail = 1 - p(g, T_PILE - 4, T_PILE + 14);
  return <g>
    <g opacity={1 - p(g, 6, 36)}><MapLayer frame={f} intro={false}/></g>
    <Feed frame={SCAN_END} fadeOthers={p(g, 4, 28)} heroOpacity={1 - p(g, 24, 40)}
      heroGlow={p(g, 0, 10)} extra={EXAMPLES.map((e) => e.rx)}/>

    <g opacity={p(g, 70, 92) * detail}>
      <Txt x={EX.x} y={170} size={30} color={C.text} weight={600}>An advertisement is a list of AD structures</Txt>
      <Txt x={EX.x + 640} y={170} size={22} color={C.sub}>each: length · type · value</Txt>
    </g>

    {/* other advertisers arrive into the pile */}
    {STRIPS.map((s, i) => {
      if (EXAMPLES.some((e) => e.rx.e.id === s.rx.e.id)) return null;
      const k = p(g, T_PILE + 10 + (i % 23) * 2.2, T_PILE + 56 + (i % 23) * 2.2, inOut);
      if (k <= 0) return null;
      const q = PILE[i];
      return <StripView key={i} ads={s.ads} x={lerp(FEED.x + 60, q.x, k)} y={lerp(FEED.top + 360 + (i % 9) * 40, q.y, k)}
        pitch={PILE_PITCH} h={PILE_H} rot={q.rot * k} opacity={k} parse={s.ads.length} solid={1}/>;
    })}

    {EXAMPLES.map((e, n) => {
      const si = stripOf(e.rx);
      const s = STRIPS[si];
      const q = PILE[si];
      const all = fmtBytes(e.rx.payload);
      const flyEnd = T_FLY + 40 + n * 6 + all.length * 0.6;
      if (g < flyEnd) {
        // bytes travelling from the log line to their tile positions
        return <g key={n} fontFamily={MONO}>
          {all.map((b, j) => {
            const t = p(g, T_FLY + n * 6 + j * 0.6, T_FLY + 40 + n * 6 + j * 0.6, inOut);
            const sx = feedByteX(Math.min(j, FEED_BYTES)) + FEED.size * CHAR, sy = e.y + 42;
            const tx = EX.x + j * EX.pitch + (EX.pitch - 6) / 2, ty = EX.y[n] + EX.pitch * 0.18;
            return <text key={j} x={lerp(sx, tx, t)} y={lerp(sy, ty, t)} fontSize={lerp(FEED.size, EX.pitch * 0.5, t)}
              textAnchor="middle" fill="#cfe3ff" opacity={j > FEED_BYTES ? p(g, 30, 50) : 1}>{b}</text>;
          })}
        </g>;
      }
      const parse = n === 0
        ? Math.min(s.ads.length, Math.max(0, (g - T_HERO) / HERO_STEP))
        : s.ads.length * p(g, T_REST + (n - 1) * 14, T_REST + 34 + (n - 1) * 14, inOut);
      return <StripView key={n} ads={s.ads}
        x={lerp(EX.x, q.x, toPile)} y={lerp(EX.y[n], q.y, toPile)} pitch={lerp(EX.pitch, PILE_PITCH, toPile)} h={lerp(EX.h, PILE_H, toPile)}
        rot={q.rot * toPile} parse={parse} solid={toPile} bytes={detail} tags={detail} labels={detail}
        bg={p(g, flyEnd - 10, flyEnd + 10)} cursor={n === 0 && g < T_HERO + HERO_STEP * s.ads.length ? parse : -1}/>;
    })}

    <g opacity={p(g, T_PILE + 70, T_PILE + 100)}>
    </g>
  </g>;
};
