import { Link } from "react-router";
import { paths } from "../../routes";
import { contactContent } from "./Contact.content";
import styles from "./Contact.module.css";

export const Contact = () => {
  return (
    <section className={styles.page} aria-labelledby="contact-title">
      <div className={styles.intro}>
        <h1 id="contact-title">{contactContent.title}</h1>
        <p className={styles.invitation}>{contactContent.invitation}</p>
        <p className={styles.notice}>{contactContent.notice}</p>
        <Link to={paths.projects} className={styles.action}>
          {contactContent.projectsCta}
        </Link>
      </div>
      <section
        className={styles.channels}
        aria-labelledby="contact-channels-title"
      >
        <h2 id="contact-channels-title">{contactContent.channelsHeading}</h2>
        <dl>
          {contactContent.channels.map(({ label, detail }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{detail}</dd>
            </div>
          ))}
        </dl>
      </section>
    </section>
  );
};
