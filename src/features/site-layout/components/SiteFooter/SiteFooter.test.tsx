import { act } from "react";
import { expect, it } from "vite-plus/test";
import { homeContent } from "../../../../pages/Home/Home.content";
import { navigation } from "../../content/navigation";
import { renderApp } from "../../../../test/setup";
import { siteFooterContent } from "./SiteFooter.content";

it("keeps the footer's own copy", () => {
  expect(siteFooterContent).toMatchObject({
    title: "Thanks for visiting",
    invitation: "Curious about my work? I'd be glad to connect.",
    notice: "Find my LinkedIn profile on the contact page.",
  });
});

it.each(["/", "/about", "/projects", "/contact", "/missing"])(
  "renders the shared footer on %s",
  (path) => {
    const host = renderApp(path);
    const footer = host.querySelector("footer");
    const nav = footer?.querySelector('nav[aria-label="Footer navigation"]');

    expect(footer).not.toBeNull();
    expect(footer?.querySelector("h2")?.textContent).toBe(
      siteFooterContent.title,
    );
    expect(footer?.textContent).toContain(siteFooterContent.invitation);
    expect(footer?.textContent).toContain(siteFooterContent.notice);
    expect(
      Array.from(nav?.querySelectorAll("a") ?? [], (link) => [
        link.getAttribute("href"),
        link.textContent,
      ]),
    ).toEqual(navigation.map(({ to, label }) => [to, label]));
    expect(
      footer?.querySelector("form, a[href^='mailto:'], a[href^='http']"),
    ).toBeNull();
  },
);

it("routes the footer action and navigation to the contact page", () => {
  const host = renderApp("/projects");
  const footer = host.querySelector("footer");
  const main = host.querySelector("main#main-content");
  const action = footer?.querySelector('a[href="/contact"]');

  expect(action?.textContent).toBe(siteFooterContent.action);
  act(() => {
    action?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(main?.querySelector('a[href="/projects"]')).not.toBeNull();
  expect(
    host.querySelector('nav a[href="/contact"]')?.getAttribute("aria-current"),
  ).toBe("page");

  const home = footer?.querySelector('nav a[href="/"]');
  act(() => {
    home?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(main?.querySelector("h1")?.textContent).toBe(homeContent.hero.title);
});
