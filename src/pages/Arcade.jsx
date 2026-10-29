import { Link } from "react-router-dom";
import Form from "../components/Form";
import PageHero from "../components/PageHero";
import { games } from "../data";

export default function Arcade() {
  return (
    <>
      <PageHero
        image="/media/logo-circle.png"
        title="These games were built with young people."
        lede="Their ideas. Their characters. Their worlds. Eleven games, free for anyone to play."
      />
      <section className="wrap prose">
        <h2>It started with a question.</h2>
        <p>What if young people stopped just playing games, and started building them? In the Creative Lab they dream up the story, design the characters, test every level, and watch something from their imagination come to life.</p>
        <div className="cards">
          <article className="card"><h3>Dream it</h3><p>They pick the world, the hero, and the challenge.</p></article>
          <article className="card"><h3>Design it</h3><p>They sketch characters, map levels, and decide how the game should feel.</p></article>
          <article className="card"><h3>Build it</h3><p>Alongside facilitators and modern creative tools, they test it until it works.</p></article>
        </div>
        <h2>Now playing</h2>
        <div className="game-grid">
          {games.map((game) => (
            <article className="game" key={game.name}>
              <h3>{game.name}</h3>
              <p>{game.blurb}</p>
            </article>
          ))}
        </div>
        <p style={{ marginTop: 20 }}>Ready to go further? <Link className="link" to="/forward">JOSHWAY Forward</Link> puts those skills to work for real organizations. It starts in <Link className="link" to="/programs">our programs</Link>.</p>
      </section>
      <section className="band">
        <div className="wrap prose two">
          <div>
            <h2>Want your young people to build the next one?</h2>
            <p>Schools, after-school programs, youth organizations, and families. They leave with a playable game, digital skills, and the confidence that comes from making something real.</p>
          </div>
          <Form
            fields={[
              { name: "name", label: "Your name", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "who", label: "Who are the young people?", type: "textarea", required: true },
            ]}
            submitLabel="Start a conversation"
            success="Thanks. We’ll be in touch about bringing the Creative Lab to your young people."
          />
        </div>
      </section>
    </>
  );
}
