import { Link } from "react-router-dom";
import Form from "../components/Form";
import PageHero from "../components/PageHero";

const steps = [
  ["Reach Out", "Tell us about your organization and what you need."],
  ["Discovery Call", "A junior forward deployed engineer learns your goals and drafts a scope of work."],
  ["Findings and Ideas", "We come back with what we learned and how we can help."],
  ["Proposal", "When you are ready, you receive a proposal for the work."],
  ["Development", "Upon approval, the team builds the solution."],
  ["Deployment and Support", "We handle launch, integration, and ongoing support."],
];

export default function Forward() {
  return (
    <>
      <PageHero
        image="/media/connect.jpg"
        title="The future of the Lehigh Valley is being built here."
        lede="Local students build real technology for local businesses and nonprofits."
      />
      <section className="wrap prose">
        <p>
          The talent is already in our classrooms. The need is already in our businesses and nonprofits. What has been missing is the bridge. In Pennsylvania, only 23% of two-year college students complete a paid internship. JOSHWAY Forward is that bridge.
        </p>
        <p>
          Junior forward deployed engineers come from colleges and high schools across the Lehigh Valley. They sit with real customers, listen, and build alongside them, with a senior JOSHWAY engineer watching every team.
        </p>
        <div className="cards">
          <article className="card"><h3>For businesses and nonprofits</h3><p>A custom app, a process that eats hours, or a website that finally works. We build what you actually need.</p></article>
          <article className="card"><h3>For students</h3><p>Real clients, real problems, and a portfolio that opens doors.</p></article>
          <article className="card"><h3>For the Valley</h3><p>Every project keeps talent local and moves the region closer to being a tech hub.</p></article>
        </div>
        <h2>How a project moves</h2>
        <ol className="steps">
          {steps.map(([title, text]) => <li key={title}><strong>{title}.</strong> {text}</li>)}
        </ol>
        <p>It starts in <Link className="link" to="/programs">our programs</Link>, and you can play what young people have already built in the <Link className="link" to="/arcade">Arcade</Link>.</p>
      </section>
      <section className="band">
        <div className="wrap prose two">
          <div>
            <h2>Bring JOSHWAY Forward to your organization</h2>
            <p>Tell us a little about your work and a junior engineer will reach out to set up a discovery call.</p>
          </div>
          <Form
            fields={[
              { name: "name", label: "Name", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "org", label: "Organization", required: true },
              { name: "need", label: "What do you need help with?", type: "textarea", required: true },
            ]}
            submitLabel="Request a discovery call"
            success="We received your note. A member of the JOSHWAY Forward team will be in touch."
          />
        </div>
      </section>
    </>
  );
}
