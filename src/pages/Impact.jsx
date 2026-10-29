import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { youth } from "../data";

const asks = [
  ["Request the JOSHWAY Bridge", "Bring the life skills and leadership track to your school or nonprofit.", "/contact"],
  ["Request a Lab Experience", "A field trip for up to 20 kids: GarageBand, iMovie, Swift Playgrounds, and more.", "/contact"],
  ["Request The Digital Diet™", "A workshop for educators, parents, and youth on healthier technology habits.", "/contact"],
  ["Share Your Talents", "Mentors, artists, and technology experts are always welcome.", "/volunteer"],
  ["Give to JOSHWAY", "Fund another young person’s path to self-discovery and leadership.", "/donate"],
];

export default function Impact() {
  return (
    <>
      <PageHero image="/media/isaias.webp" title="JOSHWAY’s Young Visionaries" lede="We measure success through the young people who find their voice." />
      <section className="wrap prose">
        <h2>Meet the next generation of changemakers</h2>
        <div className="cards">
          {youth.map((person) => (
            <article className="card" key={person.name}>
              <h3>{person.name}</h3>
              <p>{person.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="band">
        <div className="wrap prose">
          <h2>Connect with JOSHWAY</h2>
          <div className="cards">
            {asks.map(([title, text, to]) => (
              <article className="card" key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
                <Link className="link" to={to}>Get started</Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
