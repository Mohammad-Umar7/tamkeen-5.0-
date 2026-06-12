import { useState } from "react";
import {
  BarChart3,
  Bell,
  Braces,
  ChevronUp,
  Cloud,
  Code,
  HelpCircle,
  Info,
  LayoutDashboard,
  MoreVertical,
  Settings,
  Sparkles,
  SquareTerminal,
  TrendingUp,
} from "lucide-react";
import { useApp } from "../state/AppState";
import { QUEUE } from "../data/seed";
import { DonutStat } from "../components/charts";

const ICONS = { code: Code, cloud: Cloud, braces: Braces };

const SIDE_NAV = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Major Data", icon: BarChart3, active: true },
  { label: "Notifications", icon: Bell },
  { label: "Settings", icon: Settings },
  { label: "Help", icon: HelpCircle },
];

function RecCard({ item, delay }) {
  const { dispatch, toast } = useApp();
  const [open, setOpen] = useState(Boolean(item.defaultOpen));
  const [leaving, setLeaving] = useState(false);
  const [mode, setMode] = useState("view"); // view | reject | edit
  const [feedback, setFeedback] = useState("");
  const [title, setTitle] = useState(item.title);
  const Icon = ICONS[item.icon];

  const approve = () => {
    setLeaving(true);
    setTimeout(() => {
      dispatch({ type: "queue/approve", id: item.id });
      toast(`Approved — ${item.title} published to Software Engineering.`, "teal");
    }, 250);
  };

  const reject = () => {
    setLeaving(true);
    setTimeout(() => {
      dispatch({ type: "queue/reject", id: item.id });
      toast("Rejected — feedback sent to the AI-Industry Bridge engine.", "red");
    }, 250);
  };

  const saveEdit = () => {
    dispatch({ type: "queue/edit", id: item.id, title });
    setMode("view");
    toast("Changes saved.");
  };

  return (
    <article
      className={`bg-surface rounded-card shadow-card overflow-hidden fade-up ${
        open ? "border-2 border-teal" : "border border-line"
      } ${leaving ? "card-leave" : ""}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Header row */}
      <div className="flex items-center gap-4 p-5">
        <span
          className={`h-13 w-13 min-h-[52px] min-w-[52px] rounded-[12px] grid place-items-center shrink-0 ${
            item.iconTone === "mint" ? "bg-mint text-teal" : "bg-panel text-navy"
          }`}
        >
          <Icon size={23} strokeWidth={1.9} />
        </span>
        <div className="min-w-0 flex-1">
          {mode === "edit" ? (
            <div className="flex items-center gap-2.5">
              <input
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1 font-display font-bold text-[19px] text-navy border border-line rounded-[9px] px-3 py-1.5 bg-bg outline-none focus:border-navy/50"
              />
              <button className="btn btn-navy h-9 px-4" onClick={saveEdit}>
                Save
              </button>
              <button className="btn btn-soft h-9 px-4" onClick={() => setMode("view")}>
                Cancel
              </button>
            </div>
          ) : (
            <h3 className="font-bold text-[20px] leading-tight truncate">{item.title}</h3>
          )}
          <p className="flex items-center gap-2 mt-1">
            <span
              className={`caps text-[10.5px] ${
                item.tagTone === "teal" ? "text-teal" : "text-[#4E9C8C]"
              }`}
            >
              {item.tag}
            </span>
            <span className="h-1 w-1 rounded-full bg-muted/60" />
            <span className="text-[13px] text-body">{item.note}</span>
          </p>
        </div>
        <button
          onClick={() => setOpen((o) => !o)}
          className={`btn h-11 px-5 ${open ? "btn-teal" : "btn-outline"}`}
        >
          Rationale Card
        </button>
        <button
          aria-label={open ? "Collapse" : "More options"}
          onClick={() => setOpen((o) => !o)}
          className="text-muted hover:text-navy cursor-pointer shrink-0"
        >
          {open ? <ChevronUp size={19} /> : <MoreVertical size={19} />}
        </button>
      </div>

      {/* Expanded rationale */}
      {open && (
        <div className="border-t border-line bg-[#F7F8FB] px-6 py-6">
          <p className="caps text-[11px] text-muted">Recommendation Rationale</p>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_330px] gap-5 mt-4">
            <div className="space-y-4">
              {item.rationale.map((r, i) => (
                <div key={i} className="bg-surface border border-line rounded-[12px] p-4 flex gap-3.5">
                  {r.icon === "trend" ? (
                    <TrendingUp size={19} className="text-[#0C8A6A] shrink-0 mt-0.5" />
                  ) : (
                    <Sparkles size={19} className="text-navy shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="text-[15px] font-bold text-navy leading-snug">{r.title}</p>
                    <p className="text-[13.5px] leading-snug mt-1">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-surface border border-line rounded-[12px] p-6 flex flex-col items-center justify-center">
              <DonutStat value={item.impact} label="Impact" />
              <p className="text-[13px] text-body text-center mt-4">
                Calculated Curriculum Synergy Score
              </p>
            </div>
          </div>

          {mode === "reject" && (
            <div className="mt-5 bg-surface border border-line rounded-[12px] p-4 fade-up">
              <label className="text-[13px] font-semibold text-navy block mb-2">
                Feedback for the recommendation engine
              </label>
              <textarea
                autoFocus
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={3}
                placeholder="e.g. Too advanced for this semester — prerequisites not yet covered…"
                className="w-full text-[13.5px] border border-line rounded-[10px] px-3.5 py-2.5 bg-bg outline-none focus:border-navy/40 resize-none placeholder:text-muted/70"
              />
              <div className="flex gap-2.5 mt-3">
                <button className="btn btn-red h-10" disabled={!feedback.trim()} onClick={reject}>
                  Send Feedback & Reject
                </button>
                <button className="btn btn-soft h-10" onClick={() => setMode("view")}>
                  Cancel
                </button>
              </div>
            </div>
          )}

          <hr className="border-line my-5" />

          <div className="flex flex-wrap items-center gap-4">
            <p className="flex items-center gap-2 text-[13.5px] text-body italic">
              <Info size={15} className="text-muted shrink-0" />
              Last reviewed by {item.reviewer}
            </p>
            <div className="flex items-center gap-3 ml-auto">
              <button
                className="btn btn-red"
                onClick={() => setMode(mode === "reject" ? "view" : "reject")}
              >
                Reject with Feedback
              </button>
              <button className="btn btn-soft" onClick={() => setMode("edit")}>
                Edit
              </button>
              <button className="btn btn-navy px-8" onClick={approve}>
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

export default function Queue() {
  const { state, toast } = useApp();

  return (
    <div className="mx-auto max-w-[1280px] px-6 py-8 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 items-start">
      {/* Professor sidebar */}
      <aside className="space-y-6 lg:sticky lg:top-24">
        <div className="bg-mint rounded-[14px] p-4 flex items-center gap-3.5">
          <span className="h-11 w-11 rounded-[10px] bg-white/55 grid place-items-center text-navy shrink-0">
            <SquareTerminal size={21} />
          </span>
          <div>
            <p className="text-[11.5px] font-semibold text-teal">Major Selection</p>
            <p className="text-[15px] font-bold text-navy leading-tight">
              Software Engineering
            </p>
          </div>
        </div>

        <nav className="space-y-1.5">
          {SIDE_NAV.map(({ label, icon: Icon, active }) => (
            <button
              key={label}
              onClick={() => (active ? null : toast(`${label} opens in the full release.`))}
              className={`w-full flex items-center gap-3.5 h-12 px-4 rounded-[11px] text-[15px] font-semibold transition-colors cursor-pointer ${
                active
                  ? "bg-navy text-white shadow-[0_4px_10px_rgba(20,46,77,0.25)]"
                  : "text-body hover:bg-surface"
              }`}
            >
              <Icon size={19} />
              {label}
            </button>
          ))}
        </nav>

        <button
          className="btn btn-navy w-full"
          onClick={() => toast("Analytics view opens in the full release.")}
        >
          <BarChart3 size={17} />
          View Analytics
        </button>
      </aside>

      {/* Queue */}
      <div>
        <div className="flex flex-wrap items-end justify-between gap-4 fade-up">
          <div>
            <h1 className="font-extrabold text-[40px] leading-tight">
              Pending Recommendations
            </h1>
            <p className="text-[15px] mt-2">
              Review curriculum updates suggested by the AI-Industry Bridge engine.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="pill-mint h-10 px-5 text-[13.5px]">{state.pending} Pending</span>
            <span className="inline-flex items-center h-10 px-5 rounded-full bg-[#E8EAF0] text-body text-[13.5px] font-semibold">
              {QUEUE.tracks} Major Tracks
            </span>
          </div>
        </div>

        <div className="space-y-5 mt-7">
          {state.queue.length === 0 ? (
            <div className="card p-12 text-center fade-up">
              <p className="text-[15px] text-body">
                Queue clear — the AI-Industry Bridge engine runs nightly and will surface new
                recommendations here.
              </p>
            </div>
          ) : (
            state.queue.map((item, i) => <RecCard key={item.id} item={item} delay={i * 60} />)
          )}
        </div>
      </div>
    </div>
  );
}
