import { useState } from "react";
import useReachedBottom from "./useReachedBottom";
import FlappyGame from "./FlappyGame";

export default function FlappyWidget() {
  const reachedBottom = useReachedBottom();
  const [open, setOpen] = useState(false);

  if (!reachedBottom) return null;

  return (
    <>
      <div className="flappy-widget" onClick={() => setOpen(true)}>
        🐤
      </div>

      {open && (
        <div className="flappy-overlay">
          <FlappyGame />
        </div>
      )}
    </>
  );
}