import { Link } from "react-router-dom";
import Tag from "./Tag";
import type { Project } from "../../types/portfolio";
import { useI18n } from "../../i18n/I18nProvider";

type Props = {
  project: Project;
};

export default function ProjectCard({ project }: Props) {
  const { t } = useI18n();
  const name = t(`projects.items.${project.slug}.name`);
  const description = t(`projects.items.${project.slug}.description`);

  return (
    <article className="card project-card">
      <div className="project-thumb" aria-hidden="true" />

      <div className="project-body">
        <h3 className="card-title">{name}</h3>
        <p className="muted">{description}</p>

        <div className="tag-row">
          {project.title && <Tag>{project.title}</Tag>}
        </div>

        <div className="actions">
          <Link className="btn btn-primary" to={`/projetos/${project.slug}`}>
            {t("projects.details")}
          </Link>
          {project.links.repo ? (
            <a className="btn btn-ghost" href={project.links.repo} target="_blank" rel="noreferrer">
              {t("projects.github")}
            </a>
          ) : null}
          {project.links.live ? (
            <a className="btn btn-ghost" href={project.links.live} target="_blank" rel="noreferrer">
              {t("projects.live")}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
