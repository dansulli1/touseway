import { advisors, board, events, games, youth } from "./data";

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

function memberReply(name, role, group) {
  if (role === "Board Member" || role === "Advisory Board") {
    return `${name} serves on the JOSHWAY ${group}.`;
  }
  return `${name}, ${role}, serves on the JOSHWAY ${group}.`;
}

const people = [
  ...youth.map((person) => ({
    name: person.name,
    aliases: person.name === "Cam" ? ["Camden"] : [],
    to: "/impact",
    reply: person.text,
  })),
  ...board.map(([name, role]) => ({
    name,
    aliases: [],
    to: "/partners",
    reply: memberReply(name, role, "Board of Directors"),
  })),
  ...advisors.map(([name, role]) => ({
    name,
    aliases: [],
    to: "/about",
    reply: memberReply(name, role, "Advisory Board"),
  })),
];

const firstNames = [
  "josh",
  ...people.flatMap((person) => normalize(person.name).split(" ").filter((part) => part.length >= 3).slice(0, 1)),
];

function nameScore(text, person) {
  const labels = [person.name, ...person.aliases];
  let best = 0;
  for (const label of labels) {
    const full = normalize(label);
    const parts = full.split(" ").filter((part) => part.length >= 3);
    if (!parts.length) continue;
    const fullHit = mentions(text, full) || (parts.length > 1 && parts.every((part) => mentions(text, part)));
    if (fullHit) {
      best = Math.max(best, 100 + full.length);
      continue;
    }
    const first = parts[0];
    const last = parts[parts.length - 1];
    const firstHit = mentions(text, first);
    const lastHit = parts.length > 1 && mentions(text, last);
    if (firstHit && lastHit) {
      best = Math.max(best, 80 + full.length);
      continue;
    }
    if (lastHit && !firstNames.some((name) => name !== first && mentions(text, name))) {
      best = Math.max(best, 40 + last.length);
      continue;
    }
    if (firstHit && parts.length === 1) best = Math.max(best, 30 + first.length);
    else if (firstHit && first.length >= 4) best = Math.max(best, 15 + first.length);
  }
  return best;
}

function answerPeople(text) {
  const scored = people
    .map((person) => ({ person, score: nameScore(text, person) }))
    .filter((item) => item.score > 0);
  if (!scored.length) return null;
  const top = Math.max(...scored.map((item) => item.score));
  const winners = scored.filter((item) => item.score === top).map((item) => item.person);
  const destinations = new Set(winners.map((person) => person.to));
  let to = [...destinations][0];
  if (destinations.size > 1) to = winners.some((person) => person.to === "/about") ? "/about" : "/partners";
  return { reply: winners.map((person) => person.reply).join(" "), to };
}

function describeEvent(event) {
  return `${event.title} is ${event.when} at ${event.where}. ${event.text}`;
}

const eventClues = [
  { event: events[0], clues: ["money smarts"], scheduleOnly: true },
  { event: events[1], clues: ["social media content creation", "social media"] },
  { event: events[2], clues: ["power users club", "think leaner", "work different", "live fuller"] },
];

function findEvent(text) {
  let best = null;
  let bestLen = 0;
  for (const clue of eventClues) {
    for (const phrase of clue.clues) {
      const needle = normalize(phrase);
      if (text.includes(needle) && needle.length > bestLen) {
        best = clue;
        bestLen = needle.length;
      }
    }
  }
  return best;
}

function asksWhen(text) {
  return /\b(when|what time|what day|what date|workshop|session)\b/.test(text);
}

function monthReply(monthName) {
  const list = events.filter((event) => event.month.toLowerCase().startsWith(monthName));
  return list.map(describeEvent).join(" ");
}

const boardList = board.map(([name, role]) => `${name} (${role})`).join("; ");
const advisorList = advisors.map(([name, role]) => `${name} (${role})`).join("; ");

