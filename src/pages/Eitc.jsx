import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";

const faqs = [
  ["What is the EITC program?", "Pennsylvania’s Educational Improvement Tax Credit lets for-profit businesses direct contributions to approved educational nonprofits, including JOSHWAY, and receive a state tax credit of up to 90% with a two-year commitment."],
  ["Who is eligible?", "A for-profit entity authorized to do business in Pennsylvania and subject to an eligible state tax. The minimum contribution is $3,500 and the maximum annual credit is $750,000."],
  ["What are the deadlines?", "Renewing two-year commitments generally apply from May 15. New applicants apply from July 1. Credits are awarded first-come, first-served, so applying early matters."],
  ["How does a business start?", "Email info@joshway.org. The team can walk through the DCED application, contribution timing, and the acknowledgement your tax filing needs."],
];

export default function Eitc() {
  return (
    <>
      <PageHero image="/media/donate.webp" title="Support JOSHWAY and receive a tax credit" lede="You could earn a 90% Pennsylvania tax credit and keep those dollars with local youth." />
      <section className="wrap prose">
        <p>
          The Educational Improvement Tax Credit allows donors to claim up to a 90% state income tax credit for a gift to an approved Educational Improvement Organization. JOSHWAY is a registered EIO. Contributions help youth ages 8–18 access no-cost programs in financial literacy, leadership, wellness, digital balance, public speaking, and future readiness.
        </p>
        <div className="cards">
          <article className="card"><p className="big-stat">90%</p><p>Pennsylvania income tax credit with a two-year pledge. A one-year gift is credited at 75%.</p></article>
          <article className="card"><p className="big-stat">10%</p><p>The remaining share can count as a federal charitable deduction.</p></article>
          <article className="card"><h3>JOSHWAY</h3><p>Youth programs across the Lehigh Valley, instead of general state revenue.</p></article>
        </div>
        <h2>Example: a $10,000 gift</h2>
        <p>JOSHWAY receives the full $10,000. After a 90% credit, the net cost can be $1,000. Every dollar spent becomes ten dollars of youth impact.</p>
        <h2>How it works</h2>
        <ol className="steps">
          <li>Apply for the credit with PA DCED.</li>
          <li>Get approved. You typically have 60 days to make the gift.</li>
          <li>Direct your gift to JOSHWAY and submit the acknowledgement to the Commonwealth.</li>
        </ol>
        <h3>Eligibility</h3>
        <ul>
          <li>Pennsylvania-source income</li>
          <li>A Pennsylvania-taxpaying entity or individual</li>
          <li>Current on federal and state taxes</li>
        </ul>
        <p><Link className="btn" to="/contact">Talk with JOSHWAY about an EITC gift</Link></p>
        <h2>FAQs</h2>
        <div className="faq">
          {faqs.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
