import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Award,
  BarChart3,
  Bell,
  BookOpen,
  Bot,
  CheckCircle2,
  ChevronRight,
  CircleUserRound,
  HelpCircle,
  LayoutDashboard,
  Link2,
  MessageSquareText,
  MoreVertical,
  Search,
  SendHorizonal,
  Settings,
  Users,
} from "lucide-react";
import { useApp } from "../state/AppState";
import { WORKSPACE as W } from "../data/seed";
import { ProgressRing } from "../components/charts";
import { BridgeMark } from "../components/Layout";
import Toasts from "../components/Toasts";

/* render **bold** and `code` spans inside chat bubbles */
function rich(text, onNavy = false) {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, i) => {
    if (part.startsWith("**"))
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("`"))
      return (
        <code
          key={i}
          className={`font-mono text-[12.5px] px-1 py-0.5 rounded ${
            onNavy ? "bg-white/15" : "bg-navy/8"
          }`}
        >
          {part.slice(1, -1)}
        </code>
      );
    return part;
  });
}

function now() {
  return new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

/* Context-aware canned guidance for the Weather API project. */
function tutorReply(text) {
  const t = text.toLowerCase();
  if (t.includes("documentation"))
    return "Here's the relevant section: the current-weather endpoint is `api.openweathermap.org/data/2.5/weather`. Required params: `q` (city name) and `appid` (your API key). Add `units=metric` for Celsius. Want me to walk through the response shape next?";
  if (t.includes("debug"))
    return "Paste the call and I'll walk it with you. Three things to check first: is the URL template using backticks, is `appid` actually interpolated (log the final URL), and are you checking `res.ok` before parsing JSON?";
  if (/(401|unauthor|key)/.test(t))
    return "A 401 usually means the key isn't being sent correctly in the headers. Double-check if you're using the `?appid=` query param as required by OpenWeatherMap — and make sure the key isn't wrapped in quotes inside the template literal.";
  if (/(cors|blocked)/.test(t))
    return "CORS errors come from the browser, not your code. OpenWeatherMap allows browser requests, so check the protocol — use `https://` explicitly in the URL, or the browser may block mixed content on your dev server.";
  if (/(fetch|syntax|await|async|promise)/.test(t))
    return "Remember `fetch` resolves twice: once for the response, once for the body. So it's `const res = await fetch(url)` then `const data = await res.json()`. Wrap both in your try-catch — which of the two awaits is yours missing?";
  if (/(error|catch|fail|crash)/.test(t))
    return "Before the catch block, check `res.ok` — a 404 city or bad key still resolves the promise, so your catch never fires. Throw manually when `!res.ok`, then your error state handles both network and API failures in one path.";
  if (/(state|bind|render|display|map)/.test(t))
    return "Keep three pieces of state: `data`, `loading`, and `error`. Set `loading` true before the fetch, populate `data` after `res.json()`, and render conditionally. Which one is your component missing right now?";
  if (/(stuck|help|start|lost)/.test(t))
    return "You're on Step 3 — API Integration & Data Binding. Smallest next win: hard-code one city, log the parsed JSON to the console, and ignore the UI for now. Once you see real data in the console, binding it is the easy half.";
  return "Good question. You're on **Step 3 of 4** of the Real-time Weather API. Tell me what you tried and where it surprised you — I'll point you at the concept rather than the answer, so the badge stays meaningful.";
}

const NAV_ITEMS = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Project Data", icon: BarChart3 },
  { label: "Notifications", icon: Bell },
  { label: "Settings", icon: Settings },
  { label: "Help Center", icon: HelpCircle },
];

const COMMUNITY_ICONS = {
  check: { Icon: CheckCircle2, cls: "text-[#0C8A6A]" },
  link: { Icon: Link2, cls: "text-muted" },
  chat: { Icon: MessageSquareText, cls: "text-red" },
};

