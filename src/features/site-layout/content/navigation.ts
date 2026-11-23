import { paths } from "../../../routes";

export const navigationMenuLabel = "Toggle navigation menu";

export const navigation = [
  { to: paths.home, label: "Home" },
  { to: paths.about, label: "About" },
  { to: paths.projects, label: "Projects" },
  { to: paths.contact, label: "Contact" },
] as const;
