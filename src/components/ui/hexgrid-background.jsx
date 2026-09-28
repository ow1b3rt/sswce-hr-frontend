export function HexGridBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <svg
        className="text-dark-green/[0.06] h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="hex-grid"
            width="80"
            height="138.56"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(1.4)"
          >
            <path
              d="M40 0 L80 23.09 L80 69.28 L40 92.37 L0 69.28 L0 23.09 Z M40 92.37 L80 115.47 L80 161.66 M40 92.37 L0 115.47 L0 161.66"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex-grid)" />
      </svg>
    </div>
  );
}
