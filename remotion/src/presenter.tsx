import {useEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Player, type PlayerRef, type CallbackListener} from '@remotion/player';
import {Architecture} from './Architecture';
import {DURATION, FPS, SEGMENTS, segmentAt, transition, type Action} from './segments';
import './presenter.css';

function Presenter() {
  const player = useRef<PlayerRef>(null);
  const screen = useRef<HTMLDivElement>(null);
  const state = useRef({frame: 0, playing: false, preview: false, started: false, boundary: SEGMENTS[0].end as number});
  const lastAdvance = useRef(-Infinity);
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [preview, setPreview] = useState(false);
  const [error, setError] = useState('');
  const apply = (next: {frame: number; playing: boolean}) => {
    const p = player.current;
    if (!p) return;
    state.current.frame = next.frame;
    state.current.playing = next.playing;
    state.current.boundary = state.current.preview ? DURATION - 1 : SEGMENTS[Math.max(0, segmentAt(next.frame))].end;
    state.current.started = true;
    p.pause();
    p.seekTo(next.frame);
    if (next.playing) p.play();
    setFrame(next.frame);
    setPlaying(next.playing);
  };
  const act = (action: Action) => {
    if (action === 'next') {
      // Mouse double-click / touch duplication must not advance twice.
      const now = performance.now();
      if (now - lastAdvance.current < 220) return;
      lastAdvance.current = now;
      if (!state.current.started) {apply({frame: 0, playing: true}); return;}
    }
    apply(transition(state.current.frame, state.current.playing, action));
  };
  const fullscreen = () => {
    const promise = document.fullscreenElement ? document.exitFullscreen() : screen.current?.requestFullscreen();
    promise?.catch(() => setError('Fullscreen unavailable in this browser.'));
  };
  useEffect(() => {
    const p = player.current;
    if (!p) return;
    const update: CallbackListener<'frameupdate'> = ({detail}) => {
      const s = state.current;
      // Clamp to the active range, not a range inferred from an overshooting event.
      const f = Math.min(detail.frame, s.boundary);
      s.frame = f;
      setFrame(f);
      if (detail.frame >= s.boundary && s.playing) {
        s.playing = false;
        p.pause();
        if (detail.frame !== s.boundary) p.seekTo(s.boundary);
        setPlaying(false);
      }
    };
    p.addEventListener('frameupdate', update);
    // No ended handler: stale ended events cannot reset or advance a newer range.
    return () => p.removeEventListener('frameupdate', update);
  }, []);
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if (event.repeat || event.altKey || event.ctrlKey || event.metaKey) return;
      if ((event.target as HTMLElement).closest('button, input, select, textarea, a')) return;
      const actions: Record<string, Action> = {' ': 'next', ArrowRight: 'next', ArrowLeft: 'previous', r: 'replay', p: 'toggle'};
      if (actions[event.key]) {event.preventDefault(); act(actions[event.key]);}
      if (event.key === 'f') {event.preventDefault(); fullscreen();}
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  });
  const changePreview = () => {
    const value = !state.current.preview;
    state.current.preview = value;
    setPreview(value);
    apply({frame: state.current.frame, playing: state.current.playing});
  };
  const index = Math.max(0, segmentAt(frame));
  return <main>
    <div className="screen" ref={screen}>
      <div className="canvas" onClick={() => act('next')} role="button" tabIndex={0} aria-label="Start or advance segment">
        <Player ref={player} component={Architecture} durationInFrames={DURATION} fps={FPS}
          compositionWidth={1920} compositionHeight={1080} style={{width: '100%'}}
          controls={false} loop={false} autoPlay={false} clickToPlay={false}
          spaceKeyToPlayOrPause={false} doubleClickToFullscreen={false} moveToBeginningWhenEnded={false}/>
      </div>
      <nav aria-label="Presenter controls">
        <button onClick={() => act('previous')}>Previous</button>
        <button onClick={() => act('replay')}>Replay</button>
        <button onClick={() => act('toggle')}>{playing ? 'Pause' : 'Resume'}</button>
        <button onClick={() => act('next')}>Advance</button>
        <button onClick={changePreview} aria-pressed={preview}>Continuous preview: {preview ? 'on' : 'off'}</button>
        <button onClick={fullscreen}>Fullscreen</button>
        <output aria-live="polite">{SEGMENTS[index].label} · {playing ? 'playing' : 'held'} · frame {frame}</output>
      </nav>
    </div>
    <p>Click / Space / → advance; mid-segment advance holds its end. ← previous · R replay · P pause · F fullscreen.</p>
    {error && <p role="alert">{error}</p>}
  </main>;
}
createRoot(document.getElementById('root')!).render(<Presenter/>);

