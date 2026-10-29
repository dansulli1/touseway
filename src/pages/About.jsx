import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { advisors, board, letters } from "../data";

export default function About() {
  return (
    <>
      <PageHero
        image="/media/about.webp"
        title="About JOSHWAY"
        lede="Founded in 2023 in memory of Josh Robertson, so no young person has to feel invisible."
      />
      <section className="wrap prose">
        <p>
          Josh’s struggles with mental health and addiction became the inspiration for a brighter future for others. Out of loss came purpose. In just a few years, JOSHWAY has grown from a family vision into a partner for schools, local leaders, United Way, and Pennsylvania businesses through EITC certification. In 2026, JOSHWAY became a federally registered trademark, so Josh’s name stands for opportunity.
        </p>
        <p>While the story began with one family, it has become a movement to give every child the chance to thrive in confidence, resilience, and hope.</p>
        <h2>Our Mission</h2>
        <p>
          JOSHWAY connects young people to real world opportunities, with a focus on life skills, self-confidence, and digital literacy, so every young person has the access and opportunity to discover their path and pursue it with purpose.
        </p>
        <h2>Our Vision</h2>
        <p>We envision a community where every young person is the hero of their own story: self-aware, confident, and thriving in their life’s purpose.</p>
      </section>
      <section className="band">
        <div className="wrap prose">
          <div className="letters">
            {letters.map(([title, text]) => (
              <article className="letter" key={title}>
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="wrap prose">
        <h2>Our Theory of Change</h2>
        <p>JOSHWAY guides and tracks youth through an outcomes-based approach.</p>
        <div className="cards">
          <article className="card">
            <h3>Short-Term Self-Investment</h3>
            <p>Youth earn certificates and confidence, grow in digital wellbeing, discover a growth mindset, and gain practical life skills.</p>
          </article>
          <article className="card">
            <h3>Mid-Term Pledge of Purpose</h3>
            <p>They act on their JOSHWAY Pledge by volunteering, launching projects, starting podcasts, or exploring early college and trades.</p>
          </article>
          <article className="card">
            <h3>Long-Term Opportunity</h3>
            <p>They sustain pathways to college, internships, entrepreneurship, and peer leadership, with healthier habits and resilience.</p>
          </article>
        </div>
        <h2>We blend purpose, tech, and heart.</h2>
        <p>When purpose, tech, and heart come together, we don’t just educate. We activate young leaders.</p>
        <h2>Board of Directors</h2>
        <div className="people">
          {board.map(([name, role]) => (
            <article className="person" key={name}>
              <h3>{name}</h3>
              <p className="muted">{role}</p>
            </article>
          ))}
        </div>
        <h2>Advisory Board</h2>
        <div className="people">
          {advisors.map(([name, role]) => (
            <article className="person" key={name}>
              <h3>{name}</h3>
              <p className="muted">{role}</p>
            </article>
          ))}
        </div>
        <p style={{ marginTop: 28 }}>
          <Link className="btn" to="/donate">Fuel the next pathway</Link>
        </p>
      </section>
    </>
  );
}
