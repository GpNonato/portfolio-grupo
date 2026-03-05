import { useEffect, useState } from "react";

export default function useReachedBottom() {
  const [reached, setReached] = useState(false);

  useEffect(() => {
    function onScroll() {
      const bottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 40;

      setReached(bottom);
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return reached;
}