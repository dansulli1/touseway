import { Link } from "react-router-dom";
import Form from "../components/Form";
import PageHero from "../components/PageHero";

export default function Market() {
  return (
    <>
      <PageHero
        image="/media/programs.webp"
        title="Every young person has something to offer the world."
        lede="A Market for Kids brings markets run entirely by kids to the Lehigh Valley."
      />
      <section className="wrap prose">
        <p>
          Young entrepreneurs ages 5 to 17 launch a business, set up a booth, and sell what they create to real customers, for real money. A first pitch. A first handshake. A first dollar earned.
        </p>
        <div className="cards">
          <article className="card"><h3>The young people run it</h3><p>They set up the booth, greet every customer, and count the change. The grown-ups step back.</p></article>
          <article className="card"><h3>Not one day. A pathway.</h3><p>A season of markets becomes a habit. A new product. A sharper pitch. A little more courage.</p></article>
          <article className="card"><h3>What they’ll sell</h3><p>Bracelets, baked treats, paintings, books, 3D prints, lemonade. If they can make it, there’s a table.</p></article>
        </div>
        <h2>From idea to sale</h2>
        <ol className="steps">
          <li><strong>Sign up.</strong> Register for an upcoming market.</li>
          <li><strong>Get ready.</strong> Plan the product, set the price, practice the pitch.</li>
          <li><strong>Brand, build, price, and market it.</strong></li>
          <li><strong>Set up and sell.</strong> On market day, the booth is theirs.</li>
          <li><strong>Celebrate and come back.</strong> Count the earnings and plan the next one.</li>
        </ol>
        <p>Many entrepreneurs first find their spark in <Link className="link" to="/programs">JOSHWAY programs</Link>.</p>
      </section>
      <section className="band">
        <div className="wrap prose two">
          <div>
            <h2>Be the first to know</h2>
            <p>We’ll reach out when registration opens. We only collect a parent or guardian’s contact information.</p>
          </div>
          <Form
            fields={[
              { name: "name", label: "Parent or guardian name", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "ages", label: "Ages of the young entrepreneurs in your family" },
            ]}
            submitLabel="Join the list"
            success="You’re on the list. We’ll write when the next market date is ready."
          />
        </div>
      </section>
    </>
  );
}
