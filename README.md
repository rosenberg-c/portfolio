# README

A portfolio app

Built with React, TypeScript, React Router, and Vite+.

## Getting started

Install [Vite+](https://viteplus.dev/guide/) and dependencies, then start the development server:

```sh
vp install
vp run dev
```

## Commands

```sh
vp check             # format, lint, and type-check
vp test              # run Vitest unit tests
vp run build         # check CSS declarations, type-check, and build
vp run css:generate  # regenerate CSS module declarations
vp run css:check     # fail if declarations are missing or stale
vp run css:watch     # regenerate CSS declarations as styles change
vp preview           # preview the build locally
```

CSS module declarations are generated from `*.module.css` and committed alongside the styles.
Run `vp run css:watch` in a second terminal while editing CSS modules;
`vp run dev` generates them on startup. The production build rejects stale declarations
before type-checking.

## Mermaid diagrams

Prerequisite:

- docker

Renders svg and png diagrams from provided `.mmd` files in `docs/` dir,
(see `docs/example.mmd`).
Diagrams are rendered via Docker using the `minlag/mermaid-cli:latest` image.
Docker pulls the image if needed; you don't need to install Mermaid CLI locally.

```sh
make mermaid-render  # render all diagrams to sibling .generated.png and .generated.svg files
make mermaid-clean   # delete generated PNG and SVG files under docs/
```

Rendering uses `minlag/mermaid-cli` via `.mermaid/render.sh`.
Adjust theme, background, scale, CSS, or config with the

`MERMAID_THEME`, `MERMAID_BG`, `MERMAID_SCALE`, `MERMAID_CSS`,
and `MERMAID_CONFIG` make variables; defaults live in `Makefile.mermaid.mk`.

Generated files are ignored by Git.
