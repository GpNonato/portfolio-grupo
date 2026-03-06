import { useEffect, useState } from "react";
import About from "./About";
import Experience from "./Experience";
import Education from "./Education";
import Projects from "./Projects";
import Skills from "./Skills";
import Contact from "./Contact";

import { profile } from "../data/profile";
import { useI18n } from "../i18n/I18nProvider";
import styles from "../styles/Home.module.css";

type HomeProps = {
  introFinished: boolean;
};

export default function Home({ introFinished }: HomeProps) {
  const { t } = useI18n();
  const [imageReady, setImageReady] = useState(false);

  useEffect(() => {
    if (!introFinished) {
      setImageReady(false);
      return;
    }

    const timer = setTimeout(() => setImageReady(true), 1800);
    return () => clearTimeout(timer);
  }, [introFinished]);

  return (
    <div className="app-shell">
      <main className="page">
<section id="inicio" className={`section ${styles.heroSection}`}>
  <div className="container">
    <div className={`card ${styles.heroCard}`}>
      <div className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.heroEyebrow}>
            {profile.hero.eyebrow}
          </div>

          <div className={styles.heroTitle}>
            <h1>{profile.name}</h1>
          </div>

          <p className={styles.heroRole}>{profile.role}</p>

          <p className={styles.heroDescription}>
            {profile.hero.description}
          </p>

          <div className={styles.heroActions}>
            <a className="btn btn-primary" href="#projetos">
              {profile.hero.ctaProjects}
            </a>

            <a className="btn btn-ghost" href="#contato">
              {profile.hero.ctaContact}
            </a>
          </div>

          <div className={styles.heroMeta}>
            {profile.hero.stats.map((item) => (
              <span key={item} className={styles.heroMetaItem}>
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.heroRight}>
          <div className={styles.heroImageFrame}>
            <img
              src={profile.heroImage}
              alt={profile.name}
              className={styles.heroImage}
            />

            {introFinished && !imageReady && (
              <div className={styles.heroScanner}>
                <div className={styles.heroScannerBar} />
                <div className={styles.heroScannerLabel}>
                  {profile.hero.scanner}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <hr className="divider" />

      <div className={styles.heroBottom}>
        {profile.hero.cards.map((card) => (
          <div key={card.title} className={styles.heroMiniCard}>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

        <section id="sobre" className="section">
          <div className="container">
            <About />
          </div>
        </section>

        <section id="experiencias" className="section">
          <div className="container">
            <Experience />
          </div>
        </section>

        <section id="educacao" className="section">
          <div className="container">
            <Education />
          </div>
        </section>

        <section id="projetos" className="section">
          <div className="container">
            <Projects />
          </div>
        </section>

        <section id="competencias" className="section">
          <div className="container">
            <Skills />
          </div>
        </section>

        <section id="contato" className="section">
          <div className="container">
            <Contact />
          </div>
        </section>
      </main>
    </div>
  );
}