import { ButtonLink } from "../../components/ButtonLink/ButtonLink";
import { notFoundCopy } from "./NotFound.content";
import { paths } from "../../routes";
import "./NotFound.css";

export const NotFound = () => {
  return (
    <section className="not-found" aria-labelledby="not-found-title">
      <p className="eyebrow">{notFoundCopy.eyebrow}</p>
      <h1 id="not-found-title" className="not-found__title">
        {notFoundCopy.title}
      </h1>
      <p className="not-found__body">{notFoundCopy.body}</p>
      <ButtonLink to={paths.home}>{notFoundCopy.cta}</ButtonLink>
    </section>
  );
};
