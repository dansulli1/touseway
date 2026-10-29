import Form from "../components/Form";
import PageHero from "../components/PageHero";

export function Contact() {
  return (
    <>
      <PageHero image="/media/lab.jpg" title="Contact JOSHWAY" lede="913 Northampton Street, Easton, PA 18042 · info@joshway.org" />
      <section className="wrap prose two">
        <div>
          <p>Questions about programs, a school visit, a gift, or a partnership? Send a note and the team will write back.</p>
          <p>The JOSHWAY Lab is at 913 Northampton Street in Easton’s West Ward.</p>
        </div>
        <Form
          fields={[
            { name: "name", label: "Name", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            { name: "topic", label: "Topic", type: "select", required: true, options: ["Programs", "A school or group visit", "Giving", "EITC", "Something else"] },
            { name: "message", label: "Message", type: "textarea", required: true },
          ]}
          success="Message received. A person from JOSHWAY will follow up at the email you shared."
        />
      </section>
    </>
  );
}

export function Volunteer() {
  return (
    <>
      <PageHero image="/media/volunteer.webp" title="Share your talents" lede="Mentors, artists, and technology experts help young people find their purpose and voice." />
      <section className="wrap prose two">
        <div>
          <p>We’re looking for people who can sit beside a young person while they practice a skill: money, speaking, music, design, code, wellness, or simply showing up.</p>
        </div>
        <Form
          fields={[
            { name: "name", label: "Name", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            { name: "talent", label: "How can you help?", type: "select", required: true, options: ["Mentoring", "Art or music", "Technology", "Workshops", "Events"] },
            { name: "note", label: "A little about you", type: "textarea", required: true },
          ]}
          submitLabel="Make a difference"
          success="Thank you for offering your time. The JOSHWAY team will be in touch about next steps."
        />
      </section>
    </>
  );
}

export function Newsletter() {
  return (
    <>
      <PageHero image="/media/signup.webp" title="Stay up to date" lede="Follow the work, the workshops, and the young people building in Easton." />
      <section className="wrap prose" style={{ maxWidth: 720 }}>
        <Form
          fields={[
            { name: "name", label: "Name", required: true },
            { name: "email", label: "Email", type: "email", required: true },
          ]}
          submitLabel="Join the newsletter"
          success="You’re in. Watch for notes from JOSHWAY, and follow @joshwaylv in the meantime."
        />
      </section>
    </>
  );
}

export function Privacy() {
  return (
    <>
      <PageHero image="/media/hero.webp" title="Privacy Policy" />
      <section className="wrap prose">
        <p>JOSHWAY collects only what you choose to send through a form: your name, email, and the note you write. We use it to reply about programs, volunteering, events, or giving.</p>
        <p>We do not sell personal information. We do not ask for a child’s name or contact details on the Market for Kids list. Payment card numbers are not collected on this site.</p>
        <p>Questions about your information can go to info@joshway.org or to 913 Northampton Street, Easton, PA 18042.</p>
      </section>
    </>
  );
}

export function Terms() {
  return (
    <>
      <PageHero image="/media/hero.webp" title="Terms & Conditions" />
      <section className="wrap prose">
        <p>This site shares the work of JOSHWAY Inc., a 501(c)(3) nonprofit. Program details, event times, and scholarship criteria can change. Confirm dates with the team before you travel.</p>
        <p>JOSHWAY® is a registered trademark. Photos and stories of young people are shared with permission for the organization’s mission. Please don’t reuse them without asking.</p>
        <p>Arcade games are offered for play and learning. They are not a paid product and may be updated as new cohorts build the next version.</p>
      </section>
    </>
  );
}
