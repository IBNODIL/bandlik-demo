"use client";

import { useEffect, useState } from "react";
import UnicornScene from "unicornstudio-react/next";

const PROJECT_ID = process.env.NEXT_PUBLIC_UNICORN_PROJECT_ID ?? "lHlDvoJDIXCxxXVqTNOC";

// The scene was published with SDK 1.2.4; load that exact build (note the capital S in the file name).
const SDK_URL = "https://cdn.unicorn.studio/v1.2.4/unicornStudio.umd.js";

function useMediaQuery(query: string) {
  // starts false so server and client render the same HTML
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);
  return matches;
}

/**
 * Unicorn Studio fog over a hero image. Like the original, desktop (>=1440px) only.
 * `className` sets its strength (the home hero uses 70%, the inner-page heroes 30% like Framer).
 */
export default function HeroFog({ className = "opacity-70" }: { className?: string }) {
  const isDesktop = useMediaQuery("(min-width: 1440px)");
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const [el, setEl] = useState<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(true);

  // Pause the WebGL loop whenever the hero is scrolled out of view.
  useEffect(() => {
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [el]);

  if (!isDesktop || reduceMotion) return null;

  return (
    <div ref={setEl} aria-hidden="true" className={`pointer-events-none absolute inset-0 mix-blend-screen ${className}`}>
      <UnicornScene
        projectId={PROJECT_ID}
        sdkUrl={SDK_URL}
        width="100%"
        height="100%"
        // the smoke is soft, so a half-resolution 30fps render is visually the same and ~8x cheaper
        scale={0.5}
        dpi={1}
        fps={30}
        paused={!visible}
      />
    </div>
  );
}
