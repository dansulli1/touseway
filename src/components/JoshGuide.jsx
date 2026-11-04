import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { answerQuestion } from "../joshAnswers";
import "../josh.css";

const STORAGE_KEY = "josh-guide";

const steps = [
  {
    id: "welcome",
    offer: true,
    message: "Hi there! I'm Josh.",
    detail: "Want a tour, or would you rather look around yourself?",
    menu: "[data-tour='home']",
  },
  {
    id: "about-nav",
    path: "/",
    message: "Click Next to learn more about us.",
  },
  {
    id: "about",
    path: "/about",
    message: "JOSHWAY is a nonprofit in Easton, founded in 2023 in memory of Josh Robertson, so no young person has to feel invisible.",
    detail: "We connect young people to real world opportunities, with life skills, self-confidence, and digital literacy.",
    target: ".page-hero h1",
    menu: "[data-tour='about']",
  },
  {
    id: "impact",
    path: "/impact",
    message: "Here at JOSHWAY we have many visionaries.",
    detail: "Meet the next generation of changemakers.",
    target: ".page-hero h1",
    menu: "[data-tour='about']",
  },
  {
    id: "programs",
    path: "/programs",
    message: "Programs center on the Youth Leadership Bridge, the Creative Lab, and Digital Wellness.",
    detail: "The Bridge prepares middle schoolers with life skills and leadership. The Creative Lab is hands-on making at 913 Northampton Street. Digital Wellness, through The Digital Diet, helps youth and educators build healthier tech habits.",
    target: ".page-hero h1",
    menu: "[data-tour='programs']",
  },
  {
    id: "forward",
    path: "/forward",
    message: "JOSHWAY Forward connects Lehigh Valley students with local businesses and nonprofits that need real technology built.",
    detail: "Junior engineers from high schools and colleges build apps, websites, and workflows, with a senior JOSHWAY engineer on every team.",
    target: ".page-hero h1",
    menu: "[data-tour='opportunities']",
  },
  {
    id: "donate",
    path: "/donate",
    message: "You can help a young person find their pathway from here.",
    finish: true,
    target: ".page-hero h1",
    menu: "[data-tour='donate']",
  },
];

