import { useState } from 'react';
import useInView from '../hooks/useInView';
import StatCard from './StatCard';
import LineChart from './LineChart';
import DonutChart from './DonutChart';
import BarChart from './BarChart';
import { ranges, hourLabels, recentCalls } from '../data/analytics';
import './Analytics.css';

const sum = (list) => list.reduce((a, b) => a + b, 0);

const formatDuration = (secs) => {
  const s = Math.round(secs);
  return `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, '0')}s`;
};

export default function Analytics() {
  const [range, setRange] = useState('7D');
  const [ref, seen] = useInView(0.15);
  const data = ranges[range];

  // numbers worked out from the raw data
  const totalCalls = sum(data.calls);
  const answered = sum(data.answered);
  const { booked, interested, callback, declined } = data.outcomes;
  const successRate = ((booked + interested) / answered) * 100;
  const avgSeconds = sum(data.durationTrend) / data.durationTrend.length;

  const stats = [
    { label: 'Total calls', target: totalCalls, format: (v) => Math.round(v).toLocaleString('en-IN'), delta: data.deltas.calls, spark: data.calls, color: '#8a7dff' },
    { label: 'Answered calls', target: answered, format: (v) => Math.round(v).toLocaleString('en-IN'), delta: data.deltas.answered, spark: data.answered, color: '#14c8a5' },
    { label: 'Success rate', target: successRate, format: (v) => `${v.toFixed(1)}%`, delta: data.deltas.success, spark: data.successTrend, color: '#ffb020' },
    { label: 'Avg. call duration', target: avgSeconds, format: formatDuration, delta: data.deltas.duration, spark: data.durationTrend, color: '#ff5c7a' },
  ];

  const outcomes = [
    { label: 'Booked', value: booked, color: '#14c8a5' },
    { label: 'Interested', value: interested, color: '#8a7dff' },
    { label: 'Callback', value: callback, color: '#ffb020' },
    { label: 'Declined', value: declined, color: '#ff5c7a' },
  ];

  return (
    <section className={`section dash ${seen ? 'is-in' : ''}`} id="analytics" ref={ref}>
      <div className="container">
        <div className="dash__top">
          <div className="section__head">
            <h2>Every call, measured the moment it ends</h2>
            <p>
              Volume, answer rate, outcomes and talk time update live, so you can see which
              scripts and hours bring results.
            </p>
          </div>

          <div className="toggle" role="group" aria-label="Date range">
            {Object.keys(ranges).map((key) => (
              <button
                key={key}
                className={range === key ? 'is-active' : ''}
                onClick={() => setRange(key)}
                aria-pressed={range === key}
              >
                {key === '7D' ? 'Last 7 days' : 'Last 30 days'}
              </button>
            ))}
          </div>
        </div>

        <div className="stats">
          {stats.map((s) => (
            <StatCard key={`${range}-${s.label}`} {...s} start={seen} />
          ))}
        </div>

        <div className="panels" key={range}>
          <div className="panel panel--wide">
            <header>
              <h3>Calls over time</h3>
              <div className="legend">
                <span><i style={{ background: '#8a7dff' }} />Total</span>
                <span><i style={{ background: '#14c8a5' }} />Answered</span>
              </div>
            </header>
            <LineChart
              labels={data.labels}
              series={[
                { name: 'Total', values: data.calls, color: '#8a7dff' },
                { name: 'Answered', values: data.answered, color: '#14c8a5' },
              ]}
            />
          </div>

          <div className="panel">
            <header>
              <h3>Call outcomes</h3>
            </header>
            <DonutChart data={outcomes} centerLabel="answered" />
          </div>

          <div className="panel">
            <header>
              <h3>Busiest hours</h3>
              <span className="panel__hint">Calls by hour, 9 AM to 6 PM</span>
            </header>
            <BarChart labels={hourLabels} values={data.hours} />
          </div>

          <div className="panel panel--wide">
            <header>
              <h3>Recent calls</h3>
            </header>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Contact</th>
                    <th>Script</th>
                    <th>Length</th>
                    <th>Outcome</th>
                  </tr>
                </thead>
                <tbody>
                  {recentCalls.map((call) => (
                    <tr key={call.number}>
                      <td>
                        <strong>{call.name}</strong>
                        <small>{call.number}</small>
                      </td>
                      <td>{call.script}</td>
                      <td className="num">{call.duration}</td>
                      <td>
                        <span className={`badge badge--${call.outcome.toLowerCase()}`}>{call.outcome}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
