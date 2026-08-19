"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface InquiryFormProps {
  productId?: string;
  productName?: string;
}

export default function InquiryForm({ productId, productName }: InquiryFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  if (success) {
    return (
      <div className="bg-green-50 text-brand-success p-6 rounded-lg text-center border border-green-200">
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
      {productName && (
        <div className="space-y-2">
          <Label>Interested In</Label>
          <Input value={productName} disabled className="bg-gray-50 font-medium text-brand-dark opacity-100" />
          {productId && <input type="hidden" name="productId" value={productId} />}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input id="name" required placeholder="John Doe" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input id="phone" type="tel" required placeholder="+91 98765 43210" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" placeholder="john@company.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company Name</Label>
          <Input id="company" placeholder="Doe Industries" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message / Requirements *</Label>
        <Textarea 
          id="message" 
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
        {loading ? "Sending..." : "Submit Inquiry"}
      </Button>
    </form>
  );
}
