import type {ComponentType} from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame} from 'remotion';
import {SEGMENTS} from './segments';
import {C, SANS, useFonts} from './arch/kit';
import {Scan} from './arch/Scan';
import {Collect} from './arch/Collect';
import {Cluster} from './arch/Cluster';
import {Attribute} from './arch/Attribute';
import {Knowledge} from './arch/Knowledge';
import {Scale} from './arch/Scale';

// Scenes take the sequence-relative frame.
const Scene = ({scene: S}: {scene: ComponentType<{frame: number}>}) => <S frame={useCurrentFrame()}/>;

// Named beats inside each scene (scene-relative frames). They render nothing;
// they only label the timeline in Remotion Studio. Keep in sync with the scene files.
const BEATS: Record<string, [string, number, number][]> = {
  Scan: [['Roads + devices appear', 0, 30], ['Drive · receive advertisements', 24, 345], ['Hold', 360, 405]],
  Collect: [['Log lines → bytes', 0, 96], ['Parse example 1', 96, 216], ['Parse examples 2–3', 236, 290],
    ['Into the pile', 300, 400], ['Hold', 400, 465]],
  Cluster: [['Compare two VX ads', 8, 200], ['Name → wildcard', 78, 118], ['Hold on wildcard names', 118, 185],
    ['Back into the pile', 200, 240], ['Normalize all names', 235, 270], ['Group by template', 275, 460],
    ['Cluster + noise labels', 377, 407], ['Caveat · hold', 471, 595]],
  Attribute: [['Focus cluster 6', 0, 40], ['Tab: SIG company IDs', 60, 180], ['Tab: app store → APK', 180, 310],
    ['Tab: decompiled scan code', 310, 450], ['Tab: observation DB', 450, 560], ['Attributed · reviewed', 560, 660],
    ['Other clusters in parallel', 675, 900]],
  Knowledge: [['Shrink field', 0, 40], ['Entries into KB', 60, 206], ['Reuse message · hold', 210, 300]],
  Scale: [['Stream + match', 40, 590], ['Batch 1', 170, 216], ['Batch 2', 280, 326], ['Batch 3', 390, 436], ['Batch 4', 500, 546],
    ['Hold', 546, 600]],
};
const SCENES: Record<string, ComponentType<{frame: number}>> = {Scan, Collect, Cluster, Attribute, Knowledge, Scale};

export const Architecture = () => {
  useFonts();
  return <AbsoluteFill style={{backgroundColor: C.bg, fontFamily: SANS}}>
    <svg viewBox="0 0 1920 1080" width="100%" height="100%">
      {SEGMENTS.map((s) => <Sequence key={s.label} name={s.label} from={s.start} durationInFrames={s.end - s.start + 1} layout="none">
        <Scene scene={SCENES[s.label]}/>
        {BEATS[s.label].map(([name, a, b]) => <Sequence key={name} name={name} from={a} durationInFrames={b - a} layout="none"><g/></Sequence>)}
      </Sequence>)}
    </svg>
  </AbsoluteFill>;
};
