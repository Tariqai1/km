import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: string;
  highlight?: boolean;
}

export function StatsCard({ title, value, icon: Icon, trend, highlight }: StatsCardProps) {
  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-200 hover:shadow-md",
      highlight ? "bg-brand-accent text-white border-none shadow-brand-accent/20" : "bg-white"
    )}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className={cn(
              "text-sm font-medium mb-1",
              highlight ? "text-white/80" : "text-slate-500"
            )}>
              {title}
            </p>
            <h3 className="text-3xl font-bold tracking-tight">
              {value}
            </h3>
            {trend && (
              <p className={cn(
                "text-xs mt-2 font-medium",
                highlight ? "text-white/90" : "text-emerald-600"
              )}>
                {trend}
              </p>
            )}
          </div>
          <div className={cn(
            "p-3 rounded-full",
            highlight ? "bg-white/20" : "bg-slate-100"
          )}>
            <Icon className={cn(
              "h-6 w-6",
              highlight ? "text-white" : "text-brand-primary"
            )} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
