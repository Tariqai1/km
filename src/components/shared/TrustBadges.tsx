import { ShieldCheck, CheckCircle, Factory, Wrench } from "lucide-react";

export default function TrustBadges() {
  const badges = [
    { icon: ShieldCheck, title: "ISO & GST Registered", detail: "Compliant Indian Heavy Engineering" },
    { icon: CheckCircle, title: "100% Load Trial Run", detail: "Pre-Dispatch Tested Under Load" },
    { icon: Factory, title: "Direct Mumbai Works", detail: "Workshop No. 58, Sakinaka" },
    { icon: Wrench, title: "Guaranteed Spares", detail: "Pan-India Direct OEM Dispatch" },
  ];

  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y sm:divide-y-0 md:divide-x divide-slate-200 text-left">
          {badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div 
                key={idx}
                className="flex items-start gap-3 pt-2 sm:pt-0 sm:px-3 first:pl-0"
              >
                <div className="p-2 bg-slate-100 rounded text-[#162A45] shrink-0 border border-slate-200">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-xs sm:text-sm leading-tight">
                    {badge.title}
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                    {badge.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
