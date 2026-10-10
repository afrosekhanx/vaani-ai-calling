import { useEffect, useRef, useState } from 'react';
import Waveform from './Waveform';
import { scenarios } from '../data/scenarios';
import './Dialer.css';

const KEYS = [
  ['1', ''], ['2', 'ABC'], ['3', 'DEF'],
  ['4', 'GHI'], ['5', 'JKL'], ['6', 'MNO'],
  ['7', 'PQRS'], ['8', 'TUV'], ['9', 'WXYZ'],
  ['*', ''], ['0', '+'], ['#', ''],
];

const MAX_DIGITS = 12;

const STATUS_TEXT = {
  idle: 'Ready to call',
  dialing: 'Calling…',
  connected: 'Connected',
  ended: 'Call ended',
};

const formatTime = (s) =>
  `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

// 9876543210 -> 98765 43210
const formatNumber = (raw) => (raw.length > 5 ? `${raw.slice(0, 5)} ${raw.slice(5)}` : raw);

export default function Dialer() {
  const [digits, setDigits] = useState('');
  const [status, setStatus] = useState('idle'); // idle | dialing | connected | ended
  const [seconds, setSeconds] = useState(0);
  const [lines, setLines] = useState([]);
  const [scenarioId, setScenarioId] = useState('reminder');
  const [muted, setMuted] = useState(false);
  const [speaker, setSpeaker] = useState(true);
  const [shake, setShake] = useState(false);
  const [pressed, setPressed] = useState(null);
  const chatRef = useRef(null);

  const scenario = scenarios[scenarioId];
  const isIdle = status === 'idle';
  const inCall = status === 'dialing' || status === 'connected';

  /* ----- keypad actions ----- */
  const pressKey = (key) => {
    if (!isIdle) return;
    setDigits((d) => (d.length < MAX_DIGITS ? d + key : d));
    setPressed(key);
    setTimeout(() => setPressed(null), 150);
  };

  const backspace = () => isIdle && setDigits((d) => d.slice(0, -1));

  const handleKeyDown = (e) => {
    if (!isIdle) return;
    if (/^[0-9*#]$/.test(e.key)) pressKey(e.key);
    else if (e.key === 'Backspace') backspace();
    else if (e.key === 'Enter' && e.target === e.currentTarget) startCall();
  };

  /* ----- call actions ----- */
  const startCall = () => {
    const realDigits = digits.replace(/[^0-9]/g, '');
    if (realDigits.length < 7) {
      setShake(true); // not a valid number, wiggle the display
      setTimeout(() => setShake(false), 450);
      return;
    }
    setLines([]);
    setSeconds(0);
    setMuted(false);
    setStatus('dialing');
  };

  const endCall = () => setStatus('ended');

  const newCall = () => {
    setStatus('idle');
    setDigits('');
    setLines([]);
    setSeconds(0);
  };

  /* ----- after "Calling…" for 2.6s the call connects ----- */
  useEffect(() => {
    if (status !== 'dialing') return;
    const timer = setTimeout(() => setStatus('connected'), 2600);
    return () => clearTimeout(timer);
  }, [status]);

  /* ----- while connected: run the clock and reveal the script line by line ----- */
  useEffect(() => {
    if (status !== 'connected') return;

    const clock = setInterval(() => setSeconds((s) => s + 1), 1000);
    const timers = scenario.lines.map((line, index) =>
      setTimeout(() => setLines((prev) => [...prev, line]), 700 + index * 2000)
    );

    return () => {
      clearInterval(clock);
      timers.forEach(clearTimeout);
    };
  }, [status, scenario]);

  /* ----- keep the newest message in view ----- */
  useEffect(() => {
    const box = chatRef.current;
    if (box) box.scrollTop = box.scrollHeight;
  }, [lines]);

  const finishedScript = lines.length === scenario.lines.length;

  return (
    <section className="section dialer" id="dialer">
      <div className="container">
        <div className="section__head">
          <h2>Dial a number and watch the AI take over</h2>
          <p>
            Pick a script, type any number (or use your keyboard) and press call. This is a
            simulation, so no real call is placed.
          </p>
        </div>

        <div className="dialer__grid">
          {/* ---------- Left: keypad ---------- */}
          <div className="phone" tabIndex={0} onKeyDown={handleKeyDown} aria-label="Dialer keypad">
            <div className={`phone__display ${shake ? 'is-shaking' : ''}`}>
              <span className="phone__flag">+91</span>
              <output className={`phone__number ${digits ? '' : 'is-empty'}`}>
                {digits ? formatNumber(digits) : 'Enter a number'}
              </output>
              <button
                className="phone__back"
                onClick={backspace}
                disabled={!digits || !isIdle}
                aria-label="Delete last digit"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 5H9l-6 7 6 7h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1Z" />
                  <path d="m17 9-5 6m0-6 5 6" />
                </svg>
              </button>
            </div>

            <div className={`status status--${status}`}>
              <i />
              {STATUS_TEXT[status]}
              {status === 'connected' && <b>{formatTime(seconds)}</b>}
            </div>

            <div className="keypad">
              {KEYS.map(([key, letters]) => (
                <button
                  key={key}
                  className={`key ${pressed === key ? 'is-pressed' : ''}`}
                  onClick={() => pressKey(key)}
                  disabled={!isIdle}
                >
                  <span>{key}</span>
                  <small>{letters}</small>
                </button>
              ))}
            </div>

            <div className="phone__actions">
              <button
                className={`round ${muted ? 'is-on' : ''}`}
                onClick={() => setMuted(!muted)}
                disabled={status !== 'connected'}
                aria-pressed={muted}
              >
                {muted ? 'Muted' : 'Mute'}
              </button>

              {status === 'ended' ? (
                <button className="call-btn" onClick={newCall}>
                  New call
                </button>
              ) : (
                <button
                  className={`call-btn ${inCall ? 'call-btn--end' : ''}`}
                  onClick={inCall ? endCall : startCall}
                  aria-label={inCall ? 'End call' : 'Start call'}
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1Z" />
                  </svg>
                </button>
              )}

              <button
                className={`round ${speaker ? 'is-on' : ''}`}
                onClick={() => setSpeaker(!speaker)}
                disabled={status !== 'connected'}
                aria-pressed={speaker}
              >
                Speaker
              </button>
            </div>
          </div>

          {/* ---------- Right: AI agent panel ---------- */}
          <div className="agent">
            <div className="agent__scripts" role="radiogroup" aria-label="Call script">
              {Object.entries(scenarios).map(([id, s]) => (
                <button
                  key={id}
                  role="radio"
                  aria-checked={scenarioId === id}
                  className={`chip ${scenarioId === id ? 'is-active' : ''}`}
                  onClick={() => setScenarioId(id)}
                  disabled={!isIdle}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div className="agent__who">
              <span className="agent__avatar">{scenario.agent[0]}</span>
              <div>
                <strong>{scenario.agent}</strong>
                <small>AI voice agent</small>
              </div>
              <div className="agent__wave">
                <Waveform bars={22} active={status === 'connected' && !muted} />
              </div>
            </div>

            <div className="agent__chat" ref={chatRef}>
              {lines.length === 0 && (
                <p className="agent__empty">
                  {status === 'dialing'
                    ? 'Ringing… the transcript starts as soon as the call connects.'
                    : 'The live transcript will appear here once the call connects.'}
                </p>
              )}
              {lines.map((line, i) => (
                <p key={i} className={`bubble bubble--${line.who}`}>
                  {line.text}
                </p>
              ))}
            </div>

            {status === 'ended' && (
              <div className="agent__result">
                <span>Result</span>
                <strong>{finishedScript ? scenario.outcome : 'Call ended early'}</strong>
                <em>Length {formatTime(seconds)}</em>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
