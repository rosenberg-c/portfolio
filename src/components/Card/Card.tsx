import styles from "./Card.module.css";

type CardProps = {
  card: {
    title: string;
    description: string;
    stack: readonly string[];
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

  return (
    <li className={styles.card}>
      <article>
        <div
          className={`${styles.visual} ${styles[visualVariant]}`}
          aria-hidden="true"
        />
        <div className={styles.cardBody}>
          <Heading>{card.title}</Heading>
          <p>{card.description}</p>
          <ul className={styles.stack} aria-label={stackLabel}>
            {card.stack.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        </div>
      </article>
    </li>
  );
};
