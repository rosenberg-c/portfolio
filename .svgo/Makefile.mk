# Optimize original SVG assets into the generated asset tree.
SVGO_RENDER ?= .svgo/render.sh
SVGO_IMAGE ?= portfolio-svgo:4.1.0

.PHONY: svgo-render
svgo-render:
	SVGO_IMAGE="$(SVGO_IMAGE)" bash "$(SVGO_RENDER)"
