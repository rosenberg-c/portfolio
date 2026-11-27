#!/usr/bin/env bash
# Optimize original assets/*.svg into src/assets with the same relative paths.
# SVGO_IMAGE overrides the Docker image built from .svgo/Dockerfile.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
IMAGE="${SVGO_IMAGE:-portfolio-svgo:4.1.0}"
cd "$ROOT"
[ -d assets ] || { echo 'svgo-render: assets directory not found' >&2; exit 1; }
[ ! -L src ] && [ ! -L src/assets ] || { echo 'svgo-render: output directory must not be a symlink' >&2; exit 1; }

list="$(mktemp)"
trap 'rm -f "$list"' EXIT
# Legacy generated exports may still exist alongside originals; never reprocess them.
find assets -type f -name '*.svg' ! -name '*.generated*.svg' ! -name '*.optimized.svg' ! -name '*.plain.svg' -print0 | LC_ALL=C sort -z > "$list"
if [ ! -s "$list" ]; then
  echo 'svgo-render: no original SVG files under assets (nothing to do)' >&2
  exit 0
fi

docker build -t "$IMAGE" .svgo
mkdir -p src/assets
while IFS= read -r -d '' file; do
  out="src/assets/${file#assets/}"
  mkdir -p "$(dirname "$out")"
  [ "$(cd "$(dirname "$out")" && pwd -P)" = "$ROOT/$(dirname "$out")" ] && [ ! -L "$out" ] || {
    echo "svgo-render: refusing symlinked output: $out" >&2; exit 1;
  }
  echo "svgo-render: $file -> $out"
  docker run --rm -u "$(id -u):$(id -g)" \
    -v "$ROOT/assets:/data/assets:ro" \
    -v "$ROOT/src/assets:/data/src/assets" \
    -v "$ROOT/.svgo/svgo.config.mjs:/config/svgo.config.mjs:ro" \
    "$IMAGE" --config /config/svgo.config.mjs --input "$file" --output "$out"
done < "$list"
