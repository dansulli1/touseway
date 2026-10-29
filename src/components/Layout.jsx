import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import JoshGuide from "./JoshGuide";

const titles = {
  "/": "JOSHWAY - Youth Life Skills Programs in Easton, PA",
  "/about": "About JOSHWAY - Youth Nonprofit in Easton, PA",
  "/programs": "Youth Life Skills and Digital Literacy Programs - JOSHWAY",
  "/impact": "Our Impact on Lehigh Valley Youth - JOSHWAY",
  "/partners": "JOSHWAY Partners and Sponsors",
  "/eitc": "EITC Donation in Pennsylvania - JOSHWAY",
  "/events": "Events - JOSHWAY",
  "/forward": "JOSHWAY Forward: Local Talent for Lehigh Valley Businesses",
  "/market": "A Market for Kids in the Lehigh Valley - JOSHWAY",
  "/arcade": "JOSHWAY Arcade: Games Built With Young People",
  "/donate": "Donate to a Youth Nonprofit in the Lehigh Valley - JOSHWAY",
  "/contact": "Contact JOSHWAY",
  "/volunteer": "Volunteer with JOSHWAY",
  "/newsletter": "Join the JOSHWAY Newsletter",
  "/privacy": "Privacy Policy - JOSHWAY",
  "/terms": "Terms & Conditions - JOSHWAY",
};

export default function Layout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    document.title = titles[pathname] || "JOSHWAY";
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <>
      <Header />
      <main id="content">
        <Outlet />
      </main>
      <Footer />
      <JoshGuide />
    </>
  );
}
