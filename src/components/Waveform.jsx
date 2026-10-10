import './Waveform.css';

// Row of bars that bounce like a voice. Each bar gets its own height and delay.
export default function Waveform({ bars = 28, active = true }) {
  return (
    <div className={`wave ${active ? 'wave--on' : ''}`} aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => (
        <span key={i} style={{ '--i': i, '--h': `${30 + ((i * 37) % 70)}%` }} />
      ))}
    </div>
  );
}
