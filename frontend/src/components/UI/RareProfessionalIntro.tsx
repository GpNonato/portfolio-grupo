import { useEffect, useMemo, useRef, useState } from "react";
import "../../styles/RareProfessionalIntro.css";

type Props = {
  onFinish: () => void;
};

type Phase = "scan" | "scanDone" | "dramaticFade" | "prompt" | "fadeOut" | "loading";

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

function escapeHtml(str: string) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export default function RareProfessionalIntro({ onFinish }: Props) {
  const [phase, setPhase] = useState<Phase>("scan");
  const [scanProgress, setScanProgress] = useState(0);
  const [typed, setTyped] = useState("");
  const [isExiting, setIsExiting] = useState(false);

  const cancelled = useRef(false);
  const finished = useRef(false);

  const promptLines = useMemo(
    () => [
      "Profissional Raro encontrado:",
      "Nome: Felipe Parreiras",
      "Tipo: Desenvolvedor Full Stack",
      "Nível: Júnior",
      "Raridade: Profissional único!",
    ],
    []
  );

  const finish = () => {
    if (finished.current) return;
    finished.current = true;

    setIsExiting(true);

    // tempo da animação de "janela abrindo"
    window.setTimeout(() => {
      onFinish();
    }, 900);
  };

  // Pular (Enter/Esc/Espaço ou clique)
  useEffect(() => {
    const skip = () => {
      if (finished.current) return;
      cancelled.current = true;

      // deixa um mini "fadeOut" antes de acionar a saída
      setPhase("fadeOut");
      window.setTimeout(() => finish(), 220);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === "Escape" || e.key === " ") skip();
    };
    const onClick = () => skip();

    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  // Orquestração das fases
  useEffect(() => {
    cancelled.current = false;

    async function run() {
      // 1) SCAN
      setPhase("scan");
      setScanProgress(0);
      setTyped("");

      const scanStart = Date.now();
      const scanDuration = 1600;

      while (!cancelled.current) {
        const elapsed = Date.now() - scanStart;
        const p = Math.min(100, (elapsed / scanDuration) * 100);
        setScanProgress(p);
        if (p >= 100) break;
        await sleep(16);
      }
      if (cancelled.current) return;

      // 2) SCAN DONE (pisca)
      setPhase("scanDone");
      await sleep(1100);
      if (cancelled.current) return;

      // 3) dramatic fade (mas mantendo o card renderizado)
      setPhase("dramaticFade");
      await sleep(520);
      if (cancelled.current) return;

      // 4) PROMPT
      setPhase("prompt");
      await typePrompt(promptLines, setTyped, cancelled);
      if (cancelled.current) return;

      // 5) prompt fade out
      setPhase("fadeOut");
      await sleep(520);
      if (cancelled.current) return;

      // 6) loading...
      setPhase("loading");
      await sleep(650);
      if (cancelled.current) return;

      finish();
    }

    run();

    return () => {
      cancelled.current = true;
    };
  }, [promptLines]);

  return (
    <div
      className={`rpOverlay rpPhase-${phase} ${isExiting ? "rpExit" : ""}`}
      role="dialog"
      aria-label="Intro do portfólio"
    >
      {/* SCAN (inclui dramaticFade para não ficar tela vazia) */}
      {(phase === "scan" || phase === "scanDone" || phase === "dramaticFade") && (
        <div className="rpCard">
          <div className="rpTitle">escaneando profissional</div>

          <div className="rpScanBar" aria-label="barra de escaneamento">
            <div className="rpScanFill" style={{ width: `${scanProgress}%` }} />
            <div className="rpScanShine" />
          </div>

          <div className="rpHint">clique ou pressione ENTER para pular</div>

          {phase === "scanDone" && <div className="rpDoneBlink">escaneamento concluido!</div>}
          {phase === "dramaticFade" && <div className="rpDoneBlink">iniciando análise...</div>}
        </div>
      )}

      {/* PROMPT */}
      {(phase === "prompt" || phase === "fadeOut" || phase === "loading") && (
        <div className="rpTerminalWrap">
          <div className="rpTerminalTop">
            <span className="rpDot red" />
            <span className="rpDot yellow" />
            <span className="rpDot green" />
            <span className="rpTerminalTitle">C:\\Users\\visitor</span>
          </div>

          <pre
            className={`rpTerminalBody ${phase === "fadeOut" ? "rpFadeOut" : ""}`}
            dangerouslySetInnerHTML={{
              __html: escapeHtml(typed) + (phase === "prompt" ? `<span class="rpCursor"></span>` : ""),
            }}
          />

          {phase === "loading" && <div className="rpLoading">carregando...</div>}
        </div>
      )}
    </div>
  );
}

async function typePrompt(
  lines: string[],
  setTyped: (v: string) => void,
  cancelled: React.MutableRefObject<boolean>
) {
  let out = "";
  const prefix = "C:\\> ";

  for (let i = 0; i < lines.length; i++) {
    if (cancelled.current) return;

    if (i === 0) {
      const head = prefix + lines[i];
      for (let c = 0; c < head.length; c++) {
        if (cancelled.current) return;
        out += head[c];
        setTyped(out);
        await sleep(14);
      }
      out += "\n";
      setTyped(out);
      await sleep(240);
      continue;
    }

    const line = lines[i];
    for (let c = 0; c < line.length; c++) {
      if (cancelled.current) return;
      out += line[c];
      setTyped(out);
      await sleep(12);
    }
    out += "\n";
    setTyped(out);
    await sleep(180);
  }
}