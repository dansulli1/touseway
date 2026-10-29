import PageHero from "../components/PageHero";
import { board, partners } from "../data";

export default function Partners() {
  return (
    <>
      <PageHero
        image="/media/board.webp"
        title="Sponsors & Advisory Board"
        lede="JOSHWAY wouldn’t be possible without the partners and advisors who stand with us for kids’ futures."
      />
      <section className="wrap prose">
        <h2>Board of Directors</h2>
        <div className="people">
          {board.map(([name, role]) => (
            <article className="person" key={name}>
              <h3>{name}</h3>
              <p className="muted">{role}</p>
            </article>
          ))}
        </div>
        <h2>JOSHWAY Gratitude</h2>
        <p>They’re collaborators fueling ideas, resources, and hope for the next generation.</p>
        <div className="ig-grid" style={{ marginTop: 20 }}>
          {partners.map((src) => (
            <div key={src} style={{ background: "#fff", border: "1px solid #e6e6e6", borderRadius: 12, padding: 12 }}>
              <img src={src} alt="" style={{ height: 100, width: "100%", objectFit: "contain" }} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
