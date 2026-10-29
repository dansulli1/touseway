export const nav = [
  {
    label: "About",
    items: [
      { to: "/about", title: "About Us", desc: "Our story and why JOSHWAY exists" },
      { to: "/impact", title: "Our Impact", desc: "The difference young people are making" },
      { to: "/partners", title: "Our Partners", desc: "The community behind the mission" },
      { to: "/eitc", title: "EITC Giving", desc: "Turn your state taxes into opportunity" },
    ],
  },
  {
    label: "Programs",
    items: [
      {
        to: "/programs",
        title: "Our Programs",
        desc: "The Bridge, the Creative Lab, and Digital Wellness",
      },
      { to: "/events", title: "Events", desc: "Workshops and gatherings near you" },
    ],
  },
  {
    label: "Opportunities",
    items: [
      { to: "/forward", title: "JOSHWAY Forward", desc: "Real projects for local businesses" },
      { to: "/market", title: "A Market for Kids", desc: "Where young entrepreneurs sell what they make" },
      {
        to: "/programs#scholarship",
        title: "The JOSHWAY Scholarship",
        desc: "Support for students at Northampton Community College",
      },
    ],
  },
];

export const stats = [
  { value: 49, suffix: "+", label: "Core life skills taught in the community and at the JOSHWAY Lab in Easton, PA" },
  { value: 12, suffix: "+", label: "Organizations and schools supported by JOSHWAY" },
  { value: 525, suffix: "+", label: "Teens and tweens connected through JOSHWAY opportunities" },
  { value: 90, suffix: "%", label: "of JOSHWAY youth reporting greater confidence and resilience" },
];

export const pillars = [
  {
    title: "Discover",
    image: "/media/diet.webp",
    text: "We meet young people in classrooms, the JOSHWAY Bridge, and Digital Wellness workshops, home of The Digital Diet™. This is where they find their project, and where we find their spark.",
    link: "Explore our programs",
    to: "/programs#bridge",
  },
  {
    title: "Create",
    image: "/media/lab-exp.webp",
    text: "In the Creative Lab at 913 Northampton Street, young people get hands on with technology and create with intention. Podcasts, 3D printing, music, film, comics, and video games.",
    link: "Inside the Creative Lab",
    to: "/programs#creative-lab",
  },
  {
    title: "Connect",
    image: "/media/connect.jpg",
    text: "When we see a spark, we plug them into real world opportunities: JOSHWAY Forward, A Market for Kids, scholarships, internships, and teaching their peers. Nothing builds confidence like leading the room.",
    links: [
      { label: "JOSHWAY Forward", to: "/forward" },
      { label: "A Market for Kids", to: "/market" },
      { label: "scholarships", to: "/programs#scholarship" },
    ],
  },
  {
    title: "Showcase",
    image: "/media/showcase.jpg",
    text: "We share what young people make with the world. Play the games they built in the JOSHWAY Arcade, and hear their voices on the JOSHWAY Podcast Network.",
    link: "Visit the Arcade",
    to: "/arcade",
  },
];

export const news = [
  {
    outlet: "WFMZ",
    title: "Bringing mentorship and life skills to Easton’s West Ward",
    image: "/media/news-wfmz.webp",
  },
  {
    outlet: "WDIY",
    title: "David Robertson on family, grief, and guiding youth toward purpose",
    image: "/media/news-wdiy.webp",
  },
  {
    outlet: "PBS39",
    title: "Turning grief into purpose for Lehigh Valley youth",
    image: "/media/news-pbs.webp",
  },
  {
    outlet: "WFMZ",
    title: "Connecting schools and community centers to raise confident innovators",
    image: "/media/news-wfmz2.webp",
  },
  {
    outlet: "Northampton Community College",
    title: "A scholarship partnership for students overcoming adversity",
    image: "/media/news-ncc.webp",
  },
];

export const partners = Array.from({ length: 16 }, (_, i) => `/media/p${i + 1}.webp`);

export const posts = [
  { src: "/media/ig1.webp", date: "Oct 28" },
  { src: "/media/ig2.webp", date: "Oct 25" },
  { src: "/media/ig3.webp", date: "Oct 23" },
  { src: "/media/ig4.webp", date: "Oct 23" },
  { src: "/media/ig5.webp", date: "Oct 21" },
  { src: "/media/ig6.webp", date: "Oct 20" },
  { src: "/media/ig7.webp", date: "Oct 19" },
  { src: "/media/ig8.webp", date: "Oct 17" },
  { src: "/media/ig9.webp", date: "Oct 16" },
  { src: "/media/ig10.webp", date: "Oct 15" },
];

export const gifts = [
  "Leadership & Life Skills",
  "Digital Wellness & Self-Confidence",
  "Digital Arts & Creativity",
  "JOSHWAY's NCC Scholarship Fund",
];

