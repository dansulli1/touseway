import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../josh.css";

const STORAGE_KEY = "josh-guide";

const steps = [
  {
    id: "welcome",
    message: "Hi there! Welcome to JOSHWAY.",
    detail: "Let me show you around.",
    cta: "Show me",
  },
  {
    id: "about-nav",
    message: "Start here to learn more about us and what we do.",
    cta: "About us",
    target: "[data-tour='about']",
  },
  {
    id: "about",
    path: "/about",
    message: "Yay! You made it!",
    detail: "Keep scrolling to learn more about us.",
    cta: "Next",
    target: ".page-hero h1",
  },
  {
    id: "impact",
    path: "/impact",
    message: "Here at JOSHWAY we have many visionaries.",
    detail: "Meet the next generation of changemakers.",
    cta: "Next",
    target: ".page-hero h1",
  },
  {
    id: "programs",
    path: "/programs",
    message: "This is where young people learn life skills and make things.",
    cta: "Next",
    target: ".page-hero h1",
  },
  {
    id: "forward",
    path: "/forward",
    message: "When a spark shows up, we connect them to real projects.",
    cta: "Next",
    target: ".page-hero h1",
  },
  {
    id: "donate",
    path: "/donate",
    message: "You can help a young person find their pathway from here.",
    cta: "Finish tour",
    target: ".page-hero h1",
    finish: true,
  },
];

const quickActions = [
  { label: "About", to: "/about", reply: "About is Josh’s story, the mission, and the people behind JOSHWAY." },
  { label: "Contact", to: "/contact", reply: "The contact page is the way to reach the JOSHWAY team." },
  { label: "What’s JOSHWAY?", to: "/", reply: "JOSHWAY helps young people in Easton find a pathway forward." },
  { label: "Programs", to: "/programs", reply: "Programs cover life skills, the Creative Lab, and The Digital Diet." },
  { label: "Impact", to: "/impact", reply: "Impact introduces the young visionaries." },
];

