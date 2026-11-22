import { NavLink } from "react-router";
import { navigation } from "../../content/navigation";
import { paths } from "../../../../routes";

export const SiteHeader = () => {
  return (
    <header>
      <nav aria-label="Primary navigation">
        {navigation.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === paths.home}
            className={({ isActive }) =>
              isActive ? "site-nav__link active" : "site-nav__link"
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};