const topics = [
  {
    phrases: ["show me around", "give me a tour", "walk me through", "start the tour", "tour"],
    tour: true,
  },
  {
    phrases: ["deadline", "deadlines", "may 15", "july 1", "first come", "when do i apply", "when can i apply", "when should i apply"],
    to: "/eitc",
    reply:
      "Renewing two-year EITC commitments generally apply from May 15. New applicants apply from July 1. Credits are awarded first-come, first-served, so applying early matters. After approval you typically have 60 days to make the gift.",
  },
  {
    phrases: ["who is eligible", "minimum contribution", "3 500", "3500", "750 000", "750000", "for profit"],
    unless: ["scholarship", "college"],
    to: "/eitc",
    reply:
      "An EITC gift has to come from a for-profit entity authorized to do business in Pennsylvania and subject to an eligible state tax. It also needs Pennsylvania-source income and to be current on federal and state taxes. The minimum contribution is $3,500 and the maximum annual credit is $750,000.",
  },
  {
    phrases: ["how eitc works", "how the tax credit works", "how does a business", "how do we start", "dced", "start an eitc"],
    to: "/eitc",
    reply:
      "Apply for the credit with PA DCED, then make the gift to JOSHWAY, usually within 60 days of approval, and submit JOSHWAY’s acknowledgement to the Commonwealth. Email info@joshway.org and the team can walk through the application, timing, and the acknowledgement your tax filing needs.",
  },
  {
    phrases: ["10 000", "10000", "ten thousand", "net cost"],
    to: "/eitc",
    reply:
      "On a $10,000 EITC gift, JOSHWAY receives the full $10,000. After a 90% credit, the net cost can be $1,000. Every dollar spent becomes ten dollars of youth impact.",
  },
  {
    phrases: ["two year", "one year", "75", "90"],
    requireAny: ["tax", "credit", "eitc", "pledge", "percent", "commitment"],
    to: "/eitc",
    reply:
      "A two-year EITC pledge is a 90% Pennsylvania income tax credit. A one-year gift is credited at 75%. The remaining share can count as a federal charitable deduction.",
  },
  {
    phrases: ["eitc", "tax credit", "educational improvement", "state tax"],
    to: "/eitc",
    reply:
      "Pennsylvania’s Educational Improvement Tax Credit lets for-profit businesses direct a gift to an approved educational nonprofit and receive a state tax credit. JOSHWAY is a registered Educational Improvement Organization. A two-year pledge is credited at 90%, and a one-year gift at 75%. The remaining share can count as a federal charitable deduction. Contributions help youth ages 8 to 18 get no-cost programs in financial literacy, leadership, wellness, digital balance, public speaking, and future readiness. The minimum gift is $3,500 and the maximum annual credit is $750,000. Renewals generally apply from May 15, and new applicants from July 1, first-come, first-served. On a $10,000 gift, JOSHWAY receives the full amount and the net cost after a 90% credit can be $1,000. Email info@joshway.org to start.",
  },
  {
    phrases: ["request the joshway bridge", "request the bridge", "bring the bridge", "bring the life skills"],
    to: "/contact",
    reply:
      "Request the JOSHWAY Bridge to bring the life skills and leadership track to your school or nonprofit. I’ll open the contact page so you can ask the team.",
  },
  {
    phrases: ["lab experience", "field trip", "garageband", "imovie", "swift playgrounds", "request a lab"],
    to: "/contact",
    reply:
      "A Lab Experience is a field trip for up to 20 kids, with GarageBand, iMovie, Swift Playgrounds, and more. Request it from the contact page.",
  },
  {
    phrases: ["request the digital diet", "request a digital diet", "digital diet workshop"],
    to: "/contact",
    reply:
      "You can request The Digital Diet as a workshop for educators, parents, and youth on healthier technology habits. I’ll open the contact page.",
  },
  {
    phrases: ["share your talents", "share my talents"],
    to: "/volunteer",
    reply:
      "Share Your Talents is the call for mentors, artists, and technology experts. I’ll open the volunteer form.",
  },
  {
    phrases: ["give to joshway", "fund another"],
    to: "/donate",
    reply:
      "Give to JOSHWAY funds another young person’s path to self-discovery and leadership. Gifts can support life skills, digital wellness, digital arts, or the NCC scholarship. The form on the giving page does not process a payment.",
  },
  {
    phrases: ["connect with joshway", "things i can do", "ways to help", "get involved"],
    to: "/impact",
    reply:
      "On Impact you can request the JOSHWAY Bridge for a school or nonprofit, request a Lab Experience for up to 20 kids, request The Digital Diet for educators, parents, and youth, share your talents as a mentor, or give to JOSHWAY. Ask me about any of those.",
  },
  {
    phrases: ["scholarship", "ncc scholarship", "northampton community college", "tuition"],
    to: "/programs#scholarship",
    reply:
      "The JOSHWAY Scholarship launched at Northampton Community College in 2023 and honors Josh’s life. It supports students with financial need who have overcome adversity and show interest in the arts or skilled trades. Funds can go toward tuition, books, transportation, or childcare.",
  },
  {
    phrases: ["self discovery", "self discovery report"],
    to: "/programs#digital-diet",
    reply:
      "Every Youth Leadership Bridge student takes the JOSHWAY Self Discovery Report, an assessment built on personality, strengths, and career-interest research. It includes step-by-step guidance and a look at the job market. Local talent recruiters then challenge those paths.",
  },
  {
    phrases: ["money smarts", "bank of america", "financial literacy"],
    to: "/programs#digital-diet",
    reply:
      "Money Smarts is a Youth Leadership Bridge pillar: financial literacy and digital confidence, including a Bank of America–powered simulation game. There is also a Money Smarts workshop on November 3, 4:30 pm to 5:30 pm, at 913 Northampton Street in Easton.",
  },
  {
    phrases: ["health and well being", "health well being", "nutrition", "substance"],
    to: "/programs#digital-diet",
    reply:
      "Health & Well Being is a Youth Leadership Bridge pillar. It covers mindfulness, nutrition, movement, and substance-use awareness.",
  },
  {
    phrases: ["speak up", "speak up and shine", "public speaking"],
    to: "/programs#digital-diet",
    reply:
      "Speak Up & Shine is a Youth Leadership Bridge pillar. It uses public speaking and creative thinking to strengthen confidence and leadership.",
  },
  {
    phrases: ["future ready", "career exposure", "recruiters"],
    to: "/programs#digital-diet",
    reply:
      "Future Ready is a Youth Leadership Bridge pillar: career exposure, the JOSHWAY Self Discovery Report, and conversations with local recruiters.",
  },
  {
    phrases: ["digital diet", "digital wellness", "screen time", "digital habits", "ethical ai"],
    to: "/programs#digital-diet",
    reply:
      "The Digital Diet reframes tech from a weight into a tool. It equips youth and educators to assess digital habits, set healthy boundaries, and reconnect beyond the screen. Certified instructors lead mindfulness, games, discussion, and safe, ethical AI education in 90-minute sessions, at the Lab or on site at a school or organization.",
  },
  {
    phrases: ["podcast network", "podcast", "wdiy", "fox sports"],
    to: "/programs#digital-diet",
    reply:
      "On the JOSHWAY Podcast Network, youth choose a topic, record on a smartphone, and produce a podcast with partners including WDIY and FOX Sports. The microphone is practice for communication, creativity, and leadership. Jamison, Daniel, and Peter make Before the Snap.",
  },
  {
    phrases: ["before the snap"],
    to: "/impact",
    reply:
      "Before the Snap is a podcast made with JOSHWAY. Jamison is learning to use his voice to inspire connection. Daniel, from Bayonne, focuses on filmmaking. Peter, from the Lehigh Valley, is learning to amplify other people’s stories.",
  },
  {
    phrases: ["youth leadership bridge", "leadership bridge", "five pillars", "the bridge"],
    to: "/programs#digital-diet",
    reply:
      "The Youth Leadership Bridge prepares middle schoolers for high school, and for everything after, through five pillars led by community experts. Money Smarts is financial literacy and a Bank of America simulation. Health & Well Being covers mindfulness, nutrition, movement, and substance-use awareness. Speak Up & Shine is public speaking and creative thinking. The Digital Diet builds practical tech skills for creation and purpose. Future Ready is career exposure, the Self Discovery Report, and conversations with local recruiters. Schools and nonprofits can request the Bridge from the contact page.",
  },
  {
    phrases: ["creative lab", "3d print", "3d printing", "comic", "music theory", "coding", "video game"],
    unless: ["field trip", "lab experience"],
    to: "/programs#creative-lab",
    reply:
      "The Creative Lab is JOSHWAY’s home at 913 Northampton Street in Easton, a safe space to lean into a creative side. Young people create and edit music, learn basic music theory, sketch and paint digitally, learn coding and simple apps, try podcasting, learn photography and video, 3D print, make comics, and design their own video games. What they finish can be played in the Arcade.",
  },
  {
    phrases: ["discover create", "discover create connect", "pathway forward"],
    to: "/programs",
    reply:
      "Programs move through four steps. Discover happens in classrooms, the Bridge, and Digital Wellness workshops. Create happens in the Creative Lab. Connect plugs a spark into JOSHWAY Forward, A Market for Kids, scholarships, internships, and peer teaching. Showcase shares the work through the Arcade and the Podcast Network.",
  },
  {
    phrases: ["forward", "internship", "for my business", "for a business", "hire students", "build a website", "build an app"],
    to: "/forward",
    reply:
      "JOSHWAY Forward pairs junior engineers from Lehigh Valley high schools and colleges with local businesses and nonprofits. They build apps, websites, and workflows, with a senior engineer on every team. A project moves from a discovery call to findings, a proposal, development, and launch support.",
  },
  {
    phrases: ["market for kids", "market", "entrepreneur", "sell what", "booth", "kids market"],
    unless: ["job market"],
    to: "/market",
    reply:
      "A Market for Kids is run by entrepreneurs ages 5 to 17. They launch a product, set a price, practice a pitch, and sell to real customers. Bracelets, baked treats, paintings, books, 3D prints, lemonade: if they can make it, there’s a table.",
  },
  {
    phrases: ["arcade", "play a game", "video games", "games", "game"],
    to: "/arcade",
    reply:
      "The Arcade is where you play games young people built in the Creative Lab. That includes Money Dash, Money Dash: Life Path, Budget Quest, Digital Liftoff, Racing Josh, KartEight, PenaltyNight, Valor, StarJosh, Vector '84, and Drop.",
  },
  {
    phrases: ["november"],
    to: "/events",
    reply: () => monthReply("november"),
  },
  {
    phrases: ["december"],
    to: "/events",
    reply: () => monthReply("december"),
  },
  {
    phrases: ["event", "events", "workshop", "workshops", "calendar", "upcoming", "next session"],
    to: "/events",
    reply: () =>
      `Upcoming workshops: ${events.map(describeEvent).join(" ")} Ask the team about bringing a workshop to you from the contact page.`,
  },
  {
    phrases: ["program", "programs", "life skills", "ages", "middle school", "high school", "8 to 18"],
    to: "/programs",
    reply:
      "We run the Youth Leadership Bridge for middle school life skills and leadership, the Creative Lab for hands-on making at 913 Northampton Street, and Digital Wellness through The Digital Diet for healthier technology habits. Programs serve ages 8 to 18, with a focus on middle and high school.",
  },
  {
    phrases: ["visionary", "visionaries", "impact", "student stories"],
    to: "/impact",
    reply:
      "Impact measures success through young people finding their voice—stories from Isaias, Ayeika, Cam, Jamison, Daniel, and Peter, including the Before the Snap podcast. From that page you can also request the Bridge, a Lab Experience, The Digital Diet, share your talents, or give.",
  },
  {
    phrases: ["advisory board", "advisors", "advisor"],
    to: "/about",
    reply: `The Advisory Board includes ${advisorList}. Ask me about any of them by name.`,
  },
  {
    phrases: ["board of directors", "the board", "who is on the board", "directors"],
    to: "/partners",
    reply: `The Board of Directors is ${boardList}. Ask me about any of them by name.`,
  },
  {
    phrases: ["partner", "partners", "sponsor", "sponsorship"],
    to: "/partners",
    reply: `Partners and sponsors back the work, and the partners page shows them alongside the board. The Board of Directors is ${boardList}. The Advisory Board is ${advisorList}.`,
  },
  {
    phrases: ["volunteer", "mentor", "mentoring", "help out", "share my time", "donate my time"],
    to: "/volunteer",
    reply:
      "Mentors, artists, and technology experts sit with a young person while they practice money, speaking, music, design, code, wellness, or just showing up. That’s the Share Your Talents path. I’ll open the volunteer form.",
  },
  {
    phrases: ["donat", "gift", "giving", "contribute", "contribution", "tax deductible", "501"],
    to: "/donate",
    reply:
      "A gift can go to leadership and life skills, digital wellness, digital arts, or the NCC scholarship. JOSHWAY is a 501(c)(3), Tax ID 88-4332763, and an approved Pennsylvania EITC organization. You can also mail a check to 913 Northampton Street, Easton, PA 18042, or ask about a legacy gift, stock, crypto, or a donor-advised fund. The form does not process a payment. Businesses can look at the EITC tax credit.",
  },
  {
    phrases: ["newsletter", "mailing list", "email updates", "stay up to date"],
    to: "/newsletter",
    reply: "The newsletter is how you follow workshops and what young people are building. I’ll open the signup.",
  },
  {
    phrases: ["contact", "email", "phone", "address", "where are you", "where is the lab", "location", "directions", "visit the lab", "northampton"],
    to: "/contact",
    reply:
      "The Lab is at 913 Northampton Street, Easton, PA 18042, in the West Ward. Email info@joshway.org, or send a note on the contact page about programs, a school visit, a gift, or a partnership.",
  },
  {
    phrases: ["what is joshway", "whats joshway", "what s joshway", "who is joshway"],
    to: "/",
    reply:
      "JOSHWAY is a nonprofit in Easton, PA that connects youth to real world opportunities, with a focus on life skills, self-confidence, and digital literacy. We show up in schools, after-school programs, and youth organizations so every young person has a pathway forward.",
  },
  {
    phrases: ["about", "mission", "vision", "founded", "josh robertson", "who is josh", "who are you", "your story", "the story"],
    to: "/about",
    reply:
      "JOSHWAY is a nonprofit in Easton, founded in 2023 in memory of Josh Robertson so no young person has to feel invisible. We connect young people to real world opportunities, with a focus on life skills, self-confidence, and digital literacy.",
  },
];

