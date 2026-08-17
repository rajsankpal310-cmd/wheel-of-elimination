import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CSI Committee Spin the Wheel | K. K. Wagh, Nashik" },
      {
        name: "description",
        content:
          "Progressive elimination spin-the-wheel for CSI Student Branch committee selection, K. K. Wagh Institute of Engineering Education & Research, Nashik, A.Y. 2025-26.",
      },
      { property: "og:title", content: "CSI Committee Spin the Wheel" },
      {
        property: "og:description",
        content: "Spin • Select • Eliminate • Repeat — live CSI committee selection.",
      },
    ],
  }),
  component: Index,
});

const ALL_PARTICIPANTS = [
  "Ankit Kishorkumar Khandelwal",
  "Manasi Umesh Jadhav",
  "Shweta Sanjay Yeola",
  "Meghraj Nilesh Bhavsar",
  "Atharva Tushar Jadhav",
  "Sadique Peersahab Khatib",
  "Akshada Satish Kale",
  "Palak Manilkumar Lokwani",
  "Deepali Sunil Patil",
  "Vaibhav Narayan Patil",
  "Shantanu Prashant Patil",
  "Prasad Sopan Borade",
  "Dhruvesh Kashinath Patil",
  "Sarthak Deepak Pawar",
  "Yash Subhash Gatkal",
  "Hetavi Ramesh Rampariya",
  "Ayush Sudhir Lad",
  "Bhavesh Dipak Kale",
  "Sanket Milind Chaudhari",
  "Rutuja Hitendra Nagare",
  "Piyush Satish Sanap",
  "Omkar Sharad More",
  "Sakshi Malhari Malunjkar",
  "Deodatta Abhyuday Pagar",
  "Sanchita Santosh Rajurkar",
  "Sneha Bhanudas Nikam",
] as const;

const TOTAL = ALL_PARTICIPANTS.length;

const SEGMENT_COLORS = [
  "oklch(0.62 0.17 250)",
  "oklch(0.72 0.15 196)",
  "oklch(0.58 0.16 300)",
  "oklch(0.78 0.15 85)",
  "oklch(0.60 0.17 22)",
  "oklch(0.68 0.16 155)",
];

const R = 250;

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function segmentPath(startDeg: number, endDeg: number) {
  if (endDeg - startDeg >= 359.999) {
    return `M 0 ${-R} A ${R} ${R} 0 1 1 0 ${R} A ${R} ${R} 0 1 1 0 ${-R} Z`;
  }
  const a = polar(0, 0, R, startDeg);
  const b = polar(0, 0, R, endDeg);
  const largeArc = endDeg - startDeg > 180 ? 1 : 0;
  return `M 0 0 L ${a.x.toFixed(2)} ${a.y.toFixed(2)} A ${R} ${R} 0 ${largeArc} 1 ${b.x.toFixed(2)} ${b.y.toFixed(2)} Z`;
}

function truncate(name: string, max: number) {
  return name.length > max ? `${name.slice(0, max - 1).trimEnd()}…` : name;
}

/** Display-only: First Name + Last Name (middle names dropped). */
function shortName(full: string) {
  const parts = full.trim().split(/\s+/);
  if (parts.length <= 2) return full.trim();
  return `${parts[0]} ${parts[parts.length - 1]}`;
}

type Phase = "idle" | "spinning" | "result" | "complete";

