import {AbsoluteFill, Composition, interpolate, useCurrentFrame} from 'remotion';
import {Architecture} from './Architecture';
import {MW_DURATION, MoreWays} from './MoreWays';
import {DURATION, FPS} from './segments';

const Intro = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const y = interpolate(frame, [0, 30], [24, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{
      backgroundColor: '#0b1220', color: '#f8fafc',
      fontFamily: 'sans-serif', justifyContent: 'center', padding: 120,
    }}>
      <div style={{opacity, transform: `translateY(${y}px)`}}>
        <div style={{color: '#60a5fa', fontSize: 28, marginBottom: 24}}>CNS 2026 · STARTER</div>
        <h1 style={{fontSize: 76, lineHeight: 1.15, margin: 0, maxWidth: 1500}}>
          Toward a Continuous, Ecosystem-Scale Bluetooth Security Observatory
        </h1>
        <p style={{fontSize: 34, color: '#cbd5e1', marginTop: 40}}>
          Discover. Understand. Validate. Measure repair.
        </p>
      </div>
    </AbsoluteFill>
  );
};

export const Root = () => (
  <>
    <Composition id="CNSIntro" component={Intro}
      durationInFrames={180} fps={30} width={1920} height={1080} />
    <Composition id="Architecture" component={Architecture}
      durationInFrames={DURATION} fps={FPS} width={1920} height={1080} />
    <Composition id="MoreWays" component={MoreWays}
      durationInFrames={MW_DURATION} fps={FPS} width={1920} height={1080} />
  </>
);