const quickActions = [
  {
    label: "About",
    to: "/about",
    reply:
      "JOSHWAY is a nonprofit in Easton, founded in 2023 in memory of Josh Robertson so no young person has to feel invisible. We connect young people to real world opportunities, with a focus on life skills, self-confidence, and digital literacy.",
  },
  {
    label: "Contact",
    to: "/contact",
    reply:
      "The Lab is at 913 Northampton Street, Easton, PA 18042, in the West Ward. Email info@joshway.org, or send a note on the contact page about programs, a school visit, a gift, or a partnership.",
  },
  {
    label: "What’s JOSHWAY?",
    to: "/",
    reply:
      "JOSHWAY is a nonprofit in Easton, PA that connects youth to real world opportunities, with a focus on life skills, self-confidence, and digital literacy. We show up in schools, after-school programs, and youth organizations so every young person has a pathway forward.",
  },
  {
    label: "Programs",
    to: "/programs",
    reply:
      "We run the Youth Leadership Bridge for middle school life skills and leadership, the Creative Lab for hands-on making at 913 Northampton Street, and Digital Wellness through The Digital Diet for healthier technology habits. Programs serve ages 8 to 18, with a focus on middle and high school.",
  },
  {
    label: "Impact",
    to: "/impact",
    reply:
      "Impact measures success through young people finding their voice—stories from Isaias, Ayeika, Cam, Jamison, Daniel, and Peter, including the Before the Snap podcast. From that page you can also request the Bridge, a Lab Experience, The Digital Diet, share your talents, or give.",
  },
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
  const [place, setPlace] = useState({ top: 140, left: 28, side: "right", compact: false });
  const [glide, setGlide] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState([
    { from: "josh", text: "Hey!" },
    { from: "josh", text: "How can I help you today?" },
  ]);
  const [farewell, setFarewell] = useState("");
  const lookRef = useRef(null);
  const faceRef = useRef(null);
  const threadRef = useRef(null);
  const actorRef = useRef(null);
  const revealedStep = useRef(null);
  const settleTimer = useRef(0);
  const settleToken = useRef(0);
  const step = steps[stepIndex];
  const tourCount = steps.length - 1;
  const showDock = mode === "settled" || (mode === "tour" && Boolean(farewell));

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ mode, step: stepIndex }));
  }, [mode, stepIndex]);

  useEffect(() => () => window.clearTimeout(settleTimer.current), []);

  useEffect(() => {
    if (phase !== "here") return;
    setGlide(true);
    const timer = setTimeout(() => setGlide(false), 1000);
    return () => clearTimeout(timer);
  }, [stepIndex, phase]);

  useEffect(() => {
    if (mode !== "tour") return;
    const match = steps.findIndex((item, index) => index >= 2 && item.path === location.pathname);
    if (match === -1) return;
    setStepIndex((current) => (match > current ? match : current));
  }, [location.pathname, mode]);

  useEffect(() => {
    if (mode !== "tour") return;
    const measure = () => {
      const mobile = window.matchMedia("(max-width: 720px)").matches;
      const onHeroStep = step.target === ".page-hero h1";
      const actorW = mobile ? 100 : onHeroStep ? 200 : 250;
      const actorH = mobile ? 122 : onHeroStep ? 250 : 320;
      const bubbleW = mobile ? 248 : 300;
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
      if (mobile) {
        /* CSS pins the pair to the bottom dock; keep side right so he faces the bubble. */
        top = Math.max(88, window.innerHeight - actorH - 10);
        left = 8;
      } else if (onInner) {
        top = Math.max(88, heroRect.bottom - actorH + 24);
        left = wrapRect.right - actorW + 12;
      } else if (visible && !inHeader) {
        top = Math.min(Math.max(96, rect.bottom + 12), window.innerHeight - actorH - 12);
        left = Math.min(rect.left, window.innerWidth - actorW - 340);
      }
      left = Math.max(8, Math.min(left, window.innerWidth - actorW - 12));
      const side = mobile
        ? "right"
        : onInner || left + actorW + 20 + bubbleW > window.innerWidth - 12
          ? "left"
          : "right";
      setPlace({ top, left, side, compact: mobile || onHeroStep });
      const menuNode = step.menu ? document.querySelector(step.menu) : null;
      let ring = menuNode?.getBoundingClientRect();
      const menuShown = ring && ring.width > 8 && ring.height > 8;
      if (menuShown && menuNode && (ring.bottom < 0 || ring.top > window.innerHeight) && revealedStep.current !== step.id) {
        revealedStep.current = step.id;
        menuNode.scrollIntoView({ block: "nearest" });
      }
      if (step.menu && !menuShown) {
        ring = document.querySelector("[data-tour='menu']")?.getBoundingClientRect();
      }
      setSpot(
        ring && ring.width > 8 && ring.height > 8
          ? { top: ring.top, left: ring.left, width: ring.width, height: ring.height }
          : null
      );
    };
    measure();
    const timer = setTimeout(measure, 80);
    const menuSizes = new ResizeObserver(measure);
    document.querySelectorAll("[data-tour]").forEach((node) => menuSizes.observe(node));
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      clearTimeout(timer);
      menuSizes.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [mode, step, phase, location.pathname]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const current = { x: 0, y: 0, r: 0 };
    const goal = { x: 0, y: 0, r: 0 };
    let frame = 0;
    const tick = () => {
      current.x += (goal.x - current.x) * 0.07;
      current.y += (goal.y - current.y) * 0.07;
      current.r += (goal.r - current.r) * 0.07;
      if (lookRef.current) {
        lookRef.current.style.transform = `translate(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px) rotate(${current.r.toFixed(2)}deg)`;
      }
      if (faceRef.current) {
        faceRef.current.style.transform = `translate(${(current.x * 0.25).toFixed(2)}px, ${(current.y * 0.25).toFixed(2)}px)`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    const onMove = (event) => {
      const nx = event.clientX / window.innerWidth - 0.5;
      const ny = event.clientY / window.innerHeight - 0.5;
      goal.x = nx * 12;
      goal.y = ny * 7;
      goal.r = nx * 3.5;
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  useEffect(() => {
    if (threadRef.current) threadRef.current.scrollTop = threadRef.current.scrollHeight;
  }, [messages, chatOpen]);

  function isCornerNote(text) {
    return /stay in the corner/i.test(text);
  }

  function withoutExtraCornerNotes(list, keepLatest = true) {
    let kept = false;
    const next = [];
    for (let i = list.length - 1; i >= 0; i -= 1) {
      const message = list[i];
      if (message.from === "josh" && isCornerNote(message.text)) {
        if (kept || !keepLatest) continue;
        kept = true;
      }
      next.unshift(message);
    }
    return next;
  }

  function leaveNote(note) {
    setMessages((current) => {
      const untouched = current.length <= 2 && current.every((message) => message.from === "josh");
      if (untouched) {
        return [
          { from: "josh", text: note },
          { from: "josh", text: "Ask me anything, or pick a quick action below." },
        ];
      }
      // One status line only — drop prior "stay in the corner" notes so dismissals don't spam
      return [...withoutExtraCornerNotes(current, false), { from: "josh", text: note }];
    });
  }

  function openChat() {
    if (mode !== "settled") settle();
    setFarewell("");
    setMessages((current) => withoutExtraCornerNotes(current));
    setChatOpen(true);
  }

  function settle() {
    window.clearTimeout(settleTimer.current);
    settleTimer.current = 0;
    settleToken.current += 1;
    setMode("settled");
    setPhase("here");
  }

  function dismiss(note, options) {
    if (note) leaveNote(note);
    if (options?.farewell) setFarewell(note || "That's the whole tour. I'll stay in the corner.");
    const token = ++settleToken.current;
    if (prefersReducedMotion() || phase !== "here") {
      settle();
      return;
    }
    setPhase("out");
    window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(() => {
      if (settleToken.current === token) settle();
    }, 1400);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (settleToken.current !== token) return;
        const node = actorRef.current;
        if (!node || !node.classList.contains("out")) return;
        const name = getComputedStyle(node).animationName;
        if (!name || name === "none") settle();
      });
    });
  }

  function onActorAnimationEnd(event) {
    if (event.target !== event.currentTarget) return;
    if (phase === "in") setPhase("here");
    if (phase === "out") settle();
  }

  function advance() {
    if (step.finish) {
      dismiss("That's the whole tour. I'll stay in the corner.", { farewell: true });
      if (location.pathname !== "/") navigate("/");
      return;
    }
    const next = steps[stepIndex + 1];
    setStepIndex(stepIndex + 1);
    if (next?.path && next.path !== location.pathname) navigate(next.path);
  }

  function retreat() {
    if (stepIndex <= 0) return;
    const previous = steps[stepIndex - 1];
    setStepIndex(stepIndex - 1);
    if (!previous) return;
    const path = previous.offer ? "/" : previous.path;
    if (path && path !== location.pathname) navigate(path);
  }

  function restartTour() {
    settleToken.current += 1;
    window.clearTimeout(settleTimer.current);
    setFarewell("");
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
    if (!text) {
      setMessages((current) => {
        const tip = "Type a question, or tap a quick action below.";
        const last = current[current.length - 1];
        if (last?.from === "josh" && last.text === tip) return current;
        return [...current, { from: "josh", text: tip }];
      });
      return;
    }
    setDraft("");
    const answer = answerQuestion(text);
    if (answer.tour) {
      restartTour();
      return;
    }
    pushExchange(text, answer.reply, answer.to);
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
          className={`josh-actor ${phase} ${glide ? "glide" : ""} ${place.compact ? "compact" : ""}`}
          style={{ top: place.top, left: place.left }}
          ref={actorRef}
          onAnimationEnd={onActorAnimationEnd}
        >
          <div className="josh-bob">
            <div className="josh-look" ref={lookRef}>
              <div className={`josh-figure ${place.side === "left" ? "face-left" : ""}`}>
                <img className="pose fly" src="/media/josh-fly.png" alt="" />
                <img className="pose stand" src="/media/josh-stand.png" alt="Josh, the JOSHWAY guide" />
              </div>
            </div>
          </div>
          {phase === "here" ? (
            <div className={`josh-bubble ${place.side}`} role="dialog" aria-label="Josh">
              <div className="josh-bubble-bar">
                <p className="josh-kicker">Josh</p>
                <button
                  className="josh-x"
                  type="button"
                  onClick={() =>
                    dismiss(
                      step.offer
                        ? "No problem. I'll stay in the corner."
                        : "I'll stay in the corner if you want the tour later."
                    )
                  }
                  aria-label="Dismiss Josh"
                >
                  ×
                </button>
              </div>
              <div key={step.id} className="josh-copy">
                <p className="josh-say">{step.message}</p>
                {step.detail ? <p className="josh-detail">{step.detail}</p> : null}
              </div>
              {step.offer ? (
                <div className="josh-actions">
                  <button className="btn" type="button" onClick={() => setStepIndex(1)}>
                    Show me around
                  </button>
                  <button
                    className="josh-quiet"
                    type="button"
                    onClick={() => dismiss("No problem. I'll stay in the corner.")}
                  >
                    I'll look myself
                  </button>
                </div>
              ) : (
                <div className="josh-controls">
                  <div
                    className="josh-progress"
                    role="progressbar"
                    aria-label="Tour progress"
                    aria-valuemin={0}
                    aria-valuemax={tourCount}
                    aria-valuenow={stepIndex}
                  >
                    <span
                      className="josh-progress-fill"
                      style={{ width: `${(stepIndex / tourCount) * 100}%` }}
                    />
                  </div>
                  <div className="josh-actions">
                    <button className="josh-quiet" type="button" onClick={retreat}>
                      Previous
                    </button>
                    <button className="btn" type="button" onClick={advance}>
                      {step.finish ? "Finish" : "Next"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      ) : null}

      {showDock ? (
        <div className="josh-dock">
          {mode === "settled" && chatOpen ? (
            <section className="josh-chat" id="josh-chat-panel" aria-label="Chat with Josh">
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
              <div className="josh-thread" ref={threadRef} aria-live="polite">
                {messages.map((message, index) => (
                  <p key={`${message.from}-${index}`} className={`josh-msg ${message.from}`}>
                    {message.text}
                  </p>
                ))}
              </div>
              <div className="josh-chips" role="group" aria-labelledby="josh-quick-label">
                <p id="josh-quick-label">Quick actions</p>
                <div>
                  {quickActions.map((action) => (
                    <button
                      key={action.label}
                      type="button"
                      onClick={() => pushExchange(action.label, action.reply)}
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
          {!chatOpen ? (
            <button
              className={farewell ? "josh-hey note" : "josh-hey"}
              type="button"
              onClick={openChat}
            >
              {farewell || "Ask me anything!"}
            </button>
          ) : null}
          {mode === "settled" ? (
            <button
              className={chatOpen ? "josh-corner open" : "josh-corner"}
              type="button"
              onClick={() => {
                if (chatOpen) setChatOpen(false);
                else openChat();
              }}
              aria-label={chatOpen ? "Close chat with Josh" : "Chat with Josh"}
              aria-expanded={chatOpen}
              aria-controls="josh-chat-panel"
            >
              <span className="josh-corner-face" ref={faceRef}>
                <img src="/media/josh-stand.png" alt="" />
              </span>
            </button>
          ) : null}
        </div>
      ) : null}

      {mode === "away" ? (
        <button className="josh-recall" type="button" onClick={() => setMode("settled")}>
          <span className="josh-mini" aria-hidden="true">
            <img src="/media/josh-stand.png" alt="" />
          </span>
          Bring Josh back
        </button>
      ) : null}
    </div>
  );
}
