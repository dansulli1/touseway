import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { events } from "../data";

export default function Events() {
  let month = "";
  return (
    <>
      <PageHero image="/media/lab.jpg" title="Events" lede="Workshops and gatherings where young people practice the skills they are building." />
      <section className="wrap prose">
        {events.map((event) => {
          const showMonth = event.month !== month;
          month = event.month;
          return (
            <article key={event.title}>
              {showMonth ? <h2>{event.month}</h2> : null}
              <div className="event">
                <p className="kicker">{event.day}</p>
                <h3>{event.title}</h3>
                <p>{event.when}</p>
                <p className="muted">{event.where}</p>
                <p>{event.text}</p>
              </div>
            </article>
          );
        })}
        <p style={{ marginTop: 24 }}><Link className="btn" to="/contact">Ask about a workshop</Link></p>
      </section>
    </>
  );
}
