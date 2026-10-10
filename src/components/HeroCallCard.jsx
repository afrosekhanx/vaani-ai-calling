import { useEffect, useState } from 'react';
import Waveform from './Waveform';
import './HeroCallCard.css';

const script = [
  { who: 'ai', text: 'Hi Karthik, this is Vaani from Sunrise Dental. Is now a good time?' },
  { who: 'user', text: 'Yes, go ahead.' },
  { who: 'ai', text: 'Your cleaning is due. I have Thursday 4 PM or Friday 10 AM.' },
  { who: 'user', text: 'Friday works.' },
  { who: 'ai', text: 'Booked for Friday, 10 AM. I will send a reminder on WhatsApp.' },
];

// A looping fake conversation. Every 1.8 seconds one more message appears.
export default function HeroCallCard() {
  const [shown, setShown] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      // after the last message, wait two extra ticks, then start again
      setShown((count) => (count >= script.length + 2 ? 1 : count + 1));
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  const finished = shown >= script.length;

  return (
    <div className="callcard">
      <div className="callcard__chip callcard__chip--top">Sentiment: positive</div>
      <div className={`callcard__chip callcard__chip--bottom ${finished ? 'is-on' : ''}`}>
        Appointment booked
      </div>

      <div className="callcard__head">
        <span className="callcard__avatar">V</span>
        <div>
          <strong>Appointment reminder</strong>
          <small>Live call, English</small>
        </div>
        <span className="callcard__live">
          <i /> Live
        </span>
      </div>

      <div className="callcard__wave">
        <Waveform bars={34} />
      </div>

      <div className="callcard__chat">
        {script.slice(0, shown).map((line, i) => (
          <p key={i} className={`bubble bubble--${line.who}`}>
            {line.text}
          </p>
        ))}
      </div>
    </div>
  );
}
