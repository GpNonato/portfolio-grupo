import SectionTitle from "../components/UI/SectionTitle";
import { projects } from "../data/projects";
import { useI18n } from "../i18n/I18nProvider";
import styles from "../styles/Projects.module.css";

export default function Projects() {
  const { t } = useI18n();

  return (
    <div className={styles.page}>
      <SectionTitle
        title={t("home.projectsTitle")}
        subtitle={t("home.projectsSubtitle")}
      />

      <div className={styles.projectArchiveGrid}>
        {projects.map((project, index) => (
          <article key={project.slug} className={styles.projectArchiveCard}>
            <div className={styles.projectArchiveThumb}>
              {project.image ? (
                <img src={project.image} alt={project.name} />
              ) : (
                <div className={styles.projectArchiveFallback}>NO PREVIEW</div>
              )}

              <span className={styles.projectArchiveBadge}>
                FILE #{String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <div className={styles.projectArchiveBody}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>

              <div className={styles.projectArchiveTags}>
                {project.stack?.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>

              <div className={styles.projectArchiveActions}>
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.projectArchiveAction}
                  >
                    OPEN REPOSITORY
                  </a>
                )}

                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="projectArchiveAction secondary"
                  >
                    OPEN DEMO
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}