function TutorPanel() {
  const { state, dispatch } = useApp();
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [state.thread.length, typing]);

  const send = (text) => {
    const msg = text.trim();
    if (!msg || typing) return;
    dispatch({ type: "tutor/message", message: { from: "me", text: msg, time: now() } });
    setInput("");
    setTyping(true);
    setTimeout(() => {
      dispatch({
        type: "tutor/message",
        message: { from: "tutor", text: tutorReply(msg), time: now() },
      });
      setTyping(false);
    }, 1100);
  };

  return (
    <aside className="hidden lg:flex w-[390px] xl:w-[410px] shrink-0 bg-surface border-l border-line flex-col">
      <header className="flex items-center gap-3 px-5 py-4 border-b border-line">
        <span className="h-11 w-11 rounded-[11px] bg-navy grid place-items-center shrink-0">
          <Bot size={21} className="text-white" />
        </span>
        <div>
          <p className="font-display font-bold text-[16.5px] text-navy">AI Tutor</p>
          <p className="caps text-[10px] text-muted flex items-center gap-1.5 mt-0.5">
            <span className="live-dot" /> Active Guiding
          </p>
        </div>
        <button aria-label="Tutor options" className="ml-auto text-muted hover:text-navy cursor-pointer">
          <MoreVertical size={18} />
        </button>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
        {state.thread.map((m, i) => (
          <div key={i} className={m.from === "me" ? "flex flex-col items-end" : "flex flex-col items-start"}>
            <div
              className={`max-w-[88%] px-4 py-3 text-[13.5px] leading-relaxed ${
                m.from === "me"
                  ? "bg-navy text-white rounded-2xl rounded-tr-md"
                  : "bg-field text-navy rounded-2xl rounded-tl-md"
              }`}
            >
              {rich(m.text, m.from === "me")}
            </div>
            <p className="text-[11px] text-muted mt-1.5 px-1">
              {m.from === "me" ? "You" : "AI Tutor"} • {m.time}
            </p>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-tl-md bg-field px-4 py-3.5 flex gap-1.5">
              <span className="typing-dot" />
              <span className="typing-dot" style={{ animationDelay: "0.15s" }} />
              <span className="typing-dot" style={{ animationDelay: "0.3s" }} />
            </div>
          </div>
        )}
      </div>

      <div className="px-5 pb-5 pt-3 border-t border-line">
        <div className="flex gap-2.5">
          <button
            onClick={() => send("Show me the documentation for this endpoint.")}
            className="h-9 px-4 rounded-full bg-panel text-navy text-[13px] font-semibold hover:bg-line/70 cursor-pointer"
          >
            Show Documentation
          </button>
          <button
            onClick={() => send("Can you help me debug my fetch call?")}
            className="h-9 px-4 rounded-full bg-panel text-navy text-[13px] font-semibold hover:bg-line/70 cursor-pointer"
          >
            Debug Code
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="mt-3 flex items-center gap-1.5 border border-line rounded-[12px] bg-surface pl-4 pr-1.5 h-[52px] focus-within:border-navy/40"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your tutor anything..."
            className="flex-1 bg-transparent outline-none text-[14px] text-navy placeholder:text-muted/70"
          />
          <button
            type="submit"
            aria-label="Send message"
            disabled={!input.trim() || typing}
            className="h-9 w-9 rounded-[9px] bg-navy grid place-items-center text-white hover:bg-navy-deep disabled:opacity-40 cursor-pointer"
          >
            <SendHorizonal size={15} />
          </button>
        </form>
      </div>
    </aside>
  );
}

