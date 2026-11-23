import { act, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router";
import { afterEach } from "vite-plus/test";
import { App } from "../App";
import { ThemeProvider } from "../features/theme/ThemeContext";
import { STORAGE_KEY, THEME_COLORS } from "../features/theme/theme-core";

(
  globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

const cleanup: Array<() => void> = [];

export function mount(ui: ReactNode, tag = "div"): HTMLElement {
  const host = document.createElement(tag);
  document.body.appendChild(host);
  const root = createRoot(host);
  cleanup.push(() => {
    act(() => root.unmount());
    host.remove();
  });
  act(() => root.render(ui));
  return host;
}

export function renderApp(path = "/"): HTMLElement {
  return mount(
    <ThemeProvider>
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    </ThemeProvider>,
  );
}

afterEach(() => {
  while (cleanup.length) {
    cleanup.pop()?.();
  }
  localStorage.removeItem(STORAGE_KEY);
  document.documentElement.removeAttribute("data-theme");
  document.documentElement.style.colorScheme = "";
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", THEME_COLORS.dark);
});
