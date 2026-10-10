// Calls by hour of the day. The busiest hour is highlighted in mint.
export default function BarChart({ labels, values }) {
  const max = Math.max(...values);
  const peak = values.indexOf(max);

  return (
    <div className="bars" role="img" aria-label="Calls by hour of the day">
      {values.map((v, i) => (
        <div className="bars__col" key={labels[i]} title={`${v.toLocaleString('en-IN')} calls`}>
          <div className="bars__track">
            <div
              className={`bars__fill ${i === peak ? 'is-peak' : ''}`}
              style={{ height: `${(v / max) * 100}%`, '--delay': `${i * 70}ms` }}
            />
          </div>
          <span>{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}