export default function Workspace() {
  const { toast } = useApp();
  const navigate = useNavigate();

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left sidebar */}
      <aside className="hidden md:flex w-[290px] xl:w-[310px] shrink-0 bg-[#F3F4F8] border-r border-line flex-col p-6">
        <button
          onClick={() => navigate("/")}
          aria-label="Back to dashboard"
          className="h-14 w-14 rounded-[14px] bg-surface border border-line shadow-card grid place-items-center cursor-pointer"
        >
          <BridgeMark size={36} />
        </button>
        <h1 className="font-extrabold text-[23px] mt-4">Curriculum Bridge</h1>
        <p className="text-[13.5px] text-muted mt-0.5">Student Workspace</p>

        <nav className="mt-9 space-y-1.5">
          {NAV_ITEMS.map(({ label, icon: Icon, active }) => (
            <button
              key={label}
              onClick={() =>
                active ? null : toast(`${label} opens in the full release.`)
              }
              className={`w-full flex items-center gap-3.5 h-12 px-4 rounded-[11px] text-[15px] font-semibold transition-colors cursor-pointer ${
                active
                  ? "bg-navy text-white shadow-[0_4px_10px_rgba(20,46,77,0.25)]"
                  : "text-body hover:bg-surface"
              }`}
            >
              <Icon size={19} strokeWidth={2} />
              {label}
            </button>
          ))}
        </nav>

        <div className="mt-auto bg-[#E7E9EF] rounded-[16px] p-4">
          <div className="flex items-center gap-3">
            <span className="h-10 w-10 rounded-full bg-navy text-white grid place-items-center text-[13px] font-bold shrink-0">
              {W.student.initials}
            </span>
            <div className="min-w-0">
              <p className="text-[15px] font-bold text-navy truncate">{W.student.name}</p>
              <p className="text-[12.5px] text-muted">{W.student.role}</p>
            </div>
          </div>
          <button
            className="btn btn-green w-full mt-3.5 h-10"
            onClick={() => toast("Analytics view opens in the full release.")}
          >
            View Analytics
          </button>
        </div>
      </aside>

      {/* Center column */}
      <div className="flex-1 min-w-0 flex flex-col bg-[#FAFBFD]">
        <header className="bg-surface border-b border-line h-[76px] shrink-0 flex items-center gap-4 px-6">
          <span className="pill-mint px-3 py-1.5 caps text-[10.5px] leading-tight max-w-[92px] text-center">
            {W.projectLabel}
          </span>
          <h2 className="font-bold text-[20px] leading-tight max-w-[220px]">
            {W.projectTitle}
          </h2>
          <div className="ml-auto hidden sm:flex items-center gap-2 h-11 w-[300px] px-4 rounded-full bg-field text-muted">
            <Search size={15} />
            <input
              placeholder="Search documentation."
              className="w-full bg-transparent outline-none text-[13.5px] placeholder:text-muted/80"
            />
          </div>
          <button aria-label="Notifications" className="text-navy hover:text-navy-deep cursor-pointer">
            <Bell size={20} />
          </button>
          <button aria-label="Account" className="text-navy hover:text-navy-deep cursor-pointer">
            <CircleUserRound size={22} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="p-7 space-y-6 max-w-[860px] mx-auto">
            {/* Overall progress */}
            <section className="card p-5 flex flex-col sm:flex-row items-center gap-5 fade-up">
              <ProgressRing value={W.progress} />
              <div className="text-center sm:text-left">
                <h3 className="font-bold text-[21px]">Overall Progress</h3>
                <p className="text-[14px] text-body mt-0.5">{W.progressStep}</p>
              </div>
              <button
                className="btn btn-navy sm:ml-auto h-12 px-7"
                onClick={() => toast("Work submitted — Step 3 sent for evaluation.", "teal")}
              >
                Submit Work
              </button>
            </section>

            {/* Current task + badge */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_330px] gap-6">
              <section className="card p-6 fade-up" style={{ animationDelay: "50ms" }}>
                <p className="flex items-center gap-2.5 font-display font-bold text-[16px] text-navy">
                  <BookOpen size={19} />
                  Current Task
                </p>
                <h3 className="font-bold text-[24px] leading-tight mt-3">{W.task.title}</h3>
                <p className="text-[14.5px] leading-relaxed mt-3">{W.task.desc}</p>

                <div className="mt-5 rounded-[12px] border border-dashed border-[#C7CCDA] bg-[#F7F8FB] p-4">
                  <p className="caps text-[10.5px] text-muted">Example Snippet</p>
                  <code className="block font-mono text-[13px] text-navy leading-relaxed mt-2 break-all">
                    {W.task.snippet}
                  </code>
                </div>
              </section>

              <section
                className="rounded-card bg-[#EDEFF4] border border-line p-6 flex flex-col items-center text-center fade-up"
                style={{ animationDelay: "100ms" }}
              >
                <span className="relative z-10 rounded-md bg-navy text-white caps text-[10.5px] px-3 py-1.5">
                  {W.badge.label}
                </span>
                <span className="h-[110px] w-[110px] rounded-full bg-mint grid place-items-center -mt-2.5">
                  <Award size={46} className="text-navy" strokeWidth={1.75} />
                </span>
                <h3 className="font-bold text-[21px] mt-6">{W.badge.title}</h3>
                <p className="text-[14px] leading-relaxed mt-2.5">{W.badge.desc}</p>
              </section>
            </div>

            {/* Project community */}
            <section className="fade-up" style={{ animationDelay: "150ms" }}>
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2.5 font-bold text-[20px]">
                  <Users size={20} className="text-navy" />
                  Project Community
                </h3>
                <button
                  onClick={() => toast("Community feed opens in the full release.")}
                  className="text-[14px] font-semibold text-navy hover:underline cursor-pointer"
                >
                  View All
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                {W.community.map((c) => {
                  const { Icon, cls } = COMMUNITY_ICONS[c.icon];
                  return (
                    <div key={c.initials} className="card px-3.5 py-3 flex items-center gap-3">
                      <span
                        className="h-9 w-9 rounded-full grid place-items-center text-[11px] font-bold text-white shrink-0"
                        style={{ background: c.tint }}
                      >
                        {c.initials}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-semibold text-navy truncate">{c.name}</p>
                        <p className="text-[11.5px] text-muted mt-0.5">{c.time}</p>
                      </div>
                      <Icon size={17} className={`${cls} shrink-0`} />
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Recommended deep-dive banner */}
            <section
              className="relative overflow-hidden rounded-card bg-navy px-9 py-9 fade-up"
              style={{ animationDelay: "200ms" }}
            >
              <div
                className="absolute inset-0 opacity-[0.14]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 85% 20%, #66EECF 0%, transparent 36%), linear-gradient(rgba(102,238,207,0.25) 1px, transparent 1px)",
                  backgroundSize: "100% 100%, 100% 26px",
                }}
              />
              <div className="relative flex items-center justify-between gap-6">
                <div>
                  <h3 className="font-extrabold text-white text-[42px] leading-[1.02]">
                    {W.banner.big}
                    <span className="block text-mint text-[26px] font-bold mt-1">
                      {W.banner.rest}
                    </span>
                  </h3>
                  <p className="text-white/70 text-[13.5px] mt-3">{W.banner.sub}</p>
                </div>
                <button
                  aria-label="Open deep-dive"
                  onClick={() => toast("Deep-dive lesson opens in the full release.")}
                  className="h-14 w-14 rounded-full border-2 border-white/30 grid place-items-center text-white hover:bg-white/10 cursor-pointer shrink-0"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </section>
          </div>

          <footer className="bg-[#E9EBF1] border-t border-line px-7 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-[12.5px] text-muted">
              © 2024 Curriculum Bridge. UAE Youth Hackathon Partner.
            </p>
            <div className="flex gap-7">
              {["Privacy Support", "Contact Us"].map((l) => (
                <a
                  key={l}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="text-[12.5px] text-body hover:text-navy"
                >
                  {l}
                </a>
              ))}
            </div>
          </footer>
        </div>
      </div>

      <TutorPanel />
      <Toasts />
    </div>
  );
}
