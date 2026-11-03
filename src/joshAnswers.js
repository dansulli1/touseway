import { events, games, youth } from "./data";

function normalize(value) {
  return value
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function mentions(text, name) {
  const needle = normalize(name);
  if (needle.length < 3) return false;
  const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?:^| )${escaped}(?: |$)`).test(text);
}

const topics = [
  {
    phrases: ["show me around", "give me a tour", "walk me through", "start the tour", "tour"],
    tour: true,
  },
  {
    phrases: ["eitc", "tax credit", "pennsylvania tax", "state tax"],
    to: "/eitc",
    reply:
      "Pennsylvania businesses can earn up to a 90% state tax credit by supporting JOSHWAY through EITC. I’ll open that page.",
  },
  {
    phrases: ["scholarship", "ncc", "northampton community college", "tuition", "college"],
    to: "/programs#scholarship",
    reply:
      "The JOSHWAY Scholarship at Northampton Community College supports students with financial need who have overcome adversity and show interest in the arts or skilled trades. Funds can go toward tuition, books, transportation, or childcare.",
  },
  {
    phrases: ["volunteer", "mentor", "mentoring", "help out", "share my time", "donate my time"],
    to: "/volunteer",
    reply:
      "Mentors, artists, and technology experts sit with young people while they practice a skill. I’ll take you to the volunteer form.",
  },
  {
    phrases: ["donat", "gift", "giving", "contribute", "contribution", "tax deductible", "501"],
    to: "/donate",
    reply:
      "Gifts support life skills, digital wellness, the Creative Lab, and the NCC scholarship. JOSHWAY is a 501(c)(3). I’ll open the giving page. The form there does not process a payment.",
  },
  {
    phrases: ["digital diet", "screen time", "social media", "digital wellness", "mindfulness"],
    to: "/programs#digital-diet",
    reply:
      "The Digital Diet helps youth and educators look at digital habits, set boundaries, and use technology to create. Sessions run about 90 minutes at the Lab or at a school.",
  },
  {
    phrases: ["creative lab", "3d print", "podcast", "coding", "video game", "comic"],
    to: "/programs#creative-lab",
    reply:
      "The Creative Lab is at 913 Northampton Street. Young people make music, podcasts, comics, photos, code, and 3D prints there.",
  },
  {
    phrases: ["forward", "internship", "for my business", "for a business", "hire students", "build a website", "build an app"],
    to: "/forward",
    reply:
      "JOSHWAY Forward pairs local students with Lehigh Valley businesses and nonprofits. They build real apps, websites, and workflows with a senior engineer on the team.",
  },
  {
    phrases: ["market for kids", "market", "entrepreneur", "sell what", "booth", "kids market"],
    to: "/market",
    reply:
      "A Market for Kids is run by entrepreneurs ages 5 to 17. They make something, price it, and sell it to real customers.",
  },
  {
    phrases: ["arcade", "play a game", "video games", "games", "game"],
    to: "/arcade",
    reply: "The Arcade is where you can play games young people built with JOSHWAY, including Money Dash, Budget Quest, and Racing Josh.",
  },
  {
    phrases: ["event", "events", "workshop", "workshops", "calendar", "upcoming", "next session", "when is"],
    to: "/events",
    reply: () => {
      const next = events[0];
      const list = events.map((item) => `${item.title} (${item.when})`).join("; ");
      return `Next up is ${next.title}, ${next.when}, at ${next.where}. Also on the calendar: ${list}.`;
    },
  },
  {
    phrases: ["program", "programs", "life skills", "bridge", "class", "classes", "ages", "middle school", "high school"],
    to: "/programs",
    reply:
      "Programs are for ages 8 to 18, with a focus on middle and high school. They cover life skills, the Youth Leadership Bridge, the Creative Lab, and The Digital Diet.",
  },
  {
    phrases: ["visionary", "visionaries", "impact", "student stories", "the youth", "young people"],
    to: "/impact",
    reply: "Impact introduces young visionaries such as Isaias, Ayeika, Cam, Jamison, Daniel, and Peter. Ask me about one of them by name.",
  },
  {
    phrases: ["partner", "partners", "sponsor", "sponsorship", "advisory board", "board"],
    to: "/partners",
    reply: "The partners page lists the sponsors and advisory board behind JOSHWAY.",
  },
  {
    phrases: ["newsletter", "mailing list", "email updates", "stay up to date", "sign up"],
    to: "/newsletter",
    reply: "The newsletter is how you follow workshops and what young people are building. I’ll open the signup.",
  },
  {
    phrases: ["contact", "email", "phone", "address", "where are you", "where is the lab", "location", "directions", "visit the lab", "northampton"],
    to: "/contact",
    reply: "The Lab is at 913 Northampton Street, Easton, PA 18042. Email info@joshway.org, or send a note on the contact page.",
  },
  {
    phrases: ["about", "mission", "vision", "founded", "josh robertson", "who is josh", "who are you", "your story", "the story"],
    to: "/about",
    reply:
      "JOSHWAY was founded in 2023 in memory of Josh Robertson, so no young person has to feel invisible. The mission is life skills, self-confidence, and digital literacy for young people in Easton.",
  },
];

const fallback =
  "Tell me what you’re looking for in your own words. I can point you to programs, events, the lab, giving, volunteering, the Arcade, or a tour.";

export function answerQuestion(raw) {
  const text = normalize(raw);
  if (!text) return { reply: fallback };

  if (/^(hi|hey|hello|yo|thanks|thank you|good morning|good afternoon|good evening)$/.test(text)) {
    return {
      reply: "Hey! Tell me what you’re looking for, like a workshop, a way to give, or how to visit the lab.",
    };
  }

  const person = youth.find((item) => mentions(text, item.name));
  if (person) {
    return { reply: person.text, to: "/impact" };
  }

  const game = games.find((item) => mentions(text, item.name));
  if (game) {
    return { reply: `${game.name}: ${game.blurb}`, to: "/arcade" };
  }

  const event = events.find((item) => mentions(text, item.title));
  if (event) {
    return {
      reply: `${event.title} is ${event.when} at ${event.where}. ${event.text}`,
      to: "/events",
    };
  }

  let best = null;
  let bestScore = 0;
  for (const topic of topics) {
    const score = topic.phrases.reduce((sum, phrase) => {
      const needle = normalize(phrase);
      if (!text.includes(needle)) return sum;
      return sum + needle.split(" ").length + 1;
    }, 0);
    if (score > bestScore) {
      best = topic;
      bestScore = score;
    }
  }

  if (!best) return { reply: fallback };

  const reply = typeof best.reply === "function" ? best.reply() : best.reply;
  return { reply, to: best.to, tour: best.tour };
}
