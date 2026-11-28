include .inkscape/Makefile.mk
include .mermaid/Makefile.mk
include .screenshot-puppeteer/Makefile.mk
include .svgo/Makefile.mk
include .typst/Makefile.mk

VP ?= vp

.PHONY: ready
ready:
	$(VP) run css:generate
	$(VP) run css:check
	$(VP) check
	$(VP) test
	$(VP) build

.PHONY: ready-docker
ready-docker:
	$(MAKE) mermaid-render
	$(MAKE) screenshot-puppeteer
	$(MAKE) svgo-render
	$(MAKE) typst-render
