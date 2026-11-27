#!/usr/bin/env bash
# Export original assets/*.svg to page-bounded PNGs under src/assets.
# INKSCAPE_IMAGE and INKSCAPE_PNG_WIDTH override the built image and output width.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
IMAGE="${INKSCAPE_IMAGE:-portfolio-inkscape:1.4.2}"
WIDTH="${INKSCAPE_PNG_WIDTH:-512}"
[[ "$WIDTH" =~ ^[1-9][0-9]*$ ]] || { echo 'inkscape-render: INKSCAPE_PNG_WIDTH must be a positive integer' >&2; exit 1; }
cd "$ROOT"
[ -d assets ] || { echo 'inkscape-render: assets directory not found' >&2; exit 1; }
[ ! -L src ] && [ ! -L src/assets ] || { echo 'inkscape-render: output directory must not be a symlink' >&2; exit 1; }

list="$(mktemp)"
trap 'rm -f "$list"' EXIT
find assets -type f -name '*.svg' ! -name '*.generated*.svg' ! -name '*.optimized.svg' ! -name '*.plain.svg' -print0 | LC_ALL=C sort -z > "$list"
if [ ! -s "$list" ]; then
  echo 'inkscape-render: no original SVG files under assets (nothing to do)' >&2
  exit 0
fi

docker build -t "$IMAGE" .inkscape
while IFS= read -r -d '' file; do
  out="src/assets/${file#assets/}"
  out="${out%.svg}.png"
  mkdir -p "$(dirname "$out")"
  [ "$(cd "$(dirname "$out")" && pwd -P)" = "$ROOT/$(dirname "$out")" ] && [ ! -L "$out" ] || {
    echo "inkscape-render: refusing symlinked output: $out" >&2; exit 1;
  }
  echo "inkscape-render: $file -> $out"
  docker run --rm -u "$(id -u):$(id -g)" \
    -e HOME=/tmp -v "$ROOT:/work" "$IMAGE" "$file" \
    --export-area-page --export-width="$WIDTH" --export-filename="$out"
done < "$list"
