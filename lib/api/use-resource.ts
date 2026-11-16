"use client";

import { useCallback, useEffect, useState } from "react";

export type Resource<T> =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; data: T };

/** Loads a list once and exposes loading / error / ready, with a way to try again. */
export function useResource<T>(load: () => Promise<T>): Resource<T> & { reload: () => void } {
  const [state, setState] = useState<Resource<T>>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    load().then(
      (data) => !cancelled && setState({ status: "ready", data }),
      () => !cancelled && setState({ status: "error" }),
    );
    return () => {
      cancelled = true;
    };
  }, [load, attempt]);

  const reload = useCallback(() => {
    setState({ status: "loading" });
    setAttempt((a) => a + 1);
  }, []);

  return { ...state, reload };
}
