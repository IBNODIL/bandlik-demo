import type { Locale } from "@/lib/i18n";

/** Round flag of the country most tied to each language (drawn inline: emoji flags do not render on Windows). */
export default function Flag({ lang, className = "size-5" }: { lang: Locale; className?: string }) {
  return (
    <svg
      viewBox="0 0 36 24"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      className={`${className} shrink-0 rounded-full ring-1 ring-ink/10`}
    >
      {lang === "uz" && (
        <>
          <rect width="36" height="8" fill="#1eb4e8" />
          <rect y="8" width="36" height="8" fill="#fff" />
          <rect y="16" width="36" height="8" fill="#1eb53a" />
          <rect y="7.4" width="36" height="1.2" fill="#ce1126" />
          <rect y="15.4" width="36" height="1.2" fill="#ce1126" />
          <circle cx="6" cy="4" r="2.6" fill="#fff" />
          <circle cx="7" cy="4" r="2.3" fill="#1eb4e8" />
          <g fill="#fff">
            <circle cx="10.5" cy="2.2" r=".55" />
            <circle cx="12.5" cy="2.2" r=".55" />
            <circle cx="12.5" cy="4" r=".55" />
            <circle cx="10.5" cy="4" r=".55" />
          </g>
        </>
      )}
      {lang === "en" && (
        <>
          <rect width="36" height="24" fill="#012169" />
          <path d="M0 0l36 24M36 0L0 24" stroke="#fff" strokeWidth="4" />
          <path d="M0 0l36 24M36 0L0 24" stroke="#c8102e" strokeWidth="1.6" />
          <path d="M18 0v24M0 12h36" stroke="#fff" strokeWidth="7" />
          <path d="M18 0v24M0 12h36" stroke="#c8102e" strokeWidth="4" />
        </>
      )}
      {lang === "ru" && (
        <>
          <rect width="36" height="8" fill="#fff" />
          <rect y="8" width="36" height="8" fill="#0039a6" />
          <rect y="16" width="36" height="8" fill="#d52b1e" />
        </>
      )}
      {lang === "de" && (
        <>
          <rect width="36" height="8" fill="#000" />
          <rect y="8" width="36" height="8" fill="#dd0000" />
          <rect y="16" width="36" height="8" fill="#ffce00" />
        </>
      )}
      {lang === "tr" && (
        <>
          <rect width="36" height="24" fill="#e30a17" />
          <circle cx="14" cy="12" r="6" fill="#fff" />
          <circle cx="15.6" cy="12" r="4.8" fill="#e30a17" />
          <path d="M21.5 12l4.2-1.4-2.6 3.6v-4.4l2.6 3.6z" fill="#fff" />
        </>
      )}
    </svg>
  );
}
