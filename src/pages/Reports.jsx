import { Download, FileText } from "lucide-react";
import { useApp } from "../state/AppState";
import { REPORTS } from "../data/seed";

export default function Reports() {
  const { toast } = useApp();

  return (
    <div className="mx-auto max-w-[860px] px-6 py-9">
      <div className="fade-up">
        <h1 className="font-extrabold text-[34px] leading-tight">Reports</h1>
        <p className="text-[14.5px] text-body mt-1">
          Institutional exports generated from the AI-Industry Bridge engine.
        </p>
      </div>

      <div className="space-y-4 mt-7">
        {REPORTS.map((r, i) => (
          <div
            key={r.id}
            className="card px-5 py-4 flex items-center gap-4 fade-up"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <span className="h-11 w-11 rounded-[11px] bg-panel grid place-items-center text-navy shrink-0">
              <FileText size={20} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-bold text-navy truncate">{r.title}</p>
              <p className="text-[12.5px] text-muted mt-0.5">{r.meta}</p>
            </div>
            <button
              className="btn btn-outline h-10"
              onClick={() => toast(`Exported — ${r.title}.`, "teal")}
            >
              <Download size={15} />
              Export
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
