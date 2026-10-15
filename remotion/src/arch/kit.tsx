import {useEffect, useState} from 'react';
import {Easing, continueRender, delayRender, interpolate, staticFile} from 'remotion';
import type {Kind} from './data';

export const C = {
  bg: '#121212',
  dots: '#20202000',
  road: '#1f1f1f',
  hwy: '#2a2a2a80',
  hwyEdge: '#3a3a3a',
  blue: '#4ea8ff',
  blueHi: '#9dd0ff',
  blueDim: '#4a5a6e',
  text: '#ededed',
  sub: '#a3a3a3',
  faint: '#6b6b6b',
  line: '#333333',
  meta: '#d7c8f5', // receiver metadata: neutral lilac, distinct from over-the-air bytes
  yellow: '#fbbf24', // candidate / hypothesis
  purple: '#a78bfa', // agent work
  green: '#4ade80', // validated
};
export const SANS = 'CNSInter, Inter, system-ui, sans-serif';
export const MONO = 'CNSMono, "Noto Sans Mono", monospace';
export const CHAR = 0.6; // mono advance, em

export const ease = Easing.bezier(0.22, 0.8, 0.25, 1);
export const inOut = Easing.bezier(0.65, 0, 0.35, 1);
export const p = (f: number, a: number, b: number, e = ease) =>
  interpolate(f, [a, b], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: e});
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const FONTS = [
  ['CNSInter', 'fonts/InterVariable.ttf', '100 900'],
  ['CNSMono', 'fonts/NotoSansMono-Regular.ttf', '400'],
] as const;
export const useFonts = () => {
  const [handle] = useState(() => delayRender('fonts'));
  useEffect(() => {
    Promise.all(FONTS.map(([family, file, weight]) => {
      const face = new FontFace(family, `url(${staticFile(file)})`, {weight});
      document.fonts.add(face);
      return face.load();
    })).catch((e) => console.warn('font load failed', e)).finally(() => continueRender(handle));
  }, [handle]);
};

// Small line glyphs, centred on (0,0), roughly 22px.
export const Glyph = ({kind, color, w = 1.6}: {kind: Kind; color: string; w?: number}) => {
  const s = {fill: 'none', stroke: color, strokeWidth: w, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const};
  switch (kind) {
    case 'phone': return <g {...s}><rect x={-6} y={-10} width={12} height={20} rx={2.5}/><path d="M -2 7 H 2"/></g>;
    case 'tag': return <g {...s}><circle r={7.5}/><circle r={2.2}/></g>;
    case 'watch': return <g {...s}><rect x={-6} y={-6} width={12} height={12} rx={3}/><path d="M -4 -6 V -10 H 4 V -6 M -4 6 V 10 H 4 V 6"/></g>;
    case 'buds': return <g {...s}><path d="M -7 -6 a 3.5 3.5 0 1 1 3 6 v 6"/><path d="M 7 -6 a 3.5 3.5 0 1 0 -3 6 v 6"/></g>;
    case 'lock': return <g {...s}><rect x={-7} y={-2} width={14} height={11} rx={2}/><path d="M -4 -2 V -5 a 4 4 0 0 1 8 0 V -2"/></g>;
    case 'car': return <g {...s}><rect x={-13} y={-6.5} width={26} height={13} rx={5}/><path d="M 4 -5 V 5 M -7 -5 V 5"/></g>;
  }
};

export const Txt = ({x, y, children, size = 18, color = C.sub, weight = 450, anchor = 'start', mono = false, opacity = 1, spacing = 0}: {
  x: number; y: number; children: React.ReactNode; size?: number; color?: string; weight?: number;
  anchor?: 'start' | 'middle' | 'end'; mono?: boolean; opacity?: number; spacing?: number;
}) => <text x={x} y={y} fontSize={size} fill={color} fontWeight={weight} textAnchor={anchor} opacity={opacity}
  fontFamily={mono ? MONO : SANS} letterSpacing={spacing}>{children}</text>;
