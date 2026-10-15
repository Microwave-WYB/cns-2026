import {createRoot} from 'react-dom/client';
import {Player} from '@remotion/player';
import {Architecture} from './Architecture';
import {DURATION, FPS} from './segments';
import './presenter.css';

// Plain continuous video with the stock Remotion Player controls.
// The custom segment presenter (presenter.tsx) is kept but not used for now.
createRoot(document.getElementById('root')!).render(<main>
  <Player component={Architecture} durationInFrames={DURATION} fps={FPS}
    compositionWidth={1920} compositionHeight={1080} style={{width: '100%'}}
    controls loop={false} clickToPlay spaceKeyToPlayOrPause doubleClickToFullscreen allowFullscreen/>
</main>);
