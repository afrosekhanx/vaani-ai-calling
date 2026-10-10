import './HowItWorks.css';

// These really are steps in order, so numbering them makes sense.
const steps = [
  { title: 'Upload your contacts', text: 'Import a CSV or connect your CRM. Vaani cleans duplicates and skips numbers on Do Not Call lists.' },
  { title: 'Choose a script and voice', text: 'Start from a ready script such as reminders, follow-ups or surveys, then pick the language and voice.' },
  { title: 'Vaani makes the calls', text: 'Calls go out at the best time for each contact. Busy or unanswered numbers are retried automatically.' },
  { title: 'Review the results', text: 'Read transcripts, see outcomes in the dashboard and hand warm leads to your team.' },
];

export default function HowItWorks() {
  return (
    <section className="section how" id="how">
      <div className="container">
        <div className="section__head">
          <h2>From contact list to booked appointments in four steps</h2>
        </div>

        <ol className="how__steps">
          {steps.map((step, i) => (
            <li key={step.title}>
              <span className="how__num">{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
