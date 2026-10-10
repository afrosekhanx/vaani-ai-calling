import Waveform from './Waveform';
import './CallToAction.css';

export default function CallToAction() {
  return (
    <section className="cta" id="cta">
      <div className="container cta__box">
        <div className="cta__wave" aria-hidden="true">
          <Waveform bars={60} />
        </div>
        <h2>Put your first AI agent on the phone this week</h2>
        <p>Book a 20 minute demo and we will run a real campaign on your own script.</p>
        <a className="btn btn--primary" href="mailto:hello@vaani.example">
          Book a demo
        </a>
      </div>
    </section>
  );
}
