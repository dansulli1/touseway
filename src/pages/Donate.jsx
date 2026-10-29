import { Link } from "react-router-dom";
import Form from "../components/Form";
import PageHero from "../components/PageHero";
import { gifts } from "../data";

export default function Donate() {
  return (
    <>
      <PageHero
        image="/media/donate.webp"
        title="Every young person deserves to be seen."
        lede="Your gift puts a mentor, a microphone, and a real plan in front of a young person who needs one."
      />
      <section className="wrap prose two">
        <div>
          <h2>Where your gift goes</h2>
          <ul className="checks">
            {gifts.map((gift) => <li key={gift}>{gift}</li>)}
          </ul>
          <ul>
            <li>JOSHWAY is a 501(c)(3) nonprofit, Tax ID 88-4332763</li>
            <li>Your gift is tax-deductible to the extent allowed by law</li>
            <li>Approved Pennsylvania EITC organization</li>
          </ul>
          <h2>Other ways to give</h2>
          <div className="cards" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <article className="card"><h3>Mail a check</h3><p>Payable to JOSHWAY, 913 Northampton Street, Easton, PA 18042.</p></article>
            <article className="card"><h3>Donate your time</h3><p><Link className="link" to="/volunteer">Volunteer with us.</Link></p></article>
            <article className="card"><h3>Leave a legacy</h3><p><Link className="link" to="/contact">Talk with us about legacy giving.</Link></p></article>
            <article className="card"><h3>Stock, crypto, or DAF</h3><p>Ask your employer about a match, too. <Link className="link" to="/contact">Give now.</Link></p></article>
          </div>
          <p>Pennsylvania businesses can receive up to 90% back as a state tax credit. <Link className="link" to="/eitc">See how EITC giving works.</Link></p>
        </div>
        <Form
          intro="Tell us how you’d like to give and someone from the team will follow up. This form stays on your computer. It does not process a payment."
          fields={[
            { name: "name", label: "Name", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            { name: "area", label: "Impact area", type: "select", required: true, options: gifts },
            { name: "note", label: "How would you like to help?", type: "textarea", required: true },
          ]}
          submitLabel="Start a gift"
          success="Thank you for wanting to give. Email info@joshway.org or mail a check to 913 Northampton Street, Easton, PA 18042, and the team will confirm the gift."
        />
      </section>
    </>
  );
}
