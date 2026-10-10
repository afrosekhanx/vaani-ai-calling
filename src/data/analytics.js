// Demo numbers for the analytics dashboard. Two ranges so the toggle has something to switch.
export const ranges = {
  '7D': {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    calls: [820, 940, 1100, 1010, 1280, 690, 540],
    answered: [610, 720, 860, 790, 1010, 500, 410],
    // outcomes add up to the total answered calls (4,900)
    outcomes: { booked: 1860, interested: 1370, callback: 930, declined: 740 },
    hours: [180, 420, 610, 520, 360, 440, 590, 640, 480, 260],
    successTrend: [61, 63, 64, 66, 69, 65, 64],
    durationTrend: [205, 214, 226, 231, 240, 198, 190],
    deltas: { calls: '+14.2%', answered: '+11.8%', success: '+3.1 pts', duration: '+12s' },
  },
  '30D': {
    labels: ['Sep 11', 'Sep 14', 'Sep 17', 'Sep 20', 'Sep 23', 'Sep 26', 'Sep 29', 'Oct 2', 'Oct 5', 'Oct 8'],
    calls: [2300, 2650, 2480, 3100, 2890, 3350, 3020, 3480, 3760, 3900],
    answered: [1700, 2010, 1880, 2400, 2230, 2610, 2370, 2740, 2960, 3100],
    // outcomes add up to the total answered calls (24,000)
    outcomes: { booked: 8300, interested: 6400, callback: 5000, declined: 4300 },
    hours: [864, 2016, 2928, 2496, 1728, 2112, 2832, 3072, 2304, 1248],
    successTrend: [58, 60, 61, 62, 64, 65, 65, 67, 68, 70],
    durationTrend: [210, 215, 220, 224, 228, 231, 236, 240, 244, 248],
    deltas: { calls: '+32.6%', answered: '+29.4%', success: '+5.8 pts', duration: '+38s' },
  },
};

export const hourLabels = ['9', '10', '11', '12', '1', '2', '3', '4', '5', '6'];

export const recentCalls = [
  { name: 'Karthik R.', number: '+91 98•••• 4210', script: 'Appointment reminder', duration: '02:48', outcome: 'Booked' },
  { name: 'Divya S.', number: '+91 90•••• 7731', script: 'Sales follow-up', duration: '04:15', outcome: 'Interested' },
  { name: 'Mohammed A.', number: '+91 87•••• 0925', script: 'Feedback survey', duration: '01:32', outcome: 'Booked' },
  { name: 'Lakshmi P.', number: '+91 99•••• 3068', script: 'Appointment reminder', duration: '00:41', outcome: 'Callback' },
  { name: 'Suresh K.', number: '+91 94•••• 5517', script: 'Sales follow-up', duration: '00:19', outcome: 'Declined' },
];
