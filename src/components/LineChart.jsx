import { useState } from 'react';

const W = 640;
const H = 270;
const PAD = { top: 18, right: 16, bottom: 32, left: 46 };

// Turns a list of [x, y] points into a smooth curved SVG path.
function smoothPath(points) {
  return points.reduce((d, [x, y], i) => {
    if (i === 0) return `M${x},${y}`;
    const [prevX, prevY] = points[i - 1];
    const midX = (prevX + x) / 2;
    return `${d} C${midX},${prevY} ${midX},${y} ${x},${y}`;
  }, '');
}

export default function LineChart({ labels, series }) {
  const [hover, setHover] = useState(null);

  const count = labels.length;
  const maxValue = Math.max(...series.flatMap((s) => s.values));
  const top = Math.ceil(maxValue / 400) * 400; // round up so the grid looks neat
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const x = (i) => PAD.left + (i * innerW) / (count - 1);
  const y = (v) => PAD.top + innerH - (v / top) * innerH;
  const ticks = [0, 1, 2, 3, 4].map((i) => (top / 4) * i);
  const labelEvery = count > 7 ? 2 : 1;

  // Which data point is the mouse closest to?
  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * W;
    const index = Math.round(((relX - PAD.left) / innerW) * (count - 1));
    setHover(Math.max(0, Math.min(count - 1, index)));
  };

  const tooltipLeft = hover === null ? 0 : Math.min(Math.max((x(hover) / W) * 100, 16), 84);

  return (
    <div className="linechart">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        onPointerMove={handleMove}
        onPointerLeave={() => setHover(null)}
        role="img"
        aria-label="Total and answered calls over time"
      >
        <defs>
          {series.map((s) => (
            <linearGradient key={s.name} id={`fill-${s.name}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={s.color} stopOpacity="0.35" />
              <stop offset="100%" stopColor={s.color} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>

        {/* grid + y labels */}
        {ticks.map((t) => (
          <g key={t}>
            <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} className="grid-line" />
            <text x={PAD.left - 10} y={y(t) + 4} textAnchor="end" className="axis-text">
              {t.toLocaleString('en-IN')}
            </text>
          </g>
        ))}

        {/* x labels */}
        {labels.map((label, i) =>
          i % labelEvery === 0 ? (
            <text key={label} x={x(i)} y={H - 8} textAnchor="middle" className="axis-text">
              {label}
            </text>
          ) : null
        )}

        {/* lines */}
        {series.map((s) => {
          const pts = s.values.map((v, i) => [x(i), y(v)]);
          const line = smoothPath(pts);
          const area = `${line} L${x(count - 1)},${y(0)} L${x(0)},${y(0)} Z`;
          return (
            <g key={s.name}>
              <path d={area} fill={`url(#fill-${s.name})`} className="area" />
              <path d={line} fill="none" stroke={s.color} strokeWidth="3" strokeLinecap="round" pathLength="1" className="line-path" />
            </g>
          );
        })}

        {/* hover marker */}
        {hover !== null && (
          <g>
            <line x1={x(hover)} x2={x(hover)} y1={PAD.top} y2={y(0)} className="hover-line" />
            {series.map((s) => (
              <circle key={s.name} cx={x(hover)} cy={y(s.values[hover])} r="5.5" fill="#12163a" stroke={s.color} strokeWidth="3" />
            ))}
          </g>
        )}
      </svg>

      {hover !== null && (
        <div className="tooltip" style={{ left: `${tooltipLeft}%` }}>
          <strong>{labels[hover]}</strong>
          {series.map((s) => (
            <span key={s.name}>
              <i style={{ background: s.color }} />
              {s.name}: {s.values[hover].toLocaleString('en-IN')}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
