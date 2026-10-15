# Toward a Continuous, Ecosystem-Scale Bluetooth Security Observatory

## Build

Requires [mise](https://mise.jdx.dev/) and Node.js 24. The tasks install npm dependencies automatically.

```sh
mise trust
mise install node@24
mise run //:build     # Render videos and build slides into slides/dist/
mise run //:check     # Type-check, verify playback, and build slides
```

Videos are generated during the build and are not committed.

## Development

```sh
mise run //:dev       # Serve slides on $CNS_BIND_HOST:3030
mise tasks --all      # List all tasks
```

For local development, set `CNS_BIND_HOST` in the root `mise.toml` to `127.0.0.1` (the default is a machine-specific Tailnet address).
