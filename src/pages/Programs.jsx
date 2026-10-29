import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";

const labSkills = [
  "Create and edit music tracks",
  "Learn basic music theory and composition",
  "Practice digital sketching and painting",
  "Learn foundational coding skills",
  "Create basic apps and programs",
  "Try their voice at podcasting",
  "Learn photography and video editing",
  "Design and build with 3D printing",
  "Create comic books and digital designs",
  "Design and build their own video games",
];

const bridge = [
  ["Money Smarts", "Financial literacy and digital confidence, including a Bank of America–powered simulation game."],
  ["Health & Well Being", "Mindfulness, nutrition, movement, and substance-use awareness."],
  ["Speak Up & Shine", "Public speaking and creative thinking that strengthen confidence and leadership."],
  ["The Digital Diet™", "Practical tech skills that let youth use technology for creation and purpose."],
  ["Future Ready", "Career exposure, the JOSHWAY Self Discovery Report, and conversations with local recruiters."],
];

export default function Programs() {
  return (
    <>
      <PageHero
        image="/media/programs.webp"
        title="Digital Literacy and Life Skills Programs"
        lede="Real world opportunities start here."
      />
      <section className="wrap prose">
        <h2>Today’s youth are growing up in a digital pressure chamber.</h2>
        <div className="stats" style={{ paddingTop: 12 }}>
          {[
            ["Persistent sadness", "A majority of teens"],
            ["Considered suicide", "Too many, too young"],
            ["Lose sleep to devices", "Nights given to screens"],
            ["Excessive tech use", "Already needing support"],
          ].map(([title, text]) => (
            <article key={title}>
              <h3 style={{ fontSize: 20 }}>{title}</h3>
              <p className="muted">{text}</p>
            </article>
          ))}
        </div>
        <p>
          JOSHWAY meets that moment inside schools and youth organizations, building life skills, self-confidence, and digital literacy, then connecting young people to what comes next. We reach ages 8 to 18, with a focus on middle and high school.
        </p>
        <div className="cards" id="bridge">
          {[
            ["Discover", "In classrooms, the Bridge, and Digital Wellness workshops, we help them find their project."],
            ["Create", "In the Creative Lab, they get hands on with podcasts, 3D printing, design, comics, and video games."],
            ["Connect", "We plug a spark into JOSHWAY Forward, A Market for Kids, scholarships, internships, and peer teaching."],
            ["Showcase", "We share what they make, from the JOSHWAY Arcade to the Podcast Network."],
          ].map(([title, text]) => (
            <article className="card" key={title}><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <section className="band" id="creative-lab">
        <div className="wrap prose">
          <h2>Creative Lab</h2>
          <p>Our home at 913 Northampton Street in Easton. A safe space where young people lean into their creative side.</p>
          <ul>
            {labSkills.map((skill) => <li key={skill}>{skill}</li>)}
          </ul>
          <p><Link className="link" to="/arcade">See what they have built in the Arcade.</Link></p>
        </div>
      </section>

      <section className="wrap prose" id="digital-diet">
        <h2>The Digital Diet™</h2>
        <p>
          We reframe tech from a weight into a tool. The Digital Diet™ equips youth and educators to assess digital habits, set healthy boundaries, and reconnect beyond the screen. Certified instructors lead mindfulness, games, discussion, and safe, ethical AI education in 90-minute sessions, at the Lab or on site at a school or organization.
        </p>
        <h2>JOSHWAY Podcast Network</h2>
        <p>
          Youth learn to choose a topic, record on a smartphone, and produce a podcast for the JOSHWAY Podcast Network and partners including WDIY and FOX Sports. The microphone is practice for communication, creativity, and leadership.
        </p>
        <h2>The Youth Leadership Bridge</h2>
        <p>Preparing middle schoolers for high school, and for everything after, through five pillars led by community experts.</p>
        <div className="cards">
          {bridge.map(([title, text]) => (
            <article className="card" key={title}><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
        <h3>The JOSHWAY Self Discovery Report</h3>
        <p>
          Every Bridge student takes an assessment built on personality, strengths, and career-interest research. The report includes step-by-step guidance and a look at the job market. Local talent recruiters then challenge those paths. High school goes fast. We want every student to walk in with a plan.
        </p>
      </section>

      <section className="band" id="scholarship">
        <div className="wrap prose">
          <h2>Where it leads</h2>
          <div className="cards">
            <article className="card">
              <h3>JOSHWAY Forward</h3>
              <p>Students build apps, websites, and workflows for Lehigh Valley businesses, backed by a senior engineer.</p>
              <Link className="link" to="/forward">Explore Forward</Link>
            </article>
            <article className="card">
              <h3>A Market for Kids</h3>
              <p>Markets run by young entrepreneurs ages 5 to 17, selling what they make to real customers.</p>
              <Link className="link" to="/market">Explore the Market</Link>
            </article>
            <article className="card">
              <h3>The JOSHWAY Scholarship at NCC</h3>
              <p>
                Launched at Northampton Community College in 2023, the scholarship honors Josh’s life. It supports students with financial need who have overcome adversity and show interest in the arts or skilled trades. Funds can go toward tuition, books, transportation, or childcare.
              </p>
            </article>
          </div>
          <p style={{ marginTop: 24 }}><Link className="btn" to="/donate">Help us build bridges</Link></p>
        </div>
      </section>
    </>
  );
}
