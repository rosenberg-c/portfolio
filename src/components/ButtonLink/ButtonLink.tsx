import type { ReactNode } from "react";
import { Link } from "react-router";
import "./ButtonLink.css";

type ButtonVariant = "primary" | "quiet";

type ButtonLinkProps = {
  to: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

export const ButtonLink = ({
  to,
  children,
  variant = "primary",
  className,
}: ButtonLinkProps) => {
  const classes = ["button-link", `button-link--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <Link className={classes} to={to}>
      {children}
    </Link>
  );
};