function loadGuide() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "");
    if (saved && (saved.mode === "tour" || saved.mode === "settled" || saved.mode === "away")) {
      const step = Math.min(steps.length - 1, Math.max(0, saved.step || 0));
      return { mode: saved.mode, step };
    }
  } catch {
    /* first visit this session */
  }
  return { mode: "tour", step: 0 };
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function JoshGuide() {
  const location = useLocation();
  const navigate = useNavigate();
  const saved = useRef(loadGuide());
  const [mode, setMode] = useState(saved.current.mode);
  const [stepIndex, setStepIndex] = useState(saved.current.step);
  const [phase, setPhase] = useState(() =>
    saved.current.mode === "tour" && !prefersReducedMotion() ? "in" : "here"
  );
  const [spot, setSpot] = useState(null);
  const [place, setPlace] = useState({ top: 140, left: 28, side: "right", flying: true });
  const [chatOpen, setChatOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState([
    { from: "josh", text: "Hey!" },
    { from: "josh", text: "How can I help you today?" },
  ]);
  const lookRef = useRef(null);
  const faceRef = useRef(null);
  const threadRef = useRef(null);
  const step = steps[stepIndex];

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ mode, step: stepIndex }));
  }, [mode, stepIndex]);

  useEffect(() => {
    if (mode !== "tour") return;
    const match = steps.findIndex((item, index) => index >= 2 && item.path === location.pathname);
    if (match === -1) return;
    setStepIndex((current) => (match > current ? match : current));
  }, [location.pathname, mode]);

  useEffect(() => {
    if (mode !== "tour") return;
    const measure = () => {
      const flying = phase !== "here";
      const onHeroStep = step.target === ".page-hero h1";
      const actorW = onHeroStep ? 200 : 250;
      const actorH = onHeroStep ? 250 : 320;
      const bubbleW = 300;
      const node = step.target ? document.querySelector(step.target) : null;
      const rect = node ? node.getBoundingClientRect() : null;
      const visible = rect && rect.width > 8 && rect.height > 8;
      let top = 112;
      let left = 40;
      const inHeader = visible && rect.top < 100;
      const hero = document.querySelector(".page-hero");
      const heroRect = hero?.getBoundingClientRect();
      const wrap = document.querySelector(".page-hero .wrap");
      const wrapRect = wrap?.getBoundingClientRect();
      const onInner = Boolean(visible && heroRect && wrapRect && heroRect.height > 40 && step.target === ".page-hero h1");
      if (onInner) {
        top = Math.max(88, heroRect.bottom - actorH + 24);
        left = wrapRect.right - actorW + 12;
      } else if (visible && !inHeader) {
        top = Math.min(Math.max(96, rect.bottom + 12), window.innerHeight - actorH - 12);
        left = Math.min(rect.left, window.innerWidth - actorW - 340);
      }
      left = Math.max(8, Math.min(left, window.innerWidth - actorW - 12));
      const side = onInner || left + actorW + bubbleW > window.innerWidth - 12 ? "left" : "right";
      setPlace({ top, left, side, flying, compact: onHeroStep });
      setSpot(visible && rect.height < 90 ? { top: rect.top, left: rect.left, width: rect.width, height: rect.height } : null);
    };
    measure();
    const timer = setTimeout(measure, 80);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [mode, step, phase, location.pathname]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let frame = 0;
    const onMove = (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const nx = event.clientX / window.innerWidth - 0.5;
        const ny = event.clientY / window.innerHeight - 0.5;
        if (lookRef.current) {
          lookRef.current.style.transform = `translate(${nx * 16}px, ${ny * 10}px) rotate(${nx * 6}deg)`;
        }
        if (faceRef.current) {
          faceRef.current.style.transform = `translate(${nx * 10}px, ${ny * 8}px)`;
        }
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key !== "x" && event.key !== "X") return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const active = document.activeElement;
      const tag = active?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || active?.isContentEditable) return;
      event.preventDefault();
      if (mode === "tour") dismiss();
      else if (mode === "settled" && chatOpen) setChatOpen(false);
      else if (mode === "settled") setMode("away");
      else setMode("settled");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode, chatOpen, phase]);

  useEffect(() => {
    if (threadRef.current) threadRef.current.scrollTop = threadRef.current.scrollHeight;
  }, [messages, chatOpen]);

  function dismiss() {
    if (prefersReducedMotion() || phase !== "here") {
      setMode("settled");
      setPhase("here");
      return;
    }
    setPhase("out");
  }

  function onActorAnimationEnd(event) {
    if (event.target !== event.currentTarget) return;
    if (phase === "in") setPhase("here");
    if (phase === "out") {
      setMode("settled");
      setPhase("here");
    }
  }

  function advance() {
    if (step.finish) {
      dismiss();
      return;
    }
    const next = steps[stepIndex + 1];
    setStepIndex(stepIndex + 1);
    if (next?.path && next.path !== location.pathname) navigate(next.path);
  }

  function restartTour() {
    setChatOpen(false);
    setStepIndex(0);
    setPhase(prefersReducedMotion() ? "here" : "in");
    setMode("tour");
    if (location.pathname !== "/") navigate("/");
  }

  function pushExchange(label, reply, to) {
    setMessages((current) => [
      ...current,
      { from: "you", text: label },
      { from: "josh", text: reply },
    ]);
    if (to) navigate(to);
  }

  function onAsk(event) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setDraft("");
    pushExchange(
      text,
      "I can point you to the right page. Try a quick action, or ask me to show you around."
    );
  }

  return (
    <div className="josh-guide">
      {mode === "tour" && spot ? (
        <div
          className="josh-spot"
          style={{ top: spot.top - 6, left: spot.left - 8, width: spot.width + 16, height: spot.height + 12 }}
        />
      ) : null}

      {mode === "tour" ? (
        <div
          className={`josh-actor ${phase} ${place.flying ? "flying" : "landed"} ${place.compact ? "compact" : ""}`}
          style={{ top: place.top, left: place.left }}
          onAnimationEnd={onActorAnimationEnd}
        >
          <div className="josh-bob" ref={lookRef}>
            <img
              src={place.flying ? "/media/josh-fly.png" : "/media/josh-stand.png"}
              alt="Josh, the JOSHWAY guide"
            />
          </div>
          {phase === "here" ? (
            <div className={`josh-bubble ${place.side}`} role="dialog" aria-label="Josh">
              <button className="josh-x" type="button" onClick={dismiss} aria-label="Dismiss Josh">
                ×
              </button>
              <p className="josh-kicker">Josh</p>
              <p className="josh-say">{step.message}</p>
              {step.detail ? <p className="josh-detail">{step.detail}</p> : null}
              <div className="josh-actions">
                <button className="btn" type="button" onClick={advance}>
                  {step.cta}
                </button>
                <span>
                  {stepIndex + 1} / {steps.length}
                </span>
              </div>
              <p className="josh-hint">Press X to fly away</p>
            </div>
          ) : null}
        </div>
      ) : null}

      {mode === "settled" ? (
        <div className="josh-dock">
          {chatOpen ? (
            <section className="josh-chat" aria-label="Chat with Josh">
              <header className="josh-chat-bar">
                <span className="josh-mini" aria-hidden="true">
                  <img src="/media/josh-stand.png" alt="" />
                </span>
                <div>
                  <strong>Josh</strong>
                  <span>Your guide</span>
                </div>
                <button type="button" className="josh-x" onClick={() => setChatOpen(false)} aria-label="Close chat">
                  ×
                </button>
              </header>
              <div className="josh-thread" ref={threadRef}>
                {messages.map((message, index) => (
                  <p key={`${message.from}-${index}`} className={`josh-msg ${message.from}`}>
                    {message.text}
                  </p>
                ))}
              </div>
              <div className="josh-chips">
                <p>Quick actions</p>
                <div>
                  {quickActions.map((action) => (
                    <button
                      key={action.label}
                      type="button"
                      onClick={() => pushExchange(action.label, action.reply, action.to)}
                    >
                      {action.label}
                    </button>
                  ))}
                  <button type="button" className="solid" onClick={restartTour}>
                    Show me around
                  </button>
                </div>
              </div>
              <form className="josh-ask" onSubmit={onAsk}>
                <span className="josh-mini" aria-hidden="true">
                  <img src="/media/josh-stand.png" alt="" />
                </span>
                <input
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="Ask me anything"
                  aria-label="Ask me anything"
                />
                <button className="btn" type="submit" aria-label="Send">
                  ↑
                </button>
              </form>
            </section>
          ) : null}
          {!chatOpen ? <span className="josh-hey">hey!</span> : null}
          <button
            className="josh-corner"
            type="button"
            onClick={() => setChatOpen((open) => !open)}
            aria-label={chatOpen ? "Close chat with Josh" : "Chat with Josh"}
            aria-expanded={chatOpen}
          >
            <span className="josh-corner-face" ref={faceRef}>
              <img src="/media/josh-stand.png" alt="" />
            </span>
          </button>
        </div>
      ) : null}

      {mode === "away" ? (
        <button className="josh-recall" type="button" onClick={() => setMode("settled")}>
          <span className="josh-mini" aria-hidden="true">
            <img src="/media/josh-stand.png" alt="" />
          </span>
          Josh
        </button>
      ) : null}
    </div>
  );
}
