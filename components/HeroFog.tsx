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

/** Unicorn Studio fog over the hero image. Like the original, desktop (>=1440px) only. */
export default function HeroFog() {
  const isDesktop = useMediaQuery("(min-width: 1440px)");
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  if (!isDesktop || reduceMotion) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-70 mix-blend-screen">
      <UnicornScene
        projectId={PROJECT_ID}
        sdkUrl={SDK_URL}
        width="100%"
        height="100%"
        scale={1}
        dpi={1}
        fps={60}
      />
    </div>
  );
}
