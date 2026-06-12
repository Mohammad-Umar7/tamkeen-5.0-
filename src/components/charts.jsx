/* SVG chart primitives matching the mockups: radar map, trend lines, rings. */

export function RadarChart({ labels, academic, industry, size = 430 }) {
  const cx = size / 2;
  const cy = size / 2;
  const R = size * 0.31;
  const n = labels.length;

  const point = (i, v) => {
    const a = ((-90 + (i * 360) / n) * Math.PI) / 180;
    return [cx + Math.cos(a) * R * v, cy + Math.sin(a) * R * v];
  };
  const poly = (vals, f = 1) =>
    vals.map((v, i) => point(i, v * f).map((x) => x.toFixed(1)).join(",")).join(" ");

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[460px]" role="img" aria-label="Skill gap radar map">
      {/* grid rings */}
      {[0.35, 0.68, 1].map((lvl) => (
        <polygon
          key={lvl}
          points={poly(Array(n).fill(lvl))}
          fill="none"
          stroke="#E5E8F0"
          strokeWidth="1"
        />
      ))}
      {/* axis lines */}
      {labels.map((_, i) => {
        const [x, y] = point(i, 1);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#EDEFF4" strokeWidth="1" />;
      })}
      {/* industry (dashed teal) */}
      <polygon
        points={poly(industry)}
        fill="none"
        stroke="#0C8A6A"
        strokeWidth="2"
        strokeDasharray="6 5"
        strokeLinejoin="round"
      />
      {/* academic (solid navy, soft fill) */}
      <polygon
        points={poly(academic)}
        fill="rgba(20,46,77,0.09)"
        stroke="#142E4D"
        strokeWidth="2.25"
        strokeLinejoin="round"
      />
      {/* labels */}
      {labels.map((label, i) => {
        const a = ((-90 + (i * 360) / n) * Math.PI) / 180;
        const x = cx + Math.cos(a) * (R + 26);
        const y = cy + Math.sin(a) * (R + 22);
        const anchor = Math.cos(a) > 0.3 ? "start" : Math.cos(a) < -0.3 ? "end" : "middle";
        return (
          <text
            key={label}
            x={x}
            y={y + 4}
            textAnchor={anchor}
            style={{ font: "500 12px 'Inter', sans-serif", fill: "#56657A" }}
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
}

export function TrendChart({ coverage, demand }) {
  const W = 600;
  const H = 190;
  const toPath = (vals) =>
    vals
      .map((v, i) => {
        const x = 16 + (i / (vals.length - 1)) * (W - 32);
        const y = H - 20 - (v / 100) * (H - 50);
        return `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Skill alignment trend">
      {[45, 95, 145].map((y) => (
        <line key={y} x1="16" y1={y} x2={W - 16} y2={y} stroke="#EDEFF4" strokeWidth="1" />
      ))}
      <path d={toPath(demand)} fill="none" stroke="#0C8A6A" strokeWidth="2" strokeDasharray="5 5" />
      <path d={toPath(coverage)} fill="none" stroke="#142E4D" strokeWidth="2.25" strokeLinecap="round" />
    </svg>
  );
}

export function ProgressRing({ value, size = 84, stroke = 7 }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const mid = size / 2;
  return (
    <svg width={size} height={size} role="img" aria-label={`${value}% complete`}>
      <circle cx={mid} cy={mid} r={r} fill="none" stroke="#E7EAF0" strokeWidth={stroke} />
      <circle
        cx={mid}
        cy={mid}
        r={r}
        fill="none"
        stroke="#0C8A6A"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${(c * value) / 100} ${c}`}
        transform={`rotate(-90 ${mid} ${mid})`}
      />
      <text
        x={mid}
        y={mid + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ font: "600 16px 'Inter', sans-serif", fill: "#142E4D" }}
      >
        {value}%
      </text>
    </svg>
  );
}

export function DonutStat({ value, label, size = 150, stroke = 13 }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const mid = size / 2;
  return (
    <svg width={size} height={size} role="img" aria-label={`${value}% ${label}`}>
      <circle cx={mid} cy={mid} r={r} fill="none" stroke="#E7EAF0" strokeWidth={stroke} />
      <circle
        cx={mid}
        cy={mid}
        r={r}
        fill="none"
        stroke="#0C7B66"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${(c * value) / 100} ${c}`}
        transform={`rotate(-90 ${mid} ${mid})`}
      />
      <text
        x={mid}
        y={mid - 4}
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ font: "700 28px 'Manrope', sans-serif", fill: "#142E4D" }}
      >
        {value}%
      </text>
      <text
        x={mid}
        y={mid + 18}
        textAnchor="middle"
        style={{ font: "700 9.5px 'Inter', sans-serif", letterSpacing: "0.08em", fill: "#6B7A8F" }}
      >
        {label.toUpperCase()}
      </text>
    </svg>
  );
}
