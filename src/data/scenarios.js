// Call scripts the AI agent can run in the dialer demo.
export const scenarios = {
  reminder: {
    label: 'Appointment reminder',
    agent: 'Priya',
    outcome: 'Appointment booked',
    lines: [
      { who: 'ai', text: 'Hello, this is Priya from Sunrise Dental. Is this a good time to talk?' },
      { who: 'user', text: 'Yes, go ahead.' },
      { who: 'ai', text: 'Your cleaning is due this month. I have Thursday at 4 PM or Friday at 10 AM.' },
      { who: 'user', text: 'Friday morning works for me.' },
      { who: 'ai', text: 'Done. You are booked for Friday at 10 AM. I will send a reminder on WhatsApp.' },
      { who: 'user', text: 'Great, thank you!' },
    ],
  },
  sales: {
    label: 'Sales follow-up',
    agent: 'Arjun',
    outcome: 'Demo scheduled',
    lines: [
      { who: 'ai', text: 'Hi, this is Arjun from Northwind. You asked about our fleet tracking plan yesterday.' },
      { who: 'user', text: 'Right, I wanted to know about pricing.' },
      { who: 'ai', text: 'Plans start at 499 rupees per vehicle each month. How many vehicles do you run?' },
      { who: 'user', text: 'Around thirty.' },
      { who: 'ai', text: 'Then the team plan fits best. Can I book a 20 minute demo for tomorrow at 11 AM?' },
      { who: 'user', text: 'Sure, send me the invite.' },
    ],
  },
  survey: {
    label: 'Feedback survey',
    agent: 'Meera',
    outcome: 'Survey completed',
    lines: [
      { who: 'ai', text: 'Hello, this is Meera from QuickBite. Do you have one minute for feedback on your last order?' },
      { who: 'user', text: 'Okay, one minute.' },
      { who: 'ai', text: 'On a scale of 0 to 10, how likely are you to recommend us?' },
      { who: 'user', text: 'Nine.' },
      { who: 'ai', text: 'Thank you. Was there anything we could improve about the delivery?' },
      { who: 'user', text: 'It arrived a bit late, otherwise perfect.' },
    ],
  },
};
