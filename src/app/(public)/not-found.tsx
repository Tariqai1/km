import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-brand-light px-4 text-center">
      <div className="w-24 h-24 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary mb-8">
        <AlertCircle className="w-12 h-12" />
      </div>
      <h1 className="text-6xl md:text-8xl font-bold font-display text-brand-dark mb-4">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-brand-primary mb-6">
        Page Not Found
      </h2>
      <p className="text-gray-600 max-w-md mx-auto mb-10 text-lg">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Button asChild size="lg" className="bg-brand-accent hover:bg-brand-accent-hover text-white text-lg h-14 px-8">
        <Link href="/">
          Return to Homepage
        </Link>
      </Button>
    </div>
  );
}
