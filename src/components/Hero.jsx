import Waveform from './Waveform';
import HeroCallCard from './HeroCallCard';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__rings" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="container hero__grid">
        <div className="hero__copy">
          <h1>
            Phone calls, handled by an AI
            <span className="hero__inline-wave" aria-hidden="true">
              <Waveform bars={10} />
            </span>
            that listens first.
          </h1>

          <p className="hero__lead">
            Vaani places and answers calls in English, Tamil and Hindi. It confirms appointments,
            qualifies leads and logs every result before your team has finished their coffee.
          </p>

          <div className="hero__actions">
            <a className="btn btn--primary" href="#dialer">
              Try the live dialer
            </a>
            <a className="btn btn--ghost" href="#analytics">
              See the analytics
            </a>
          </div>

          <p className="hero__note">Set up in about ten minutes. No credit card needed.</p>
        </div>

        <HeroCallCard />
      </div>
    </section>
  );
}
