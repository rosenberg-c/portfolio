import { act } from "react";
import { expect, it } from "vite-plus/test";
import { renderApp } from "../../../../test/setup";

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
