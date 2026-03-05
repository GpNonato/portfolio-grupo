import { useEffect, useState } from "react";

interface Props {
  lines: string[];
  speed?: number;
}

export default function TerminalText({ lines, speed = 25 }: Props) {
  const [displayed, setDisplayed] = useState<string[]>(
    lines.map(() => "")
  );

  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    if (currentLine >= lines.length) return;

    const timeout = setTimeout(() => {
      setDisplayed((prev) => {
        const copy = [...prev];
        copy[currentLine] = lines[currentLine].slice(0, currentChar + 1);
        return copy;
      });

      if (currentChar + 1 < lines[currentLine].length) {
        setCurrentChar(currentChar + 1);
      } else {
        setCurrentLine(currentLine + 1);
        setCurrentChar(0);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [currentChar, currentLine, lines, speed]);

  return (
    <div className="terminal">
      {lines.map((_, i) => (
        <p key={i} className="terminal-line">
          {displayed[i]}
          {i === currentLine && <span className="cursor">|</span>}
        </p>
      ))}
    </div>
  );
}