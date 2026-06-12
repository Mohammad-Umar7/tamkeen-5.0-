import { History, Lightbulb, Zap } from "lucide-react";
import { useApp } from "../state/AppState";
import { HEALTH as H } from "../data/seed";
import { DonutStat, TrendChart } from "../components/charts";

export default function Health() {
  const { toast } = useApp();

  return (
    <div className="mx-auto max-w-[1280px] px-6 py-9">
      <div className="fade-up">
        <h1 className="font-extrabold text-[34px] leading-tight">{H.title}</h1>
        <p className="text-[14.5px] text-body mt-1">{H.subtitle}</p>
      </div>

      {/* Health index + trend */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-7">
        <section
          className="lg:col-span-4 card p-7 flex flex-col items-center text-center fade-up"
          style={{ animationDelay: "50ms" }}
        >
          <DonutStat value={H.healthIndex} label="Health Index" size={170} />
          <h2 className="font-bold text-[20px] mt-5">{H.alignment.title}</h2>
          <p className="text-[13.5px] text-body leading-relaxed mt-2 max-w-[260px]">
            {H.alignment.desc}
          </p>
        </section>

        <section className="lg:col-span-8 card p-6 fade-up" style={{ animationDelay: "100ms" }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-bold text-[19px]">{H.trend.title}</h2>
              <p className="text-[13px] text-muted mt-0.5">{H.trend.subtitle}</p>
            </div>
            <div className="flex items-center gap-5 shrink-0">
              <span className="flex items-center gap-2 text-[12.5px] text-body">
                <span className="h-2.5 w-2.5 rounded-full bg-navy" /> Coverage
              </span>
              <span className="flex items-center gap-2 text-[12.5px] text-body">
                <span className="h-2.5 w-2.5 rounded-full bg-[#0C8A6A]" /> Demand
              </span>
            </div>
          </div>
          <div className="mt-5">
            <TrendChart coverage={H.trend.coverage} demand={H.trend.demand} />
            <div className="flex justify-between px-2 mt-2">
              {H.trend.months.map((m) => (
                <span key={m} className="text-[11px] font-medium text-muted">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Outdated + missing */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <section
          className="rounded-card bg-[#F1F2F7] border border-line p-6 fade-up"
          style={{ animationDelay: "150ms" }}
        >
          <h2 className="flex items-center gap-2.5 font-bold text-[19px]">
            <History size={20} className="text-red" />
            Outdated Topics
          </h2>
          <div className="space-y-3.5 mt-5">
            {H.outdated.map((o) => (
              <div
                key={o.title}
                className="bg-surface border border-line rounded-[12px] px-4 py-3.5 flex items-center justify-between gap-4"
              >
                <div>
                  <p className="text-[15px] font-semibold text-navy">{o.title}</p>
                  <p className="text-[13px] text-muted mt-0.5">{o.course}</p>
                </div>
                <span className="rounded-md bg-red-soft text-red text-[12px] font-semibold px-3 py-1.5 shrink-0">
                  {o.pill}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section
          className="rounded-card bg-mint-soft border border-mint/40 p-6 fade-up"
          style={{ animationDelay: "200ms" }}
        >
          <h2 className="flex items-center gap-2.5 font-bold text-[19px]">
            <Lightbulb size={20} className="text-teal" />
            Critical Missing Skills
          </h2>
          <div className="space-y-3.5 mt-5">
            {H.missing.map((m) => (
              <div
                key={m.title}
                className="bg-surface border border-line rounded-[12px] px-4 py-3.5 flex items-center justify-between gap-4"
              >
                <div>
                  <p className="text-[15px] font-semibold text-navy">{m.title}</p>
                  <p className="text-[13px] text-muted mt-0.5">{m.course}</p>
                </div>
                <span className="rounded-md bg-mint text-navy text-[12px] font-semibold px-3 py-1.5 shrink-0">
                  {m.pill}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Strategic implementation plan */}
      <section className="card p-7 mt-6 fade-up" style={{ animationDelay: "250ms" }}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-bold text-[22px]">Strategic Implementation Plan</h2>
          <button
            className="btn btn-navy"
            onClick={() => toast("All recommendations applied to the draft curriculum.", "teal")}
          >
            Apply All Recommendations
          </button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <div className="min-w-[760px]">
            <div className="grid grid-cols-[130px_1fr_140px_190px_120px] gap-4 pb-3 border-b border-line">
              {["Course ID", "Proposed Change", "Impact Score", "Resource Effort", "Actions"].map(
                (h) => (
                  <span key={h} className="text-[12px] font-semibold text-muted">
                    {h}
                  </span>
                )
              )}
            </div>
            {H.plan.map((row) => (
              <div
                key={row.courseId}
                className="grid grid-cols-[130px_1fr_140px_190px_120px] gap-4 items-center py-5 border-b border-line last:border-0"
              >
                <div>
                  <p className="font-display font-bold text-[16px] text-navy">{row.courseId}</p>
                  <p className="text-[12.5px] text-muted mt-0.5">{row.courseName}</p>
                </div>
                <p className="text-[14px] text-navy leading-snug">{row.change}</p>
                <div className="flex gap-1">
                  {Array.from({ length: row.bolts }).map((_, i) => (
                    <Zap key={i} size={15} className="text-[#0C8A6A] fill-[#0C8A6A]/20" />
                  ))}
                </div>
                <p className="text-[13.5px] text-body">{row.effort}</p>
                <button
                  onClick={() => toast("Curriculum mapping opens in the full release.")}
                  className="text-[14px] font-semibold text-navy hover:underline cursor-pointer text-left"
                >
                  View Mapping
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next steps banner */}
      <section
        className="relative overflow-hidden rounded-card mt-6 fade-up"
        style={{ animationDelay: "300ms" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 12% 30%, rgba(102,238,207,0.25) 0%, transparent 30%), radial-gradient(circle at 88% 75%, rgba(102,238,207,0.2) 0%, transparent 32%), repeating-linear-gradient(90deg, rgba(102,238,207,0.10) 0 3px, transparent 3px 34px), linear-gradient(120deg, #0B2233 0%, #123A4E 60%, #0B2233 100%)",
          }}
        />
        <div className="relative px-6 py-12 grid place-items-center">
          <div className="bg-white/90 backdrop-blur rounded-[14px] px-8 py-7 max-w-[620px] text-center shadow-card">
            <h2 className="font-bold text-[20px]">{H.nextSteps.title}</h2>
            <p className="text-[14px] text-body leading-relaxed mt-2.5">{H.nextSteps.desc}</p>
            <button
              className="btn btn-outline mt-5"
              onClick={() => toast("Session scheduled — invites sent to faculty.", "teal")}
            >
              {H.nextSteps.cta}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
