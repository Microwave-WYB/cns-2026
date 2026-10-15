export const FPS = 30;
export const SEGMENTS = [
  {label: 'Scan', start: 0, end: 404},
  {label: 'Collect', start: 405, end: 869},
  {label: 'Cluster', start: 870, end: 1464},
  {label: 'Attribute', start: 1465, end: 2364},
  {label: 'Knowledge', start: 2365, end: 2664},
  {label: 'Scale', start: 2665, end: 3264},
] as const;
export const DURATION = SEGMENTS[SEGMENTS.length - 1].end + 1;
export const segmentAt = (frame: number) =>
  SEGMENTS.findIndex((segment) => frame <= segment.end);
export type Action = 'next' | 'previous' | 'replay' | 'toggle';
export function transition(frame: number, playing: boolean, action: Action) {
  const index = Math.max(0, segmentAt(frame));
  const segment = SEGMENTS[index];
  if (action === 'previous') return {frame: SEGMENTS[Math.max(0, index - 1)].start, playing: true};
  if (action === 'replay') return {frame: segment.start, playing: true};
  if (action === 'toggle') return {frame, playing: frame < segment.end && !playing};
  // An advance during motion reveals this segment's completed state, never jumps two stages.
  if (frame < segment.end) return {frame: segment.end, playing: false};
  const next = SEGMENTS[index + 1];
  return next ? {frame: next.start, playing: true} : {frame: segment.end, playing: false};
}
export const shouldHold = (frame: number, preview: boolean) =>
  frame >= (preview ? DURATION - 1 : SEGMENTS[Math.max(0, segmentAt(frame))].end);

