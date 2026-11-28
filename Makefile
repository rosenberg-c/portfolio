include .inkscape/Makefile.mk
include .mermaid/Makefile.mk
include .screenshot-puppeteer/Makefile.mk
include .screenshot-server/Makefile.mk
include .svgo/Makefile.mk
include .typst/Makefile.mk

VP ?= vp

.PHONY: ready-generate
ready-generate:
	$(MAKE) svgo-render
	$(VP) run css:generate
	$(VP) run css:check

.PHONY: ready-check
ready-check:
	$(VP) check
	$(VP) test

.PHONY: build
build:
	$(VP) build

.PHONY: ready-docs
ready-docs:
	$(MAKE) mermaid-render
	$(MAKE) typst-render
	$(MAKE) screenshot-server-start
	$(MAKE) screenshot-puppeteer
	$(MAKE) screenshot-server-stop

.PHONY: ready
ready: ready-generate ready-check build ready-docs
