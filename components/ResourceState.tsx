"use client";

import { useI18n } from "./I18nProvider";

/** Loading, empty and error messages shown instead of a list. */
export default function ResourceState({ state, onRetry }: { state: "loading" | "empty" | "error"; onRetry: () => void }) {
  const { dict } = useI18n();
  const text = { loading: dict.common.loading, empty: dict.common.empty, error: dict.common.error }[state];
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center gap-4 px-[38px] text-center" role={state === "error" ? "alert" : "status"}>
      {state === "loading" && <span className="size-6 animate-spin rounded-full border-2 border-ink/10 border-t-blue" />}
      <p className="text-[16px] text-soft">{text}</p>
      {state === "error" && (
        <button onClick={onRetry} className="h-10 rounded-full bg-card px-5 text-[14px] font-semibold text-ink transition-colors hover:text-blue">
          {dict.common.retry}
        </button>
      )}
    </div>
  );
}