export const games = [
  { name: "Money Dash", blurb: "A team quiz race through Money City. Every right answer gets your hero closer to the vault." },
  { name: "Money Dash: Life Path", blurb: "From school to retirement. Earn, save, handle surprise bills, and build your best life." },
  { name: "Budget Quest", blurb: "College, a first job, and real money decisions. Build savings and credit, and earn your certificate." },
  { name: "Digital Liftoff", blurb: "A two team rocket race to Planet JOSHWAY, fueled by smart choices about tech." },
  { name: "Racing Josh", blurb: "Answer questions on mindfulness and healthy tech to race your car to the flag." },
  { name: "KartEight", blurb: "Drift and boost your caped hero around Storybook Speedway." },
  { name: "PenaltyNight", blurb: "Aim, power up, and curl your shot past the keeper in a packed stadium." },
  { name: "Valor", blurb: "One hero against the Gloomwarden. Roll, parry, strike." },
  { name: "StarJosh", blurb: "Lead your squad in the Star Wing and take down the Gloom Carrier." },
  { name: "Vector '84", blurb: "Explore and trade across the galaxy, starting in a 1984 computer world." },
  { name: "Drop", blurb: "A music journey from lo-fi to Event Horizon. Build the tension, then let it drop." },
];

export const events = [
  {
    month: "November 2026",
    day: "Tue 3",
    title: "Money Smarts",
    when: "November 3 · 4:30 pm – 5:30 pm",
    where: "JOSHWAY, 913 Northampton St, Easton, PA",
    text: "Money decisions start long before adulthood. This session introduces the real side of earning, saving, and spending.",
  },
  {
    month: "November 2026",
    day: "Tue 10",
    title: "Social Media Content Creation",
    when: "November 10 · 4:15 pm – 5:15 pm",
    where: "JOSHWAY, 913 Northampton St, Easton, PA",
    text: "Don’t just consume content. Create with purpose. Social media as a tool for storytelling and leadership.",
  },
  {
    month: "December 2026",
    day: "Tue 8",
    title: "Think Leaner. Live Fuller. | Power Users Club",
    when: "December 8 · 11:00 am – 12:30 pm",
    where: "Ben Franklin Technology Partners, 116 Research Dr, Bethlehem, PA",
    text: "The first Power Users Club workshop, part of the Work Different series led by David Robertson of JOSHWAY.",
  },
];

export const youth = [
  { name: "Isaias", text: "A storyteller exploring sound, film, and connection. Through El Sistema and JOSHWAY, he’s discovering that purpose is created through storytelling, creativity, and uplifting the people around him." },
  { name: "Ayeika", text: "A proud Louis E. Dieruff graduate and lifelong El Sistema participant. She blends music with purpose and dreams of becoming a singer-songwriter while pursuing justice." },
  { name: "Cam", text: "Camden, 16, from Hellertown, brings energy to tennis, running, and gaming. Through JOSHWAY, he’s learning leadership means standing up for what matters." },
  { name: "Jamison", text: "A creator of the Before the Snap podcast. Through JOSHWAY, he’s learning leadership means using his voice to inspire connection." },
  { name: "Daniel", text: "A creator of Before the Snap from Bayonne, NJ. He brings focus to filmmaking and is learning to turn creative vision into stories that move people." },
  { name: "Peter", text: "A creator of Before the Snap from the Lehigh Valley. He’s learning leadership means amplifying voices and making space for stories that matter." },
];

export const board = [
  ["David Robertson", "Founder / President, JOSHWAY"],
  ["Dilia Coppedge", "Vice President, Nanny Loft"],
  ["Mackenzie Huber", "Treasurer, Shift4"],
  ["Robert Loftin", "Shift4"],
  ["Terry Riches", "Board Member"],
  ["Daniel Powder", "Board Member"],
  ["Greg Chajnacki", "Board Member"],
  ["Mariah Goodie", "Board Member"],
];

export const advisors = [
  ["Yusuf Dahl", "The Century Promise"],
  ["Seema Shah", "United Way of the Greater Lehigh Valley"],
  ["Eric Luftig", "Dorman Products"],
  ["David Carley", "PANGAEA Enterprises Group"],
  ["Glenn C. Breslauer", "Advisory Board"],
  ["Ashley Russo", "ASR Media Productions"],
  ["Jordan Frankel", "General Counsel"],
  ["Jennifer Perez", "Advisory Board"],
];

export const letters = [
  ["Joy", "Spreading joy through creative expression and community engagement"],
  ["Opportunity", "Opening doors through education and innovation"],
  ["Service", "Serving the community with gratitude and commitment"],
  ["Hope", "Inspiring hope and resilience in every young person"],
  ["Wisdom", "Encouraging wisdom through life skills and continuous learning"],
  ["Artistry", "Amplifying artistic talent as a tool for personal growth"],
  ["Youth", "Focusing on young people and nurturing their dreams"],
];