function Confetti({ seed }: { seed: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 90 }, (_, i) => ({
        left: (i * 37 + seed * 13) % 100,
        delay: ((i * 7919) % 900) / 1000,
        duration: 2.2 + ((i * 53) % 180) / 100,
        drift: (((i * 97) % 200) - 100).toFixed(0),
        color: SEGMENT_COLORS[i % SEGMENT_COLORS.length],
        w: 7 + (i % 4) * 3,
      })),
    [seed],
  );
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      {pieces.map((p, i) => (
        <span
          key={i}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            width: p.w,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            ["--drift" as string]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

function Index() {
  const [remaining, setRemaining] = useState<string[]>([...ALL_PARTICIPANTS]);
  const [history, setHistory] = useState<string[]>([]);
  const [phase, setPhase] = useState<Phase>("idle");
  const [rotation, setRotation] = useState(0);
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null);
  const [winner, setWinner] = useState<string | null>(null);
  const [showReset, setShowReset] = useState(false);
  const [confettiSeed, setConfettiSeed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  const segAngle = remaining.length > 0 ? 360 / remaining.length : 360;

  const spin = useCallback(() => {
    if (phase !== "idle" || remaining.length === 0) return;
    const idx = Math.floor(Math.random() * remaining.length);
    const chosen = remaining[idx]!;
    const seg = 360 / remaining.length;
    const center = idx * seg + seg / 2;
    const turns = 6 + Math.floor(Math.random() * 3);
    const jitter = (Math.random() - 0.5) * seg * 0.6;
    const current = rotation;
    const base = 360 * turns - center + jitter;
    // land on the next rotation value >= current that keeps momentum forward
    let target = base;
    while (target <= current + 360 * 4) target += 360;

    setWinnerIndex(idx);
    setWinner(null);
    setPhase("spinning");
    setRotation(target);

    timerRef.current = setTimeout(() => {
      setWinner(chosen);
      setHistory((h) => [...h, chosen]);
      setConfettiSeed((s) => s + 1);
      setPhase("result");
    }, 6200);
  }, [phase, remaining, rotation]);

  const nextSpin = useCallback(() => {
    if (phase !== "result" || winner === null) return;
    const rest = remaining.filter((n) => n !== winner);
    setRemaining(rest);
    setWinnerIndex(null);
    setWinner(null);
    setPhase(rest.length === 0 ? "complete" : "idle");
  }, [phase, remaining, winner]);

  const doReset = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setRemaining([...ALL_PARTICIPANTS]);
    setHistory([]);
    setWinner(null);
    setWinnerIndex(null);
    setRotation(0);
    setPhase("idle");
    setShowReset(false);
  }, []);

  const selectedCount = history.length;
  const remainingCount = remaining.length;

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
      {phase === "result" || phase === "complete" ? <Confetti seed={confettiSeed} /> : null}

      <header className="mx-auto max-w-6xl text-center">
        <p className="font-display text-xs tracking-[0.35em] text-brand sm:text-sm">
          COMPUTER SOCIETY OF INDIA
        </p>
        <h2 className="font-display mt-3 text-lg font-bold sm:text-xl">CSI STUDENT BRANCH</h2>
        <p className="mx-auto mt-1 max-w-xl text-sm text-muted-foreground">
          K. K. Wagh Institute of Engineering Education &amp; Research, Nashik
        </p>
        <span className="mt-3 inline-block rounded-full border border-border bg-surface-2/60 px-4 py-1 text-xs font-semibold tracking-widest text-gold">
          A.Y. 2025–26
        </span>
        <h1 className="font-display text-gradient-brand mt-6 text-3xl leading-tight font-extrabold sm:text-4xl lg:text-5xl">
          🎡 CSI COMMITTEE SPIN THE WHEEL
        </h1>
        <p className="mt-2 text-sm tracking-[0.2em] text-muted-foreground uppercase sm:text-base">
          Spin • Select • Eliminate • Repeat
        </p>
      </header>

      <div className="mx-auto mt-8 grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <section className="panel rounded-3xl p-4 sm:p-6">
          <div className="grid grid-cols-2 gap-3">
            <Stat label="Members Remaining" value={`${remainingCount} / ${TOTAL}`} tone="brand" />
            <Stat label="Selected" value={`${selectedCount} / ${TOTAL}`} tone="gold" />
          </div>

          <div className="relative mx-auto mt-6 aspect-square w-full max-w-[560px]">
            {/* pointer */}
            <div className="absolute top-0 left-1/2 z-20 -translate-x-1/2 -translate-y-1">
              <div
                className="h-8 w-6 bg-gold"
                style={{ clipPath: "polygon(50% 100%, 0 0, 100% 0)" }}
              />
            </div>

            <div
              className="absolute inset-0 rounded-full p-[6px]"
              style={{ backgroundImage: "var(--gradient-brand)", boxShadow: "var(--shadow-glow)" }}
            >
              <div className="h-full w-full overflow-hidden rounded-full bg-background">
                <svg viewBox="-260 -260 520 520" className="h-full w-full">
                  <g
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      transition:
                        phase === "spinning"
                          ? "transform 6s cubic-bezier(0.12, 0.75, 0.06, 1)"
                          : "none",
                    }}
                  >
                    {remainingCount === 0 ? (
                      <circle r={R} fill="oklch(0.26 0.05 264)" />
                    ) : (
                      remaining.map((name, i) => {
                        const start = i * segAngle;
                        const end = start + segAngle;
                        const mid = start + segAngle / 2;
                        const isWinner = phase === "result" && winnerIndex === i;
                        const fill = isWinner
                          ? "oklch(0.88 0.16 90)"
                          : SEGMENT_COLORS[i % SEGMENT_COLORS.length];
                        const labelR = R * 0.95;
                        // Arc height available per segment at the label band, and radial run length.
                        const arcRoom = (segAngle * Math.PI * (R * 0.7)) / 180;
                        const label = shortName(name);
                        const radialRoom = labelR - 52;
                        const fontSize = Math.max(
                          11,
                          Math.min(26, arcRoom * 0.78, (radialRoom / Math.max(label.length, 6)) * 1.85),
                        );
                        const maxChars = Math.max(10, Math.floor(radialRoom / (fontSize * 0.54)));
                        return (
                          <g key={name}>
                            <path
                              d={segmentPath(start, end)}
                              fill={fill}
                              stroke="oklch(0.16 0.04 259)"
                              strokeWidth={remainingCount > 1 ? 1.5 : 0}
                            />
                            <text
                              transform={`rotate(${mid}) translate(0 ${-labelR}) rotate(90)`}
                              textAnchor="end"
                              dominantBaseline="middle"
                              fontSize={fontSize.toFixed(1)}
                              fontWeight={isWinner ? 800 : 700}
                              fill={isWinner ? "oklch(0.18 0.05 260)" : "oklch(0.99 0 0)"}
                              style={{ fontFamily: "var(--font-body)", paintOrder: "stroke" }}
                              stroke="oklch(0.16 0.04 259)"
                              strokeWidth={0.9}
                              strokeOpacity={isWinner ? 0 : 0.55}
                            >
                              {truncate(label, maxChars)}
                            </text>
                          </g>
                        );
                      })
                    )}
                  </g>
                  <circle r={44} fill="oklch(0.18 0.04 260)" stroke="oklch(0.78 0.16 196)" strokeWidth={4} />
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={30}
                    fill="oklch(0.78 0.16 196)"
                  >
                    CSI
                  </text>
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            {phase === "result" ? (
              <button
                onClick={nextSpin}
                className="btn-spin font-display w-full rounded-2xl px-8 py-4 text-base font-bold tracking-wide sm:w-auto"
              >
                NEXT SPIN →
              </button>
            ) : (
              <button
                onClick={spin}
                disabled={phase !== "idle" || remainingCount === 0}
                className="btn-spin font-display w-full rounded-2xl px-8 py-4 text-base font-bold tracking-wide sm:w-auto"
              >
                {phase === "spinning" ? "SPINNING..." : "🎡 SPIN THE WHEEL"}
              </button>
            )}
            <button
              onClick={() => setShowReset(true)}
              disabled={phase === "spinning"}
              className="font-display w-full rounded-2xl border border-border bg-surface-2/70 px-6 py-4 text-sm font-semibold tracking-wide text-foreground transition-colors hover:bg-surface-2 disabled:opacity-50 sm:w-auto"
            >
              ↻ RESET WHEEL
            </button>
          </div>

          {phase === "complete" ? (
            <div className="animate-pop-in mt-6 rounded-2xl border border-gold/40 bg-surface-2/60 p-6 text-center">
              <p className="font-display text-xl font-extrabold text-gold sm:text-2xl">
                🏆 ALL MEMBERS SELECTED! 🏆
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                The CSI Committee selection is complete.
              </p>
              <p className="font-display mt-3 text-lg font-bold">{TOTAL} / {TOTAL} Selected</p>
            </div>
          ) : null}

          {remainingCount === 1 && phase === "idle" ? (
            <p className="mt-5 text-center text-sm text-gold">
              Final participant remaining: <span className="font-semibold">{remaining[0]}</span>
            </p>
          ) : null}
        </section>

        <aside className="panel rounded-3xl p-5">
          <h3 className="font-display text-sm font-bold tracking-[0.25em] text-brand">
            SELECTION HISTORY
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {selectedCount === 0 ? "No members selected yet." : `${selectedCount} selected in order`}
          </p>
          <ol className="mt-4 max-h-[520px] space-y-2 overflow-y-auto pr-1">
            {history.map((name, i) => (
              <li
                key={name}
                className="flex items-start gap-3 rounded-xl border border-border bg-surface/70 px-3 py-2 text-sm"
              >
                <span className="font-display shrink-0 text-xs font-bold text-gold">#{i + 1}</span>
                <span className="leading-snug">{name}</span>
              </li>
            ))}
          </ol>
        </aside>
      </div>

      {/* Winner modal */}
      {phase === "result" && winner ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 px-4 backdrop-blur-sm">
          <div className="animate-pop-in animate-glow-pulse panel w-full max-w-lg rounded-3xl p-8 text-center">
            <p className="font-display text-lg font-bold tracking-widest text-gold">
              🎉 SELECTED MEMBER 🎉
            </p>
            <p className="font-display text-gradient-brand mt-4 text-2xl leading-tight font-extrabold sm:text-3xl">
              {winner}
            </p>
            <p className="mt-4 text-xs tracking-widest text-muted-foreground uppercase">
              #{selectedCount} of {TOTAL} • {remainingCount - 1} remaining after this round
            </p>
            <button
              onClick={nextSpin}
              className="btn-spin font-display mt-6 w-full rounded-2xl px-8 py-4 font-bold tracking-wide"
            >
              NEXT SPIN →
            </button>
          </div>
        </div>
      ) : null}

      {/* Reset confirm */}
      {showReset ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 px-4 backdrop-blur-sm">
          <div className="panel animate-pop-in w-full max-w-md rounded-3xl p-7 text-center">
            <p className="font-display text-lg font-bold">
              Reset the wheel and restore all {TOTAL} members?
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              This clears the selection history for this session.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={doReset}
                className="btn-spin font-display flex-1 rounded-2xl px-6 py-3 font-bold"
              >
                Yes, reset
              </button>
              <button
                onClick={() => setShowReset(false)}
                className="font-display flex-1 rounded-2xl border border-border bg-surface-2/70 px-6 py-3 font-semibold hover:bg-surface-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "brand" | "gold";
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface-2/50 px-4 py-3 text-center">
      <p className="text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase sm:text-xs">
        {label}
      </p>
      <p
        className={`font-display mt-1 text-xl font-extrabold sm:text-2xl ${
          tone === "brand" ? "text-brand" : "text-gold"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
