import type { ExperienceItem } from "../../types/portfolio";
import styles from "../../styles/ExperienceCard.module.css";

type Props = {
  item: ExperienceItem;
  index?: number;
};

const iconColors = ["#1f6feb", "#2ea043", "#d29922", "#a371f7"];

export default function ExperienceCard({ item, index = 0 }: Props) {
  const color = iconColors[index % iconColors.length];

  const company = item?.company ?? "—";
  const role = item?.role ?? "—";
  const period = item?.period;
  const badge = item?.badge;

  const bullets: string[] = Array.isArray(item?.bullets) ? item.bullets : [];

  return (
    <div className={styles.expCard}>
      <div className={styles.expCardHeader}>
        <div
          className={styles.expCardIcon}
          style={{ background: `${color}20`, color }}
        >
          {company.charAt(0) || "?"}
        </div>

        <div className={styles.expCardHeadInfo}>
          <div className={styles.expCardCompany}>{company}</div>
          <div className={styles.expCardRole}>{role}</div>

          <div className={styles.expCardMeta}>
            {period && <div className={styles.expCardPeriod}>{period}</div>}
            {badge && <div className={styles.expCardBadge}>{badge}</div>}
          </div>
        </div>
      </div>

      <div className={styles.expCardDivider} />

      <ul className={styles.expCardHighlights}>
        {bullets.length > 0 ? (
          bullets.map((bullet, i) => <li key={i}>{bullet}</li>)
        ) : (
          <li style={{ opacity: 0.7 }}>Sem detalhes adicionais.</li>
        )}
      </ul>
    </div>
  );
}