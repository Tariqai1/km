import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-brand-light px-4 text-center">
      <div className="w-24 h-24 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary mb-8">
        <AlertCircle className="w-12 h-12" />
      </div>
      <h1 className="text-4xl sm:text-5xl font-bold font-display text-slate-900 mb-2">
        404
      </h1>
      <h2 className="text-lg sm:text-xl font-semibold text-brand-primary mb-4">
        Page Not Found
      </h2>
      <p className="text-slate-600 max-w-md mx-auto mb-8 text-xs sm:text-sm leading-relaxed">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Button asChild size="default" className="bg-brand-accent hover:bg-brand-accent-hover text-white font-bold h-11 px-6 rounded-xl text-xs sm:text-sm shadow-xs">
        <Link href="/">
          Return to Homepage
        </Link>
      </Button>
    </div>
  );
}
