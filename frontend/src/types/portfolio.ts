export type ExternalLinks = {
  repo?: string;
  live?: string;
};

export type ProfileLinks = {
  github: string;
  linkedin: string;
  email: string;
};

export type Profile = {
  name: string;
  role: string;
  location: string;
  headline: string;
  about: string[];
  links: ProfileLinks;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  stack: string[];
  links: ExternalLinks;
};

export type ExperienceItem = {
  company: string;
  role: string;
  period?: string;
  badge?: string;
  bullets: string[];
};

export type EducationItem = {
  institution: string;
  course: string;
  period: string;
  details?: string[];
};

export type SkillGroup = {
  /**
   * Identificador estável para i18n.
   * O título exibido deve vir do dicionário (t(...)).
   */
  id: "tech" | "tools" | "soft";
  items: string[];
};
