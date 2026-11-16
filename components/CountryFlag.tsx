import type { CountryCode } from "@/lib/api/types";

/** Round flag of the vacancy's country (simplified drawings; the Framer card shows it at 30px). */
export default function CountryFlag({ code, size = 34 }: { code: CountryCode; size?: number }) {
  const id = `flag-${code}`;
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" aria-hidden className="shrink-0 rounded-full">
      <defs>
        <clipPath id={id}>
          <circle cx="17" cy="17" r="17" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        {code === "SK" && (
          <>
            <rect width="34" height="12" fill="#fff" />
            <rect y="11" width="34" height="12" fill="#0b4ea2" />
            <rect y="22" width="34" height="12" fill="#ee1c25" />
            <path d="M9 7h9v9c0 4-4 6-4.5 6S9 20 9 16z" fill="#ee1c25" stroke="#fff" strokeWidth="1" />
          </>
        )}
        {code === "DE" && (
          <>
            <rect width="34" height="12" fill="#000" />
            <rect y="11" width="34" height="12" fill="#dd0000" />
            <rect y="22" width="34" height="12" fill="#ffce00" />
          </>
        )}
        {code === "PL" && (
          <>
            <rect width="34" height="17" fill="#fff" />
            <rect y="17" width="34" height="17" fill="#dc143c" />
          </>
        )}
        {code === "CZ" && (
          <>
            <rect width="34" height="17" fill="#fff" />
            <rect y="17" width="34" height="17" fill="#d7141a" />
            <path d="M0 0l20 17L0 34z" fill="#11457e" />
          </>
        )}
        {code === "LT" && (
          <>
            <rect width="34" height="12" fill="#fdb913" />
            <rect y="11" width="34" height="12" fill="#006a44" />
            <rect y="22" width="34" height="12" fill="#c1272d" />
          </>
        )}
        {code === "HU" && (
          <>
            <rect width="34" height="12" fill="#ce2939" />
            <rect y="11" width="34" height="12" fill="#fff" />
            <rect y="22" width="34" height="12" fill="#477050" />
          </>
        )}
      </g>
    </svg>
  );
}
