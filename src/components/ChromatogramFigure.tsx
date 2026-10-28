// Server-rendered HPLC chromatogram. Inline SVG so the axis labels and the
// annotation are real text in the DOM, it scales crisply, it costs a couple of
// KB instead of a 100KB photograph, and it picks up the theme accent.
//
// IMPORTANT — this is an ILLUSTRATION of what an HPLC trace looks like, drawn
// from the peak list below. It is NOT a measurement of any batch and must never
// be captioned as one. Real figures live on each batch's certificate of
// analysis. It replaced a generated photograph that was captioned as the
// third-party laboratory's own equipment, which was not true.
//
// The trace draws itself via stroke-dashoffset when its section reveals —
// see .pm-trace in globals.css. pathLength normalises the dash length so no
// JavaScript measurement is needed.

interface Peak {
  /** retention time, minutes */
  rt: number;
  /** height as a fraction of full-scale response */
  h: number;
  /** half-width, minutes — narrower reads as better resolution */
  w: number;
}

// A well-resolved target peak with a few small early- and late-eluting
// impurities. Deliberately generic: no compound, no batch, no purity figure.
const PEAKS: Peak[] = [
  { rt: 2.4, h: 0.05, w: 0.10 },
  { rt: 3.6, h: 0.04, w: 0.09 },
  { rt: 5.8, h: 1.0, w: 0.17 },
  { rt: 7.1, h: 0.06, w: 0.11 },
  { rt: 8.9, h: 0.03, w: 0.1 },
];

const X0 = 50;
const X1 = 404;
const Y_TOP = 54;
const Y_BASE = 238;
const T_MAX = 10;
const PATH_LENGTH = 1000;

const x = (t: number) => X0 + (t / T_MAX) * (X1 - X0);
const y = (v: number) => Y_BASE - v * (Y_BASE - Y_TOP);

/** Sum of gaussians, plus a slow baseline drift so it doesn't read as synthetic. */
function response(t: number) {
  let v = 0.004 + 0.0035 * Math.sin(t * 0.8);
  for (const p of PEAKS) {
    v += p.h * Math.exp(-((t - p.rt) ** 2) / (2 * p.w * p.w));
  }
  return v;
}

function buildTrace() {
  const step = 0.05;
  const pts: string[] = [];
  for (let t = 0; t <= T_MAX + 1e-9; t += step) {
    pts.push(`${x(t).toFixed(1)} ${y(response(t)).toFixed(1)}`);
  }
  return `M${pts.join("L")}`;
}

const TRACE = buildTrace();
const AREA = `${TRACE}L${X1} ${Y_BASE}L${X0} ${Y_BASE}Z`;
const MAIN = PEAKS.reduce((a, b) => (b.h > a.h ? b : a));

export default function ChromatogramFigure({ className = "" }: { className?: string }) {
  return (
    <figure className={`rounded-2xl border border-editorial-border bg-white p-5 sm:p-6 ${className}`}>
      <div className="flex items-baseline justify-between gap-3 mb-1">
        <figcaption className="text-xs uppercase tracking-wider text-editorial-muted font-semibold">
          HPLC chromatogram &mdash; illustrative
        </figcaption>
        <span className="font-mono text-[10px] text-editorial-muted">C18 &middot; 220&nbsp;nm</span>
      </div>

      <svg
        viewBox={`0 0 ${X1 + 16} 280`}
        className="w-full h-auto"
        role="img"
        aria-label="An illustrative HPLC chromatogram: a flat baseline with one tall, well-resolved target peak and several much smaller impurity peaks, plotted against retention time in minutes."
      >
        {/* horizontal gridlines — quiet, behind everything */}
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <line
            key={f}
            x1={X0}
            x2={X1}
            y1={y(f)}
            y2={y(f)}
            stroke="var(--color-editorial-border, #E2E8F0)"
            strokeWidth="1"
            strokeDasharray="2 4"
          />
        ))}

        {/* axes */}
        <line x1={X0} x2={X0} y1={Y_TOP - 6} y2={Y_BASE} stroke="var(--color-editorial-border, #E2E8F0)" strokeWidth="1.5" />
        <line x1={X0} x2={X1} y1={Y_BASE} y2={Y_BASE} stroke="var(--color-editorial-border, #E2E8F0)" strokeWidth="1.5" />

        {/* retention-time ticks */}
        {[0, 2, 4, 6, 8, 10].map((t) => (
          <g key={t}>
            <line x1={x(t)} x2={x(t)} y1={Y_BASE} y2={Y_BASE + 5} stroke="var(--color-editorial-border, #E2E8F0)" strokeWidth="1.5" />
            <text
              x={x(t)}
              y={Y_BASE + 18}
              textAnchor="middle"
              fontSize="10"
              fill="var(--color-editorial-muted, #6B7A8D)"
              fontFamily="var(--font-jetbrains-mono), ui-monospace, monospace"
            >
              {t}
            </text>
          </g>
        ))}

        <text
          x={(X0 + X1) / 2}
          y={274}
          textAnchor="middle"
          fontSize="10.5"
          fill="var(--color-editorial-muted, #6B7A8D)"
          letterSpacing="0.06em"
        >
          RETENTION TIME (MIN)
        </text>
        <text
          x={14}
          y={(Y_TOP + Y_BASE) / 2}
          textAnchor="middle"
          fontSize="10.5"
          fill="var(--color-editorial-muted, #6B7A8D)"
          letterSpacing="0.06em"
          transform={`rotate(-90 14 ${(Y_TOP + Y_BASE) / 2})`}
        >
          RESPONSE (mAU)
        </text>

        {/* area under the curve, then the trace itself */}
        <path d={AREA} className="pm-trace-fill" fill="var(--color-editorial-accent, #0097A7)" opacity="0.08" />
        <path
          d={TRACE}
          className="pm-trace"
          pathLength={PATH_LENGTH}
          style={{ "--pm-len": PATH_LENGTH } as React.CSSProperties}
          fill="none"
          stroke="var(--color-editorial-accent, #0097A7)"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* target-peak annotation */}
        <line
          x1={x(MAIN.rt)}
          x2={x(MAIN.rt)}
          y1={y(MAIN.h) - 10}
          y2={y(MAIN.h) - 22}
          stroke="var(--color-editorial-muted, #6B7A8D)"
          strokeWidth="1"
        />
        <text
          x={x(MAIN.rt)}
          y={y(MAIN.h) - 27}
          textAnchor="middle"
          fontSize="11"
          fontWeight="600"
          fill="var(--color-editorial-text, #1A2332)"
        >
          Target compound
        </text>
        <text
          x={x(PEAKS[1].rt) - 4}
          y={y(PEAKS[1].h) - 10}
          textAnchor="middle"
          fontSize="9.5"
          fill="var(--color-editorial-muted, #6B7A8D)"
        >
          impurities
        </text>
      </svg>

      <p className="mt-3 text-xs text-editorial-muted leading-relaxed">
        An illustration of how a well-resolved peptide separates on HPLC &mdash; one dominant target peak,
        impurities small and clearly apart from it. It is a drawing, not a measurement.
        The purity figure, retention times and method for the vial you receive are on that batch&rsquo;s
        certificate of analysis, issued by the testing laboratory rather than by us.
      </p>
    </figure>
  );
}
