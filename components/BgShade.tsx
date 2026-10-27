/** Large, very light grey rounded shapes drifting in the section background (the original's "Vectors"). */
export default function BgShade({ flip = false, className = "" }: { flip?: boolean; className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1920 900"
      preserveAspectRatio="xMidYMin slice"
      className={`pointer-events-none absolute left-0 top-0 -z-10 w-full ${flip ? "-scale-x-100" : ""} ${className}`}
    >
      <path
        fill="#f6f6f5"
        d="M0 52 L390 255 Q520 330 505 440 Q498 500 460 585 L300 900 L0 900 Z"
      />
      <path
        fill="#f6f6f5"
        d="M1920 495 L1730 610 Q1660 660 1668 730 Q1672 790 1745 877 L1920 900 Z"
      />
    </svg>
  );
}
