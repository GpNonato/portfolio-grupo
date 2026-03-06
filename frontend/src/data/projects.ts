import type { Project } from "../types/portfolio";

export const projects: Project[] = [

  {
    slug: "troca-puc",

    title: "Troca PUC",

    description:
      "Plataforma desenvolvida para facilitar trocas de materiais e itens entre estudantes da PUC Minas.",

    stack: [
      "React",
      "Node.js",
      "TypeScript",
      "SQL"
    ],

    links: {
      repo: "",
      live: ""
    }
  },

  {
    slug: "painel-evc",

    title: "Painel EVC",

    description:
      "Sistema completo de gestão de vistorias para taxistas com agendamentos, ordens de serviço, controle administrativo e relatórios.",

    stack: [
      "Java",
      "Spring Boot",
      "React",
      "Azure",
      "SQL"
    ],

    links: {
      repo: "",
      live: ""
    }
  },
];