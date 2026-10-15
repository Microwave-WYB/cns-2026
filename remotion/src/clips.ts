// Presenter clips: each slide plays one clip and holds its last frame while the speaker talks.
// Cut points sit on settled frames (a tab fully shown, a group fully formed), not mid-transition.
export type Clip = {name: string; comp: 'Architecture' | 'MoreWays'; from: number; to: number};
export const CLIPS: Clip[] = [
  {name: '01-scan', comp: 'Architecture', from: 0, to: 404},
  {name: '02-parse', comp: 'Architecture', from: 405, to: 700},
  {name: '03-pile', comp: 'Architecture', from: 700, to: 869},
  {name: '04-wildcard', comp: 'Architecture', from: 870, to: 1050},
  {name: '05-cluster', comp: 'Architecture', from: 1050, to: 1464},
  {name: '06-sig', comp: 'Architecture', from: 1465, to: 1636},
  {name: '07-appstore', comp: 'Architecture', from: 1636, to: 1766},
  {name: '08-decompile', comp: 'Architecture', from: 1766, to: 1906},
  {name: '09-validate', comp: 'Architecture', from: 1906, to: 2120},
  {name: '10-parallel', comp: 'Architecture', from: 2120, to: 2364},
  {name: '11-knowledge', comp: 'Architecture', from: 2365, to: 2664},
  {name: '12-scale', comp: 'Architecture', from: 2665, to: 3264},
  {name: '13-apps', comp: 'MoreWays', from: 0, to: 348},
  {name: '14-wigle', comp: 'MoreWays', from: 348, to: 480},
  {name: '15-hospitals', comp: 'MoreWays', from: 480, to: 675},
  {name: '16-overrep', comp: 'MoreWays', from: 675, to: 925},
  {name: '17-converge', comp: 'MoreWays', from: 925, to: 1199},
];
