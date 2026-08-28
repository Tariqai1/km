"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface InquiryFormProps {
  productId?: string;
  productName?: string;
}

export default function InquiryForm({ productId, productName }: InquiryFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: (formData.get("email") as string) || "",
      companyName: (formData.get("companyName") as string) || "",
      productInterest: productName || productId || "",
      message: formData.get("message") as string,
      country: "India",
    };

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSuccess(true);
        (e.target as HTMLFormElement).reset();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to submit inquiry. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-emerald-50 text-emerald-800 p-5 rounded-xl text-center border border-emerald-200 text-xs sm:text-sm" role="alert">
        <h4 className="text-base sm:text-lg font-bold mb-1 text-emerald-900">Inquiry Sent Successfully!</h4>
        <p>Our engineering team will get back to you with specs &amp; pricing shortly.</p>
        <Button 
          variant="outline" 
          size="sm"
          className="mt-3.5 border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white text-xs font-semibold h-8.5 rounded-lg" 
          onClick={() => setSuccess(false)}
        >
          Send Another Inquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg border border-red-200 text-xs sm:text-sm" role="alert">
          {error}
        </div>
      )}

      {productName && (
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold text-slate-700">Interested In</Label>
          <Input value={productName} disabled className="bg-slate-50 font-medium text-slate-900 opacity-100 h-10 text-xs sm:text-sm" />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-xs font-semibold text-slate-700">Full Name *</Label>
          <Input id="name" name="name" required placeholder="Your Name" className="h-10 text-xs sm:text-sm" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone" className="text-xs font-semibold text-slate-700">Phone Number *</Label>
          <Input id="phone" name="phone" type="tel" required placeholder="+91 98765 43210" className="h-10 text-xs sm:text-sm" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs font-semibold text-slate-700">Email Address</Label>
          <Input id="email" name="email" type="email" placeholder="name@company.com" className="h-10 text-xs sm:text-sm" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="companyName" className="text-xs font-semibold text-slate-700">Company Name</Label>
          <Input id="companyName" name="companyName" placeholder="Company / Factory Name" className="h-10 text-xs sm:text-sm" />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message" className="text-xs font-semibold text-slate-700">Message / Capacity Requirements *</Label>
        <Textarea 
          id="message"
          name="message"
          required 
          placeholder="Please tell us about your required batch size, raw material, delivery location, etc."
          className="min-h-[100px] text-xs sm:text-sm"
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-brand-accent hover:bg-brand-accent-hover text-white text-xs sm:text-sm font-bold h-11 rounded-xl shadow-xs"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending Inquiry...
          </>
        ) : (
          "Submit Fast Inquiry"
        )}
      </Button>
    </form>
  );
}
