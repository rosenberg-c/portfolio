import { expect, it } from "vite-plus/test";
import bombArtwork from "../../assets/bomb/atari_st_original_bomb.svg";
import { renderApp } from "../../test/setup";

it("shows the supplied artwork and updated message for an unknown address", () => {
  const host = renderApp("/missing");
  const page = host.querySelector(".not-found");

  expect(page?.querySelector("h1")?.textContent).toBe(
    "We couldn't find that address",
  );
  const artworks = page?.querySelectorAll(".not-found__artworks img");
  expect(artworks).toHaveLength(3);
  for (const artwork of artworks ?? []) {
    expect(artwork.getAttribute("src")).toBe(bombArtwork);
    expect(artwork.getAttribute("alt")).toBe("");
  }
});
