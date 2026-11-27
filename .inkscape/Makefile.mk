# Export original SVG assets as page-bounded PNGs in the generated asset tree.
INKSCAPE_RENDER ?= .inkscape/render.sh
INKSCAPE_IMAGE ?= portfolio-inkscape:1.4.2
INKSCAPE_PNG_WIDTH ?= 512

.PHONY: inkscape-render
inkscape-render:
	INKSCAPE_IMAGE="$(INKSCAPE_IMAGE)" INKSCAPE_PNG_WIDTH="$(INKSCAPE_PNG_WIDTH)" bash "$(INKSCAPE_RENDER)"
