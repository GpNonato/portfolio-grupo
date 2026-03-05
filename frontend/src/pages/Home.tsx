import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import SectionTitle from "../components/UI/SectionTitle";
import Tag from "../components/UI/Tag";
import ExperienceCard from "../components/UI/ExperienceCard";
import ProjectCard from "../components/UI/ProjectCard";

import { profile } from "../data/profile";
import { experience } from "../data/experience";
import { projects } from "../data/projects";
import { skillGroups } from "../data/skills";
import { useI18n } from "../i18n/I18nProvider";
import TerminalText from "../components/UI/TerminalText";
function scrollToHash(hash: string) {
  if (!hash) return;
  const id = hash.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const location = useLocation();
  const { t, ta } = useI18n();

  useEffect(() => {
    const t = window.setTimeout(() => scrollToHash(location.hash), 0);
    return () => window.clearTimeout(t);
  }, [location.hash]);

  return (
    <div>
      {/* HERO */}
      <section id="inicio" className="section">
        <div className="hero">
          <div className="hero-left">
            <SectionTitle title={profile.name} subtitle={t("profile.role")} />
            <p className="muted">{t("profile.headline")}</p>
            <div className="actions">
              <a className="btn btn-primary" href="#projetos">{t("home.actionsProjects")}</a>
              <a className="btn btn-ghost" href="#contato">{t("home.actionsContact")}</a>
            </div>
          </div>

          <div className="hero-right" aria-hidden="true">
            <div className="avatar" />
          </div>
        </div>

        <div className="card" style={{ marginTop: 18 }}>
          <h2 style={{ marginTop: 0 }}>{t("home.summaryTitle")}</h2>
          <ul className="checklist">
            {ta("home.summary").map((line) => (
              <li key={line} className="check-item">
                <span className="check" aria-hidden="true">✓</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="section">
        <SectionTitle title={t("profile.aboutTitle")} subtitle={t("profile.aboutSubtitle")} />

        <div className="grid">
          <div className="card terminal-card">
            <h3 style={{ marginTop: 0 }}>{t("profile.whoTitle")}</h3>
            <TerminalText lines={ta("profile.about")} />
          </div>
        </div>

        <div className="card" style={{ marginTop: 14 }}>
          <h3 style={{ marginTop: 0 }}>{t("profile.doTitle")}</h3>
          <div className="grid-2" style={{ marginTop: 10 }}>
            <div>
              <strong>{t("profile.webTitle")}</strong>
              <p className="muted">{t("profile.webDesc")}</p>
            </div>
            <div>
              <strong>{t("profile.apiTitle")}</strong>
              <p className="muted">{t("profile.apiDesc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIÊNCIAS */}
      <section id="experiencias" className="section">
        <SectionTitle title={t("home.experienceTitle")} subtitle={t("home.experienceSubtitle")} />
        <div className="stack">
          {experience.map((e) => (
            <ExperienceCard key={`${e.company}-${e.role}`} item={e} />
          ))}
        </div>
      </section>

      {/* PROJETOS */}
      <section id="projetos" className="section">
        <SectionTitle title={t("home.projectsTitle")} subtitle={t("home.projectsSubtitle")} />

        <div className="timeline">
          {projects.map((p, idx) => (
            <div className="timeline-item" key={p.slug}>
              <div className="timeline-dot" aria-hidden="true">{idx + 1}</div>
              <div className="timeline-content">
                <ProjectCard project={p} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COMPETÊNCIAS */}
      <section id="competencias" className="section">
        <SectionTitle title={t("home.skillsTitle")} subtitle={t("home.skillsSubtitle")} />

        <div className="stack">
          {skillGroups.map((group) => (
            <div className="card" key={group.title}>
              <h3 style={{ marginTop: 0 }}>{group.title}</h3>
              <div className="tags">
                {group.items.map((s) => <Tag key={s}>{s}</Tag>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="section">
        <SectionTitle title={t("home.contactTitle")} subtitle={t("home.contactSubtitle")} />

        <div className="grid-contact">
          <div className="card">
            <div>
              <a className="contact-item" href={`mailto:${profile.links.email}`}>
                <span className="contact-icon" aria-hidden="true">✉️</span>
                <div>
                  <div className="contact-label">Email</div>
                  <div className="muted">{profile.links.email}</div>
                </div>
              </a>

              <a className="contact-item" href={profile.links.linkedin} target="_blank" rel="noreferrer">
                <span className="contact-icon" aria-hidden="true">in</span>
                <div>
                  <div className="contact-label">LinkedIn</div>
                  <div className="muted">{t("home.openProfile")}</div>
                </div>
              </a>

              <a className="contact-item" href={profile.links.github} target="_blank" rel="noreferrer">
                <span className="contact-icon" aria-hidden="true">⌂</span>
                <div>
                  <div className="contact-label">GitHub</div>
                  <div className="muted">{t("home.viewRepos")}</div>
                </div>
              </a>
            </div>
          </div>

          <div className="card">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactForm() {
  const { t } = useI18n();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    const subject = encodeURIComponent(`${t("home.mailSubject")} — ${name || t("home.mailNoName")}`);
    const body = encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`);

    window.location.href = `mailto:${profile.links.email}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={onSubmit} className="form">
      <h3 style={{ marginTop: 0 }}>{t("home.formTitle")}</h3>

      <label className="field">
        <span>{t("home.formName")}</span>
        <input name="name" type="text" placeholder={t("home.formNamePh")} required />
      </label>

      <label className="field">
        <span>{t("home.formEmail")}</span>
        <input name="email" type="email" placeholder={t("home.formEmailPh")} required />
      </label>

      <label className="field">
        <span>{t("home.formMessage")}</span>
        <textarea name="message" placeholder={t("home.formMessagePh")} rows={5} required />
      </label>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
        <button className="btn btn-primary" type="submit">{t("home.formSend")}</button>
      </div>
    </form>
  );
}