const fallback =
  "Tell me what you’re looking for. I can answer about the Creative Lab, The Digital Diet, the Podcast Network, the Youth Leadership Bridge, Money Smarts, events, a board or advisory member, Impact requests, or EITC giving.";

function topicScore(topic, text) {
  if (topic.unless?.some((phrase) => text.includes(normalize(phrase)))) return 0;
  if (topic.requireAny && !topic.requireAny.some((phrase) => text.includes(normalize(phrase)))) return 0;
  return topic.phrases.reduce((sum, phrase) => {
    const needle = normalize(phrase);
    if (!needle || !text.includes(needle)) return sum;
    return sum + needle.split(" ").length + 1;
  }, 0);
}

export function answerQuestion(raw) {
  const text = normalize(raw);
  if (!text) return { reply: fallback };

  if (/^(hi|hey|hello|yo|thanks|thank you|good morning|good afternoon|good evening)$/.test(text)) {
    return {
      reply: "Hey! Ask me about a program, a workshop, someone on the board, or how EITC giving works.",
    };
  }

  const person = answerPeople(text);
  if (person) return person;

  const game = games.reduce((best, item) => {
    if (!mentions(text, item.name)) return best;
    const size = normalize(item.name).length;
    if (!best || size > best.size) return { item, size };
    return best;
  }, null);
  if (game) return { reply: `${game.item.name}: ${game.item.blurb}`, to: "/arcade" };

  const eventHit = findEvent(text);
  if (eventHit && (!eventHit.scheduleOnly || asksWhen(text))) {
    return { reply: describeEvent(eventHit.event), to: "/events" };
  }

  let best = null;
  let bestScore = 0;
  for (const topic of topics) {
    const score = topicScore(topic, text);
    if (score > bestScore) {
      best = topic;
      bestScore = score;
    }
  }

  if (best) {
    const reply = typeof best.reply === "function" ? best.reply() : best.reply;
    return { reply, to: best.to, tour: best.tour };
  }

  return { reply: fallback };
}
