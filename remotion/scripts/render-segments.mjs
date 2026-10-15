// Render every composition once, then cut the presenter clips (src/clips.ts) used by the slides.
import {execFileSync} from 'node:child_process';
import {mkdirSync, rmSync} from 'node:fs';
import {FPS} from '../src/segments.ts';
import {CLIPS} from '../src/clips.ts';

const run = (args) => execFileSync('npx', args, {stdio: 'inherit'});
const FILES = {Architecture: 'out/architecture.mp4', MoreWays: 'out/more-ways.mp4'};
for (const [comp, file] of Object.entries(FILES)) {
  run(['remotion', 'render', 'src/index.ts', comp, file, '--concurrency=6', '--log=error']);
}

rmSync('out/segments', {recursive: true, force: true});
rmSync('out/clips', {recursive: true, force: true});
mkdirSync('out/clips', {recursive: true});
for (const c of CLIPS) {
  run(['remotion', 'ffmpeg', '-v', 'error', '-y', '-ss', String(c.from / FPS), '-to', String((c.to + 1) / FPS),
    '-i', FILES[c.comp], '-an', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20', '-movflags', '+faststart',
    `out/clips/${c.name}.mp4`]);
}
console.log(`Rendered ${CLIPS.length} presenter clips into out/clips/`);
