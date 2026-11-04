import { useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import About from "./pages/About";
import Arcade from "./pages/Arcade";
import Donate from "./pages/Donate";
import Eitc from "./pages/Eitc";
import Events from "./pages/Events";
import Forward from "./pages/Forward";
import Home from "./pages/Home";
import Impact from "./pages/Impact";
import Market from "./pages/Market";
import Partners from "./pages/Partners";
import Programs from "./pages/Programs";
import { Contact, Newsletter, Privacy, Terms, Volunteer } from "./pages/Simple";

export default function App() {
  const location = useLocation();
  const locationRef = useRef(location);
  const [shown, setShown] = useState(location);
  const [stage, setStage] = useState("shown");
  locationRef.current = location;

  useEffect(() => {
    if (location.pathname === shown.pathname) {
      if (location.hash !== shown.hash || location.search !== shown.search) setShown(location);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(location);
      setStage("shown");
      return;
    }
    setStage("out");
  }, [location, shown]);

  useEffect(() => {
    if (stage !== "out") return;
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      setShown(locationRef.current);
      setStage("in");
    }, 450);
    return () => clearTimeout(timer);
  }, [stage]);

  function onFadeEnd(event) {
    if (event.target !== event.currentTarget || stage !== "out") return;
    window.scrollTo(0, 0);
    setShown(locationRef.current);
    setStage("in");
  }

  return (
    <Routes location={shown}>
      <Route element={<Layout stage={stage} pageKey={shown.pathname} onFadeEnd={onFadeEnd} />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="programs" element={<Programs />} />
        <Route path="impact" element={<Impact />} />
        <Route path="partners" element={<Partners />} />
        <Route path="eitc" element={<Eitc />} />
        <Route path="events" element={<Events />} />
        <Route path="forward" element={<Forward />} />
        <Route path="market" element={<Market />} />
        <Route path="arcade" element={<Arcade />} />
        <Route path="donate" element={<Donate />} />
        <Route path="contact" element={<Contact />} />
        <Route path="volunteer" element={<Volunteer />} />
        <Route path="newsletter" element={<Newsletter />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
      </Route>
    </Routes>
  );
}
