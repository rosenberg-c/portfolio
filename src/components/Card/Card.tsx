import styles from "./Card.module.css";

type CardProps = {
  card: {
    title: string;
    description: string;
    type?: string;
    stack: readonly string[];
    links?: readonly { label: string; url: string }[];
    screenshotUrl?: string;
    fitImage?: boolean;
  };
  stackLabel: string;
  headingLevel?: 2 | 3;
  visualVariant?: "default" | "round" | "organic";
};

export const Card = ({
  card,
  stackLabel,
  headingLevel = 2,
  visualVariant = "default",
}: CardProps) => {
  const Heading = `h${headingLevel}` as const;
  const { screenshotUrl } = card;

  const imageStyle = screenshotUrl
    ? card.fitImage
      ? styles.fitImage
      : ""
    : styles.placeholder;
  return (
    <li className={styles.card}>
      <article>
        <div
          className={`${styles.visual} ${visualVariant === "default" ? "" : styles[visualVariant]} ${imageStyle}`}
          aria-hidden={screenshotUrl ? undefined : true}
        >
          {screenshotUrl && (
            <img src={screenshotUrl} alt={`Screenshot of ${card.title}`} />
          )}
        </div>
        <div className={styles.cardBody}>
          <Heading>{card.title}</Heading>
          <p>{card.description}</p>
          {card.type && <p>{card.type}</p>}
          {card.links && card.links.length > 0 && (
            <div className={styles.links}>
              {card.links.map(({ label, url }) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {label}
                </a>
              ))}
            </div>
          )}
          {card.stack.length > 0 && (
            <ul className={styles.stack} aria-label={stackLabel}>
              {card.stack.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          )}
        </div>
      </article>
    </li>
  );
};
