import { Outlet } from "react-router";
import { SiteHeader } from "./components/SiteHeader/SiteHeader";

export const SiteLayout = () => {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main-content" className="site-main" tabIndex={-1}>
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
