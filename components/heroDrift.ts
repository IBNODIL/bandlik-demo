"use client";

import { useScroll, useTransform } from "motion/react";

/**
 * Scroll motion of the Framer heroes (measured on the live site): the hero frame scrolls away normally while
 * everything inside it barely moves — the text rises at 0.2× the scroll speed and the photo at 0.3× — so the
 * hero's bottom edge (or the next section) slides up over an almost still picture and cuts through the title.
 *
 * `content` is applied to a wrapper around the whole hero inside (photo, overlays, text); `image` is the photo's
 * extra drift on top of that. Heroes sit at the top of the page, so the page scroll position is the input.
 */
export function useHeroDrift() {
  const { scrollY } = useScroll();
  const content = useTransform(scrollY, (v) => Math.max(0, v) * 0.8);
  const image = useTransform(scrollY, (v) => Math.max(0, v) * -0.1);
  return { content, image };
}
