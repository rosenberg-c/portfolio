include .inkscape/Makefile.mk
include .mermaid/Makefile.mk
include .screenshot-puppeteer/Makefile.mk
include .screenshot-server/Makefile.mk
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
	$(MAKE) svgo-render
	$(MAKE) typst-render
	$(MAKE) screenshot-server-start
	$(MAKE) screenshot-puppeteer
	$(MAKE) screenshot-server-stop
