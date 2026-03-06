import { useEffect, useMemo, useRef, useState } from "react";
import { profile } from "../data/profile";
import styles from "../styles/About.module.css";

type Line = { text: string; speed?: number; pauseAfter?: number };

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

export default function About() {
  const script: Line[] = useMemo(() => {
    const about = profile.about;

    return [
      { text: "C:\\Users\\visitor> whoami", speed: 14, pauseAfter: 180 },
      { text: about.promptName, speed: 10, pauseAfter: 220 },
      { text: "", pauseAfter: 120 },
      { text: `C:\\Users\\visitor> type ${about.fileName}`, speed: 14, pauseAfter: 240 },

      ...about.lines.map((line) => ({
        text: line,
        speed: 11,
        pauseAfter: 120,
      })),

      { text: "", pauseAfter: 120 },
      { text: "C:\\Users\\visitor> _", speed: 18, pauseAfter: 0 },
    ];
  }, []);

  const [typed, setTyped] = useState("");
  const cancelled = useRef(false);
  const running = useRef(false);

  const skip = () => {
    cancelled.current = true;
    setTyped(script.map((l) => l.text).join("\n") + "\n");
    running.current = false;
  };

  const runTyping = async () => {
    if (running.current) return;

    running.current = true;
    cancelled.current = false;
    setTyped("");

    let out = "";

    for (const line of script) {
      if (cancelled.current) break;

      if (!line.text) {
        out += "\n";
        setTyped(out);
        await sleep(line.pauseAfter ?? 0);
        continue;
      }

      for (let i = 0; i < line.text.length; i++) {
        if (cancelled.current) break;
        out += line.text[i];
        setTyped(out);
        await sleep(line.speed ?? 12);
      }

      out += "\n";
      setTyped(out);
      await sleep(line.pauseAfter ?? 0);
    }

    running.current = false;
  };

  useEffect(() => {
    runTyping();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === "Escape" || e.key === " ") skip();
    };

    const onClick = () => skip();

    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);

    return () => {
      cancelled.current = true;
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div className="stack">
      <div className="section-title">
        <h1>{profile.about.title}</h1>
      </div>

      <div className={styles.aboutTerminal}>
        <div className={styles.aboutTerminalTop}>
          <span className={styles.aboutDot} />
          <span className={styles.aboutTerminalTitle}>{profile.about.terminalTitle}</span>
          <span className={styles.aboutTerminalHint}>{profile.about.hint}</span>
        </div>

        <pre className={styles.aboutTerminalBody}>
          {typed}
          <span className={styles.aboutCursor} />
        </pre>
      </div>
    </div>
  );
}