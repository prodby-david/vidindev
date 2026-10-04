interface SquigglyLineProps {
  className?: string;
}

export default function SquigglyLine({ className = "" }: SquigglyLineProps) {
  return (
    <svg
      width="100%"
      height="12"
      viewBox="0 0 48 14"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-horizon stroke-current ${className}`}
      aria-hidden="true"
    >
      <path
        d="M2 7C5 2 9 2 12 7C15 12 19 12 22 7C25 2 29 2 32 7C35 12 39 12 42 7C44 3.7 46 4.5 46 7"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
