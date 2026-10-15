import assert from 'node:assert/strict';
import {SEGMENTS, DURATION, transition, shouldHold} from '../src/segments.ts';

const last = SEGMENTS.length - 1;
assert.equal(DURATION, SEGMENTS[last].end + 1);
SEGMENTS.forEach((s, i) => {
  if (i > 0) assert.equal(s.start, SEGMENTS[i - 1].end + 1);
  assert.deepEqual(transition(s.start + 20, true, 'next'), {frame: s.end, playing: false});
  assert.equal(shouldHold(s.end, false), true);
  assert.equal(shouldHold(s.end - 1, false), false);
  assert.deepEqual(transition(s.end, false, 'next'), i < last
    ? {frame: SEGMENTS[i + 1].start, playing: true}
    : {frame: s.end, playing: false});
  assert.deepEqual(transition(s.end, false, 'replay'), {frame: s.start, playing: true});
  assert.deepEqual(transition(s.end, false, 'previous'),
    {frame: SEGMENTS[Math.max(0, i - 1)].start, playing: true});
});
assert.equal(shouldHold(SEGMENTS[0].end, true), false);
assert.equal(shouldHold(DURATION - 1, true), true);
assert.deepEqual(transition(80, true, 'toggle'), {frame: 80, playing: false});
assert.deepEqual(transition(80, false, 'toggle'), {frame: 80, playing: true});
assert.deepEqual(transition(DURATION - 1, false, 'toggle'), {frame: DURATION - 1, playing: false});
console.log(`Playback check passed: ${SEGMENTS.length} contiguous segments, ${DURATION} frames.`);
