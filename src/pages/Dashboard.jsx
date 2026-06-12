import { useNavigate } from "react-router-dom";
import { AlertCircle, ArrowRight, PlayCircle } from "lucide-react";
import { useApp } from "../state/AppState";
import { DASHBOARD as D } from "../data/seed";
import { RadarChart } from "../components/charts";

const TAG_TONES = {
  green: "bg-[#0E8A5F] text-white",
  navy: "bg-navy text-white",
  gray: "bg-[#5A6B7E] text-white",
};

/* dark "tech imagery" placeholders for the project card headers */
const ART = {
  servers: {
    backgroundImage:
      "repeating-linear-gradient(90deg, rgba(102,238,207,0.12) 0 2px, transparent 2px 26px), linear-gradient(135deg, #0B1F33 0%, #103048 55%, #0B2237 100%)",
  },
  swirl: {
    backgroundImage:
      "radial-gradient(circle at 60% 45%, rgba(102,238,207,0.3) 0%, transparent 26%), radial-gradient(circle at 60% 45%, rgba(102,238,207,0.16) 18%, transparent 42%), radial-gradient(circle at 60% 45%, rgba(20,120,150,0.4) 30%, transparent 70%), linear-gradient(135deg, #081A2C, #0E2B44)",
  },
  dash: {
    backgroundImage:
      "linear-gradient(rgba(102,238,207,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(102,238,207,0.08) 1px, transparent 1px), linear-gradient(150deg, #0A2033 0%, #123A52 100%)",
    backgroundSize: "22px 22px, 22px 22px, 100% 100%",
  },
};

export default function Dashboard() {
  const { toast } = useApp();
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-[1280px] px-6 py-10">
      {/* Greeting row */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 fade-up">
        <div className="max-w-[640px]">
          <p className="caps text-muted">{D.academicYear}</p>
          <h1 className="font-extrabold text-[46px] leading-[1.05] mt-2">
            Hello, {D.studentName}
          </h1>
          <p className="text-[15.5px] leading-relaxed mt-4">{D.intro}</p>
        </div>
        <div className="card px-5 py-4 w-full lg:w-[340px] shrink-0">
          <div className="flex items-center justify-between">
            <span className="text-[13.5px] font-semibold text-navy">Semester Progress</span>
            <span className="text-[13.5px] font-bold text-navy">{D.semesterPct}%</span>
          </div>
          <div className="mt-2.5 h-2.5 rounded-full bg-line overflow-hidden">
            <div
              className="h-full rounded-full bg-navy"
              style={{ width: `${D.semesterPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Skill map + top gaps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
        <section className="lg:col-span-7 card p-6 fade-up" style={{ animationDelay: "50ms" }}>
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-[20px]">Skill Gap Map</h2>
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-2 text-[12.5px] text-body">
                <span className="h-2.5 w-2.5 rounded-full bg-navy" /> Academic
              </span>
              <span className="flex items-center gap-2 text-[12.5px] text-body">
                <span className="h-2.5 w-2.5 rounded-full bg-[#0C8A6A]" /> Industry
              </span>
            </div>
          </div>
          <div className="grid place-items-center mt-2">
            <RadarChart labels={D.radar.labels} academic={D.radar.academic} industry={D.radar.industry} />
          </div>
        </section>

        <div className="lg:col-span-5 space-y-6">
          <section className="card p-6 fade-up" style={{ animationDelay: "100ms" }}>
            <h2 className="font-bold text-[20px] flex items-center gap-2.5">
              <AlertCircle size={20} className="text-red" />
              Your Top Gaps
            </h2>

            <div className="space-y-4 mt-5">
              {D.gaps.map((g) => (
                <div
                  key={g.n}
                  className={`rounded-[12px] border p-4 flex gap-4 ${
                    g.hot ? "bg-red-soft border-red/15" : "bg-panel border-line"
                  }`}
                >
                  <span
                    className={`font-display font-bold text-[17px] ${
                      g.hot ? "text-red" : "text-navy"
                    }`}
                  >
                    {g.n}
                  </span>
                  <div>
                    <p className={`text-[15px] font-bold ${g.hot ? "text-red" : "text-navy"}`}>
                      {g.title}
                    </p>
                    <p className="text-[13.5px] leading-snug mt-1">{g.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="btn btn-navy w-full mt-6"
              onClick={() => toast("Bridge course catalog opens in the full release.")}
            >
              Explore Bridge Courses
            </button>
          </section>

          <div className="grid grid-cols-2 gap-5 fade-up" style={{ animationDelay: "150ms" }}>
            <div className="rounded-card bg-mint-soft border border-mint/40 px-5 py-6 text-center">
              <p className="text-[13.5px] font-medium text-teal">Market Fit</p>
              <p className="font-display font-extrabold text-[34px] text-teal mt-1">
                {D.marketFit}
              </p>
            </div>
            <div className="rounded-card bg-[#E9EBF1] border border-line px-5 py-6 text-center">
              <p className="text-[13.5px] font-medium text-muted">Skill Rank</p>
              <p className="font-display font-extrabold text-[30px] text-navy mt-1.5">
                {D.skillRank}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Assigned projects */}
      <section className="card p-7 mt-8 fade-up" style={{ animationDelay: "200ms" }}>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-bold text-[22px]">Assigned Projects</h2>
            <p className="text-[13.5px] text-muted mt-1">
              Curated tasks to bridge your identified knowledge gaps.
            </p>
          </div>
          <button
            onClick={() => toast("Full project list opens in the full release.")}
            className="flex items-center gap-2 text-[14px] font-semibold text-navy hover:underline cursor-pointer shrink-0"
          >
            View All Projects <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {D.projects.map((p) => (
            <article key={p.id} className="border border-line rounded-[12px] overflow-hidden bg-surface flex flex-col">
              <div className="relative h-[140px]" style={ART[p.art]}>
                <span
                  className={`absolute top-3 right-3 rounded-full px-3 py-1 text-[11.5px] font-semibold ${TAG_TONES[p.tagTone]}`}
                >
                  {p.tag}
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-[16px] leading-snug">{p.title}</h3>
                <p className="text-[13.5px] text-body leading-snug mt-1.5 flex-1">{p.desc}</p>
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-line">
                  <span className="text-[12.5px] text-muted">{p.due}</span>
                  <button
                    aria-label={`Open ${p.title}`}
                    onClick={() => navigate("/workspace")}
                    className="text-navy hover:text-teal cursor-pointer"
                  >
                    <PlayCircle size={22} strokeWidth={1.75} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
