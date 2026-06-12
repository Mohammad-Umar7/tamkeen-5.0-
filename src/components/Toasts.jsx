import { CheckCircle2, Info, XCircle } from "lucide-react";
import { useApp } from "../state/AppState";

const ICONS = {
  teal: { Icon: CheckCircle2, cls: "text-teal" },
  red: { Icon: XCircle, cls: "text-red" },
  navy: { Icon: Info, cls: "text-navy" },
};

export default function Toasts() {
  const { state } = useApp();
  if (!state.toasts.length) return null;
  return (
    <div className="fixed bottom-24 right-6 z-50 space-y-2 w-[330px]">
      {state.toasts.map((t) => {
        const { Icon, cls } = ICONS[t.tone] ?? ICONS.navy;
        return (
          <div key={t.id} className="toast-in card flex items-start gap-2.5 px-4 py-3" role="status">
            <Icon size={16} className={`${cls} mt-0.5 shrink-0`} />
            <span className="text-[13px] leading-snug text-navy">{t.message}</span>
          </div>
        );
      })}
    </div>
  );
}
