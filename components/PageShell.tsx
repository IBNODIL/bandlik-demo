"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import CTA from "./CTA";
import Cursor from "./Cursor";
import Footer from "./Footer";
import LangSuggest from "./LangSuggest";
import Loader from "./Loader";
import Nav from "./Nav";
import SmoothScroll from "./SmoothScroll";

// The loader intro plays once per page load; moving between pages client-side skips it.
let introPlayed = false;

const Ready = createContext(true);
/** True once the intro loader has opened (pages start their entrance animations then). */
export const useReady = () => useContext(Ready);

/** Everything every page shares: smooth scrolling, the intro loader, header, closing call-to-action and footer. */
export default function PageShell({ children }: { children: ReactNode }) {
  const [skipIntro] = useState(() => introPlayed);
  const [ready, setReady] = useState(skipIntro);
  const done = useCallback(() => {
    introPlayed = true;
    setReady(true);
  }, []);

  // a client-side page change starts at the top
  useEffect(() => {
    if (skipIntro) window.scrollTo(0, 0);
  }, [skipIntro]);

  return (
    <Ready.Provider value={ready}>
      <SmoothScroll locked={!ready} />
      <Cursor />
      {!skipIntro && <Loader onOpen={done} />}
      <Nav ready={ready} />
      <main>{children}</main>
      <CTA />
      <Footer />
      <LangSuggest ready={ready} />
    </Ready.Provider>
  );
}
