import useCountUp from '../hooks/useCountUp';
import Sparkline from './Sparkline';

export default function StatCard({ label, target, format, delta, spark, color, start }) {
  const value = useCountUp(target, start);

  return (
    <article className="stat">
      <p className="stat__label">{label}</p>
      <p className="stat__value">{format(value)}</p>
      <div className="stat__foot">
        <span className="stat__delta">{delta} vs previous</span>
        <Sparkline values={spark} color={color} />
      </div>
    </article>
  );
}
