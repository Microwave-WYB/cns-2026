# Development

This directory is a mise monorepo (same layout as SciTra-Runtime): the root `mise.toml` sets the toolchain (`node = "24"`) and the config roots `remotion/` and `slides/`.

```sh
mise install node@24   # only the tool this project needs (a plain `mise install` also processes the global config)
mise run //:build      # render the animation (if changed), cut per-segment clips, build the slides into slides/dist/
mise run //:dev        # same inputs, then serve the slides on $CNS_BIND_HOST:3030
mise run //:check      # type-check + playback check for the animation, build the slides
mise tasks --all       # every task, including //remotion:studio (3000) and //remotion:player (3001)
```

Dependency chain: `//slides:build` / `//slides:dev` → `//slides:anim` → `//remotion:render` → `//remotion:install`.
`//remotion:render` writes `remotion/out/architecture.mp4` plus `remotion/out/segments/NN-<segment>.mp4` (one clip per entry in `remotion/src/segments.ts`); `//slides:anim` copies them into `slides/public/`. Tasks declare `sources`/`outputs`, so unchanged steps are skipped.

Dev servers bind only to `CNS_BIND_HOST` (the Tailnet address, set in the root `mise.toml`). Remotion Studio has no host flag, so `//remotion:studio` preloads `remotion/scripts/bind-host.cjs` to rebind its port.
