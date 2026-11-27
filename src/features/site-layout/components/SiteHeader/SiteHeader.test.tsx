import { act } from "react";
import { afterEach, expect, it, vi } from "vite-plus/test";
import { renderApp } from "../../../../test/setup";

afterEach(() => vi.unstubAllGlobals());

const click = (element: Element | null): void => {
  act(() => {
    element?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
};

it("toggles the mobile navigation with synchronized ARIA state", () => {
  const host = renderApp();
  const button = host.querySelector<HTMLButtonElement>(
    "button[aria-controls]",
  )!;
  const nav = host.querySelector('nav[aria-label="Primary navigation"]')!;
  expect(button.type).toBe("button");
  expect(button.getAttribute("aria-label")).toBe("Toggle navigation menu");
  expect(button.getAttribute("aria-controls")).toBe(nav.id);
  expect(button.getAttribute("aria-expanded")).toBe("false");
  expect(nav.getAttribute("data-open")).toBe("false");
  expect(button.querySelector('span[aria-hidden="true"]')).not.toBeNull();

  click(button);
  expect(button.getAttribute("aria-expanded")).toBe("true");
  expect(nav.getAttribute("data-open")).toBe("true");
  click(button);
  expect(button.getAttribute("aria-expanded")).toBe("false");
  expect(nav.getAttribute("data-open")).toBe("false");
});

it("orders theme controls with the mobile and desktop navigation", () => {
  const host = renderApp();
  const header = host.querySelector("header")!;
  const button = header.querySelector<HTMLButtonElement>(
    "button[aria-controls]",
  )!;
  const nav = header.querySelector("nav")!;
  const mobileSelector = header.querySelector<HTMLSelectElement>(
    "#mobile-theme-preference",
  )!;
  const desktopSelector =
    header.querySelector<HTMLSelectElement>("#theme-preference")!;

  expect(button.nextElementSibling).toBe(mobileSelector.closest("span"));
  expect(mobileSelector.closest("span")?.nextElementSibling).toBe(nav);
  expect(nav.nextElementSibling).toBe(desktopSelector.closest("span"));
  expect(desktopSelector.closest("span")?.nextElementSibling).toBeNull();

  click(button);
  expect(button.getAttribute("aria-expanded")).toBe("true");
  expect(
    Array.from(header.querySelectorAll("a, button, select"), (element) =>
      element.matches("a") ? element.getAttribute("href") : element.tagName,
    ),
  ).toEqual([
    "/",
    "BUTTON",
    "SELECT",
    "/",
    "/about",
    "/projects",
    "/contact",
    "SELECT",
  ]);
});

it("keeps the mobile and desktop theme controls synchronized", () => {
  const host = renderApp();
  const mobile = host.querySelector<HTMLSelectElement>(
    "#mobile-theme-preference",
  )!;
  const desktop = host.querySelector<HTMLSelectElement>("#theme-preference")!;

  act(() => {
    mobile.value = "dark";
    mobile.dispatchEvent(new Event("change", { bubbles: true }));
  });
  expect(desktop.value).toBe("dark");

  act(() => {
    desktop.value = "light";
    desktop.dispatchEvent(new Event("change", { bubbles: true }));
  });
  expect(mobile.value).toBe("light");
});

it("keeps theme keyboard focus across the mobile breakpoint", () => {
  let matches = false;
  const listeners = new Set<(event: MediaQueryListEvent) => void>();
  vi.stubGlobal("matchMedia", () => ({
    get matches() {
      return matches;
    },
    addEventListener: (
      _type: string,
      listener: (event: MediaQueryListEvent) => void,
    ) => {
      listeners.add(listener);
    },
    removeEventListener: (
      _type: string,
      listener: (event: MediaQueryListEvent) => void,
    ) => {
      listeners.delete(listener);
    },
  }));
  const host = renderApp();
  const mobile = host.querySelector<HTMLSelectElement>(
    "#mobile-theme-preference",
  )!;
  const desktop = host.querySelector<HTMLSelectElement>("#theme-preference")!;
  const resize = (mobileViewport: boolean) => {
    matches = mobileViewport;
    act(() => {
      listeners.forEach((listener) =>
        listener({ matches } as MediaQueryListEvent),
      );
    });
  };

  desktop.focus();
  resize(true);
  expect(document.activeElement).toBe(mobile);
  resize(false);
  expect(document.activeElement).toBe(desktop);

  // Some browsers blur the hidden control before dispatching the media change.
  matches = true;
  act(() => desktop.blur());
  expect(document.activeElement).toBe(mobile);
  resize(false);
  expect(document.activeElement).toBe(desktop);

  desktop.blur();
  resize(true);
  expect(document.activeElement).not.toBe(mobile);
});

it("closes on navigation links and the brand", () => {
  const host = renderApp();
  const button = host.querySelector<HTMLButtonElement>(
    "button[aria-controls]",
  )!;
  const nav = host.querySelector("nav")!;

  click(button);
  click(nav.querySelector('a[href="/about"]'));
  expect(button.getAttribute("aria-expanded")).toBe("false");
  expect(
    nav.querySelector('a[href="/about"]')?.getAttribute("aria-current"),
  ).toBe("page");

  click(button);
  click(host.querySelector('a[href="/"]'));
  expect(button.getAttribute("aria-expanded")).toBe("false");

  click(button);
  click(nav.querySelector('a[href="/"]'));
  expect(button.getAttribute("aria-expanded")).toBe("false");
  expect(nav.getAttribute("data-open")).toBe("false");
});

it("keeps the desktop links and theme selector available", () => {
  const host = renderApp();
  const nav = host.querySelector("nav")!;
  expect(nav.querySelectorAll("a")).toHaveLength(4);
  expect(host.querySelector("select#theme-preference")).not.toBeNull();
});
