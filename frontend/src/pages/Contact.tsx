import { useMemo, useState } from "react";
import SectionTitle from "../components/UI/SectionTitle";
import { profile } from "../data/profile";
import { useI18n } from "../i18n/I18nProvider";
import styles from "../styles/Contact.module.css";

type FormState = {
  name: string;
  email: string;
  message: string;
};

function buildMailto(params: {
  to: string;
  subject: string;
  body: string;
}) {
  const subject = encodeURIComponent(params.subject);
  const body = encodeURIComponent(params.body);
  return `mailto:${params.to}?subject=${subject}&body=${body}`;
}

export default function Contact() {
  const { t } = useI18n();

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });

  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (value: string, key: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);

      setTimeout(() => {
        setCopied(null);
      }, 2000);
    } catch {
      console.error("Clipboard failed");
    }
  };

  const mailtoForm = useMemo(() => {
    const subject = t("contact.subject");
    const body =
      `Nome: ${form.name}\n` +
      `Email: ${form.email}\n\n` +
      `Mensagem:\n${form.message}`;

    return buildMailto({
      to: profile.links.email,
      subject,
      body,
    });
  }, [form, t]);

  return (
    <div className="page">
      <SectionTitle title={t("contact.title")} subtitle={t("contact.subtitle")} />

      <div className={styles.contactGrid}>
        {/* CONTACT CHANNELS */}
        <div className={styles.channelPanel}>
          <div className={styles.panelTop}>
            <div className={styles.panelTitle}>
              <span className={styles.panelLed} aria-hidden="true" />
              COMMUNICATION CHANNELS
            </div>
            <div className={styles.panelMeta}>3 links</div>
          </div>

          <div className={styles.panelBody}>
            {/* EMAIL */}
            <button
              className={styles.channelItem}
              onClick={() => copy(profile.links.email, "email")}
            >
              <div className={styles.channelIcon}>✉</div>

              <div className={styles.channelContent}>
                <div className={styles.channelLabel}>
                  {t("contact.labels.email")}
                </div>

                <div className={styles.channelValue}>
                  {copied === "email"
                    ? "COPIED ✓"
                    : profile.links.email}
                </div>
              </div>
            </button>

            {/* LINKEDIN */}
            <button
              className={styles.channelItem}
              onClick={() => copy(profile.links.linkedin, "linkedin")}
            >
              <div className={styles.channelIcon}>in</div>

              <div className={styles.channelContent}>
                <div className={styles.channelLabel}>
                  {t("contact.labels.linkedin")}
                </div>

                <div className={styles.channelValue}>
                  {copied === "linkedin"
                    ? "COPIED ✓"
                    : profile.links.linkedin}
                </div>
              </div>
            </button>

            {/* GITHUB */}
            <button
              className={styles.channelItem}
              onClick={() => copy(profile.links.github, "github")}
            >
              <div className={styles.channelIcon}>GH</div>

              <div className={styles.channelContent}>
                <div className={styles.channelLabel}>
                  {t("contact.labels.github")}
                </div>

                <div className={styles.channelValue}>
                  {copied === "github"
                    ? "COPIED ✓"
                    : profile.links.github}
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* FORM */}
        <div className={styles.formPanel}>
          <div className={styles.panelTop}>
            <div className={styles.panelTitle}>
              <span className={styles.panelLed} />
              SEND TRANSMISSION
            </div>

            <div className={styles.panelMeta}>secure line</div>
          </div>

          <div className={styles.panelBody}>
            <h2 className={styles.formTitle}>
              {t("contact.sendMessage")}
            </h2>

            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>
                  {t("contact.yourName")}
                </span>

                <input
                  className={styles.fieldInput}
                  value={form.name}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, name: e.target.value }))
                  }
                  placeholder={t("contact.placeholderName")}
                />
              </label>

              <label className={styles.field}>
                <span className={styles.fieldLabel}>
                  {t("contact.yourEmail")}
                </span>

                <input
                  className={styles.fieldInput}
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, email: e.target.value }))
                  }
                  placeholder={t("contact.placeholderEmail")}
                />
              </label>

              <label className={styles.field}>
                <span className={styles.fieldLabel}>
                  {t("contact.yourMessage")}
                </span>

                <textarea
                  className={styles.fieldTextarea}
                  value={form.message}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, message: e.target.value }))
                  }
                  placeholder={t("contact.placeholderMessage")}
                  rows={6}
                />
              </label>

              <div className={styles.formActions}>
                <a className={styles.sendButton} href={mailtoForm}>
                  {t("contact.send")}
                </a>
              </div>

              <p className={styles.note}>
                {t("contact.note")}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}