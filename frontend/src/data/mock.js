// Mock data for Wheel of Names clone

export const defaultEntries = [
  "Kylie",
  "Beatriz",
  "Charles",
  "Diya",
  "Eric",
  "Fatima",
  "Gabriel",
  "Hanna"
];

// Colors matching the original wheel - red, yellow, green, blue, purple
export const wheelColors = [
  "#e74c3c", // Red
  "#f1c40f", // Yellow
  "#27ae60", // Green
  "#3498db", // Blue
  "#9b59b6", // Purple
  "#e74c3c", // Red
  "#27ae60", // Green
  "#f1c40f", // Yellow
];

export const defaultWheelConfig = {
  spinDuration: 5000,
  minSpins: 3,
  maxSpins: 6,
};

export const faqData = [
  {
    title: "What is the wheel spinner for?",
    content: `Every day we hear from people who use our website in new ways:
    
• Random name picker in the classroom: pick which student will answer the next question.
• If you are a retailer, spin the wheel to pick which loyal customer will get the monthly giveaway.
• When you give a presentation, use the wheel spinner to pick a lucky winner among the attendees who turned in the survey.
• Random name picker at work: in your daily standup meeting at work, randomize who speaks first.
• If you are overwhelmed by your to do items, put them on a wheel and spin to find which one to start with.
• Lucky draw name picker at a party: put all your friends' names on the wheel and spin to pick who will go first in a game.
• If you can't agree on what to have for dinner, put the alternatives on the wheel and spin.`
  },
  {
    title: "Is the wheel truly random?",
    content: `Yes, but don't just take our word for it. We are so confident in our code that we built a tool to let you prove it yourself. You can run 10,000 spins in seconds and see the results.

How We Guarantee Randomness: To ensure genuinely unpredictable results, this site does not use the standard Math.random() function. Instead, the wheel's physics are driven by crypto.getRandomValues(), a specialized, high-security function built into modern web browsers. This cryptographically secure function uses high-entropy sources from your operating system, like hardware timings, mouse movements, and keyboard delays, to generate truly unpredictable results.`
  },
  {
    title: "Can I close the ads?",
    content: `We rely on ads to keep the website free for everyone. However, we show fewer ads than most other websites, and allow you to easily close all ads for the duration of your session. Simply press the x next to "Close ads" above the ads, and they go away.`
  },
  {
    title: "Can I use the wheel in OBS or Streamlabs?",
    content: `Yes! You can add the wheel as a browser source in streaming software. Go to the streaming control panel to manage the wheel for your broadcast.

Common streamer uses:
• In-game challenges: Spin to pick a random handicap, like "pistol only."
• Character builds: Let the wheel choose your class, skills, or starting weapon.
• Viewer giveaways: Spin to randomly pick a winner from your chat.`
  }
];
