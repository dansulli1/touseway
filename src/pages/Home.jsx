import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gifts, news, partners, pillars, posts, stats } from "../data";

function useCount(target, start) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    const duration = 1200;
    const t0 = performance.now();
    let frame;
    const tick = (now) => {
      const progress = Math.min(1, (now - t0) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, target]);
  return value;
}

function Stat({ value, suffix, label, start }) {
  const current = useCount(value, start);
  return (
    <div className="stat">
      <strong>
        {current}
        {suffix}
      </strong>
      <p>{label}</p>
    </div>
  );
}

export default function Home() {
  const statsRef = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const node = statsRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStart(true);
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const logos = [...partners, ...partners];

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <div>
            <h1>No young person should feel unseen.</h1>
            <p>
              JOSHWAY® is a nonprofit in Easton, PA that connects youth to real world opportunities, with a focus on life skills, self-confidence, and digital literacy.
            </p>
            <p>The strength is already inside them. We help bring it forward.</p>
          </div>
        </div>
      </section>

      <section className="wrap pathway">
        <img
          className="circle"
          src="/media/lab.jpg"
          alt="Young people gathered at the JOSHWAY Lab in Easton watching a student present 3D printing designs"
        />
        <div>
          <p className="kicker">#discoverjoshway</p>
          <h2>We believe every young person deserves a pathway forward.</h2>
          <h2 className="lg">We call this their JOSHWAY.</h2>
          <div className="split">
            <div>
              <h3>The Challenge</h3>
              <p>
                95% of youth say mental health and stress are their biggest challenges. Most of them aren’t missing talent. They’re missing access, a plan, and someone in their corner.
              </p>
            </div>
            <div>
              <h3>The Solution</h3>
              <p>
                Inspired by <Link to="/about">Josh’s story</Link>, we show up where young people already are, in schools, after school programs, and youth organizations.
              </p>
              <p>
                We help them discover who they are, build the skills to back it up, and connect them to real world opportunities. When a young person finds their project, we move with urgency.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap stats" ref={statsRef}>
        {stats.map((stat) => (
          <Stat key={stat.label} {...stat} start={start} />
        ))}
      </section>

      <section className="wrap pillars">
        <h2 className="section-title">Discover. Create. Connect. Showcase.</h2>
        <div className="pillar-grid">
          {pillars.map((pillar) => (
            <article className="pillar" key={pillar.title}>
              <img src={pillar.image} alt="" />
              <h3>{pillar.title}</h3>
              <p>
                {pillar.title === "Connect" ? (
                  <>
                    When we see a spark, we plug them into real world opportunities:{" "}
                    <Link className="link" to="/forward">JOSHWAY Forward</Link>,{" "}
                    <Link className="link" to="/market">A Market for Kids</Link>,{" "}
                    <Link className="link" to="/programs#scholarship">scholarships</Link>, internships, and teaching their peers. Nothing builds confidence like leading the room.
                  </>
                ) : (
                  pillar.text
                )}
              </p>
              {pillar.link ? (
                <p className="links"><Link className="link" to={pillar.to}>{pillar.link}</Link></p>
              ) : null}
            </article>
          ))}
        </div>
        <div className="center">
          <Link className="btn wide" to="/programs">Learn with JOSHWAY</Link>
        </div>
      </section>

      <section className="arcade-band">
        <div className="wrap arcade-card">
          <p className="eyebrow">New: The JOSHWAY Arcade</p>
          <h2>Built by the Next Generation</h2>
          <p>Eleven games, created with young people in the JOSHWAY Creative Lab. Free to play, no account needed.</p>
          <Link className="btn" to="/arcade">Visit the Arcade</Link>
        </div>
      </section>

      <section className="volunteer">
        <div className="wrap">
          <div className="volunteer-copy">
            <p className="kicker">#joshwayvolunteer</p>
            <h2>Join JOSHWAY</h2>
            <p>
              We’re always looking for mentors, artists, and technology subject matter experts. Join us in cultivating a brighter future by helping young people find their purpose and voice to shape tomorrow.
            </p>
            <Link className="btn wide" to="/volunteer">Make a Difference</Link>
          </div>
        </div>
      </section>

      <section className="wrap news">
        <div className="news-head">
          <h2>In the News</h2>
          <p>The Lehigh Valley is taking notice of what happens when young people get real world opportunities.</p>
        </div>
        <div className="news-row">
          {news.map((item) => (
            <article className="news-card" key={item.title}>
              <img src={item.image} alt={item.outlet} />
              <p className="outlet">{item.outlet}</p>
              <h3>{item.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap impact">
        <img src="/media/impact.webp" alt="Make Your Impact" />
        <div>
          <h2>Make Your Impact</h2>
          <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>Support JOSHWAY’s core impact areas:</h3>
          <ul className="checks">
            {gifts.map((gift) => <li key={gift}>{gift}</li>)}
          </ul>
          <p>
            Your tax-deductible donation helps young people build life skills, self-confidence, and digital literacy, and connects them to real world opportunities.
          </p>
          <p>
            Pennsylvania businesses can also give through the EITC program and receive up to 90% back as a state tax credit.{" "}
            <Link className="inline" to="/eitc">Learn more about EITC giving.</Link>
          </p>
          <Link className="btn wide" to="/donate">Donate</Link>
        </div>
      </section>

      <section className="gratitude">
        <div className="wrap">
          <h2>JOSHWAY Gratitude</h2>
          <p>
            Our work wouldn’t be possible without the partners and sponsors who stand with us. They’re not just supporters, they’re collaborators fueling ideas, resources, and hope for the next generation.
          </p>
        </div>
        <div className="marquee" aria-label="Partner logos">
          <div className="marquee-track">
            {logos.map((src, index) => (
              <img key={`${src}-${index}`} src={src} alt="" />
            ))}
          </div>
        </div>
        <div className="center">
          <Link className="btn wide" to="/partners">Our Partners</Link>
        </div>
      </section>

      <section className="wrap social">
        <p className="kicker">#discoverjoshway</p>
        <h2>Follow our journey & stay up to date on all things JOSHWAY.</h2>
        <div className="ig-grid">
          {posts.map((post) => (
            <a key={post.src} href="https://www.instagram.com/JOSHWAYlv/" target="_blank" rel="noreferrer">
              <img src={post.src} alt={`joshwaylv ${post.date}`} />
              <span>{post.date}</span>
            </a>
          ))}
        </div>
        <a className="follow" href="https://www.instagram.com/JOSHWAYlv/" target="_blank" rel="noreferrer">
          Follow @joshwaylv
        </a>
      </section>
    </>
  );
}
