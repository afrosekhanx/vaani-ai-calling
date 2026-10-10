# Vaani – AI Calling Platform (Landing Page)

A landing page for an AI calling platform, built with **React + Vite**. No UI or chart libraries are used, so every chart and animation is plain React, SVG and CSS.

## Run it

```bash
npm install
npm run dev      # open the address shown in the terminal
npm run build    # production build in /dist
```

## What is inside

| Section | Component | What it does |
| --- | --- | --- |
| Hero | `Hero`, `HeroCallCard`, `Waveform` | Headline, call-to-action buttons and an animated live-call card |
| Interactive dialer | `Dialer` | Keypad, keyboard typing, validation, call states (ready, calling, connected, ended), live timer, mute and speaker, AI transcript with 3 scripts |
| Analytics | `Analytics`, `StatCard`, `LineChart`, `DonutChart`, `BarChart` | Count-up stats, hover line chart, interactive donut, bar chart, recent-calls table, 7 day / 30 day toggle |
| Extras | `Navbar`, `HowItWorks`, `CallToAction`, `Footer` | Responsive menu, steps, closing section |

## Project structure

```
src/
  components/   one file (plus css) per piece of UI
  hooks/        useInView (start animation on scroll), useCountUp (animated numbers)
  data/         sample data for scripts and analytics
  index.css     colours, fonts and spacing tokens
```

## Notes

- The dialer is a simulation. No real call is made.
- Colours and fonts live at the top of `src/index.css`.
- Animations respect `prefers-reduced-motion`.
