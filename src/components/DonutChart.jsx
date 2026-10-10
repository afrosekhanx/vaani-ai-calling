import { useState } from 'react';

const R = 62;
const CIRCLE = 2 * Math.PI * R;
const GAP = 3;

export default function DonutChart({ data, centerLabel }) {
  const [active, setActive] = useState(null);
  const total = data.reduce((sum, d) => sum + d.value, 0);

  // work out where each slice starts around the circle
  let used = 0;
  const slices = data.map((d) => {
    const length = (d.value / total) * CIRCLE;
    const slice = { ...d, length, offset: used };
    used += length;
    return slice;
  });

  const current = active === null ? null : data[active];

  return (
    <div className="donut">
      <div className="donut__ring">
        <svg viewBox="0 0 180 180" role="img" aria-label="Call outcomes">
          <circle cx="90" cy="90" r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="18" />
          {slices.map((s, i) => (
            <circle
              key={s.label}
              cx="90"
              cy="90"
              r={R}
              fill="none"
              stroke={s.color}
              strokeWidth={active === i ? 24 : 18}
              strokeDasharray={`${Math.max(s.length - GAP, 0)} ${CIRCLE}`}
              strokeDashoffset={-s.offset}
              transform="rotate(-90 90 90)"
              className="donut__slice"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            />
          ))}
        </svg>
        <div className="donut__center">
          <strong>{current ? `${Math.round((current.value / total) * 100)}%` : total.toLocaleString('en-IN')}</strong>
          <span>{current ? current.label : centerLabel}</span>
        </div>
      </div>

      <ul className="donut__legend">
        {slices.map((s, i) => (
          <li
            key={s.label}
            className={active === i ? 'is-active' : ''}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
          >
            <i style={{ background: s.color }} />
            <span>{s.label}</span>
            <b>{s.value.toLocaleString('en-IN')}</b>
          </li>
        ))}
      </ul>
    </div>
  );
}
