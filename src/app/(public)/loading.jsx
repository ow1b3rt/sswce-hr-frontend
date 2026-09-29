"use client";

import { useEffect, useState } from "react";

const WORDS = [
  "Fathoming",
  "Sleuthing",
  "Screening résumés",
  "Matching talent",
  "Untangling org charts",
  "Percolating",
  "Scheduling interviews",
  "Noodling",
  "Rummaging through files",
  "Divining culture fit",
  "Cogitating",
  "Herding candidates",
  "Spelunking payroll",
  "Simmering",
];

const INTERVAL_MS = 2200; // time between words
const FADE_MS = 400; // fade out / fade in duration

const RED = "var(--color-primary-red)";
const GREEN = "var(--color-primary-green)";
const BLUE = "var(--color-primary-blue)";
const PALETTE = [RED, GREEN, BLUE, RED, GREEN];

const CENTER = 60;
const RADIUS = 40;
const NODES = Array.from({ length: 5 }, (_, i) => {
  const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
  return {
    x: CENTER + RADIUS * Math.cos(angle),
    y: CENTER + RADIUS * Math.sin(angle),
    color: PALETTE[i],
  };
});

function pickNext(current) {
  let next = current;
  while (next === current) next = Math.floor(Math.random() * WORDS.length);
  return next;
}

export default function Loading() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setIndex(Math.floor(Math.random() * WORDS.length));
    setVisible(true);

    let swap;
    const timer = setInterval(() => {
      setVisible(false); // fade the current word out
      swap = setTimeout(() => {
        setIndex((i) => pickNext(i)); // swap while invisible
        setVisible(true); // fade the new word in
      }, FADE_MS);
    }, INTERVAL_MS);

    return () => {
      clearInterval(timer);
      clearTimeout(swap);
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className="hr-loader flex min-h-[70vh] w-full flex-col items-center justify-center gap-8 px-6"
    >
      <div className="relative h-40 w-40">
        <div className="hr-glow absolute inset-4 rounded-full" />

        <svg viewBox="0 0 120 120" className="relative h-full w-full">
          <g className="hr-ring">
            <circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS + 12}
              fill="none"
              stroke={BLUE}
              strokeOpacity="0.35"
              strokeWidth="1"
              strokeDasharray="3 6"
              strokeLinecap="round"
            />
          </g>

          {NODES.map((n, i) => {
            const next = NODES[(i + 1) % NODES.length];
            return (
              <g key={`l-${i}`}>
                <line
                  x1={n.x}
                  y1={n.y}
                  x2={next.x}
                  y2={next.y}
                  stroke="currentColor"
                  strokeOpacity="0.15"
                  strokeWidth="1.2"
                />
                <line
                  className="hr-spoke"
                  style={{ animationDelay: `${i * 0.24}s` }}
                  x1={n.x}
                  y1={n.y}
                  x2={CENTER}
                  y2={CENTER}
                  stroke={n.color}
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </g>
            );
          })}

          <circle cx={CENTER} cy={CENTER} r="7" fill={BLUE} className="hr-hub" />

          {NODES.map((n, i) => (
            <g key={`n-${i}`} transform={`translate(${n.x} ${n.y})`}>
              <circle
                r="6.5"
                fill={n.color}
                className="hr-node"
                style={{ animationDelay: `${i * 0.24}s` }}
              />
              <circle cy="-1.6" r="1.7" fill="white" />
              <path d="M-3.2 3.4a3.2 3 0 0 1 6.4 0z" fill="white" />
            </g>
          ))}
        </svg>
      </div>

      <div className="flex flex-col items-center gap-3">
        <div className="h-8">
          <p
            className={`hr-word text-xl font-semibold tracking-tight ${
              visible ? "hr-word-in" : "hr-word-out"
            }`}
            style={{ transitionDuration: `${FADE_MS}ms` }}
          >
            {WORDS[index]}
            <span className="hr-dots" aria-hidden="true">
              <i>.</i>
              <i>.</i>
              <i>.</i>
            </span>
          </p>
        </div>

        <div className="h-1 w-48 overflow-hidden rounded-full bg-current/10">
          <div className="hr-bar h-full w-1/3 rounded-full" />
        </div>
      </div>

      <span className="sr-only">Loading</span>

      <style>{`
        .hr-loader {
          animation: hr-appear 0.5s ease-out 0.15s both;
        }
        .hr-glow {
          background: radial-gradient(
            circle,
            color-mix(in srgb, ${BLUE} 22%, transparent),
            transparent 70%
          );
          animation: hr-breathe 3.6s ease-in-out infinite;
        }
        .hr-ring {
          transform-origin: 60px 60px;
          animation: hr-spin 24s linear infinite;
        }
        .hr-node {
          transform-box: fill-box;
          transform-origin: center;
          animation: hr-node 1.2s ease-in-out infinite;
        }
        .hr-hub {
          transform-box: fill-box;
          transform-origin: center;
          animation: hr-hub 1.2s ease-in-out infinite;
        }
        .hr-spoke {
          stroke-dasharray: 40;
          stroke-dashoffset: 40;
          animation: hr-spoke 1.2s ease-in-out infinite;
        }
        .hr-word {
          transition-property: opacity, transform;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hr-word-in {
          opacity: 1;
          transform: translateY(0);
        }
        .hr-word-out {
          opacity: 0;
          transform: translateY(6px);
        }
        .hr-dots i {
          font-style: normal;
          opacity: 0.2;
          animation: hr-dot 1.2s ease-in-out infinite;
        }
        .hr-dots i:nth-child(2) { animation-delay: 0.2s; }
        .hr-dots i:nth-child(3) { animation-delay: 0.4s; }
        .hr-bar {
          background: linear-gradient(90deg, ${RED}, ${GREEN}, ${BLUE});
          animation: hr-slide 1.4s ease-in-out infinite;
        }

        @keyframes hr-appear {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes hr-spin { to { transform: rotate(360deg); } }
        @keyframes hr-breathe {
          0%, 100% { transform: scale(0.92); opacity: 0.7; }
          50% { transform: scale(1.08); opacity: 1; }
        }
        @keyframes hr-node {
          0%, 100% { transform: scale(1); opacity: 0.55; }
          30% { transform: scale(1.35); opacity: 1; }
        }
        @keyframes hr-hub {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.25); }
        }
        @keyframes hr-spoke {
          0% { stroke-dashoffset: 40; }
          40%, 70% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -40; }
        }
        @keyframes hr-dot {
          0%, 100% { opacity: 0.2; }
          40% { opacity: 1; }
        }
        @keyframes hr-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .hr-loader, .hr-glow, .hr-ring, .hr-node, .hr-hub, .hr-spoke,
          .hr-dots i, .hr-bar { animation: none; }
          .hr-word { transition: none; }
          .hr-spoke { stroke-dashoffset: 0; stroke-opacity: 0.3; }
          .hr-bar { width: 100%; }
        }
      `}</style>
    </div>
  );
}
