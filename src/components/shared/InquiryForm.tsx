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
      <div className="bg-green-50 text-brand-success p-6 rounded-lg text-center border border-green-200" role="alert">
        <h4 className="text-xl font-bold mb-2">Inquiry Sent Successfully!</h4>
        <p>Our team will get back to you shortly.</p>
        <Button 
          variant="outline" 
          className="mt-4 border-brand-success text-brand-success hover:bg-brand-success hover:text-white" 
          onClick={() => setSuccess(false)}
        >
          Send Another Inquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg border border-red-200 text-sm" role="alert">
          {error}
        </div>
      )}

      {productName && (
        <div className="space-y-2">
          <Label>Interested In</Label>
          <Input value={productName} disabled className="bg-gray-50 font-medium text-brand-dark opacity-100" />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input id="name" name="name" required placeholder="John Doe" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input id="phone" name="phone" type="tel" required placeholder="+91 98765 43210" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" name="email" type="email" placeholder="john@company.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input id="companyName" name="companyName" placeholder="Doe Industries" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message / Requirements *</Label>
        <Textarea 
          id="message"
          name="message"
          required 
          placeholder="Please tell us about your specific requirements, capacity needed, etc."
          className="min-h-[120px]"
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-brand-accent hover:bg-brand-accent-hover text-white text-lg h-12"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
          </>
        ) : (
          "Submit Inquiry"
        )}
      </Button>
    </form>
  );
}
